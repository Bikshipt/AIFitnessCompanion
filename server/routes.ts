import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertWorkoutSchema, 
  insertExerciseSchema, 
  insertWorkoutExerciseSchema,
  insertMealSchema,
  insertProgressRecordSchema,
  insertChallengeSchema,
  insertChallengeParticipantSchema
} from "@shared/schema";
import { z } from "zod";
import {
  generateWorkoutPlan,
  generateDietPlan,
  analyzeWorkoutForm,
  generateFitnessInsights,
  answerFitnessQuestion
} from "./ai/gemini";
import { insertCharacterSchema, insertQuestSchema } from "@shared/rpg";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userInput = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userInput.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userInput);
      
      // Remove password from response
      const { password, ...userResponse } = user;
      
      res.status(201).json(userResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Remove password from response
      const { password: _, ...userResponse } = user;
      
      res.status(200).json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/auth/user/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Remove password from response
      const { password, ...userResponse } = user;
      
      res.status(200).json(userResponse);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Workout routes
  app.get("/api/workouts", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const workouts = await storage.getUserWorkouts(userId);
      res.status(200).json(workouts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/workouts/:id", async (req: Request, res: Response) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workout = await storage.getWorkout(workoutId);
      
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      res.status(200).json(workout);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/workouts", async (req: Request, res: Response) => {
    try {
      const workoutInput = insertWorkoutSchema.parse(req.body);
      const workout = await storage.createWorkout(workoutInput);
      res.status(201).json(workout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/workouts/:id", async (req: Request, res: Response) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workoutUpdate = req.body;
      
      const updatedWorkout = await storage.updateWorkout(workoutId, workoutUpdate);
      
      if (!updatedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      res.status(200).json(updatedWorkout);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/workouts/:id", async (req: Request, res: Response) => {
    try {
      const workoutId = parseInt(req.params.id);
      const success = await storage.deleteWorkout(workoutId);
      
      if (!success) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Exercise routes
  app.get("/api/exercises", async (req: Request, res: Response) => {
    try {
      const type = req.query.type as string;
      const muscleGroup = req.query.muscleGroup as string;
      
      if (type) {
        const exercises = await storage.getExercisesByType(type);
        return res.status(200).json(exercises);
      }
      
      if (muscleGroup) {
        const exercises = await storage.getExercisesByMuscleGroup(muscleGroup);
        return res.status(200).json(exercises);
      }
      
      const exercises = await storage.getExercises();
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/exercises/:id", async (req: Request, res: Response) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const exercise = await storage.getExercise(exerciseId);
      
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      
      res.status(200).json(exercise);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/exercises", async (req: Request, res: Response) => {
    try {
      const exerciseInput = insertExerciseSchema.parse(req.body);
      const exercise = await storage.createExercise(exerciseInput);
      res.status(201).json(exercise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Workout Exercise routes
  app.get("/api/workouts/:id/exercises", async (req: Request, res: Response) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workoutExercises = await storage.getWorkoutExercises(workoutId);
      res.status(200).json(workoutExercises);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/workouts/:id/exercises", async (req: Request, res: Response) => {
    try {
      const workoutId = parseInt(req.params.id);
      const workoutExerciseInput = insertWorkoutExerciseSchema.parse({
        ...req.body,
        workoutId
      });
      
      const workoutExercise = await storage.addExerciseToWorkout(workoutExerciseInput);
      res.status(201).json(workoutExercise);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/workouts/:workoutId/exercises/:exerciseId", async (req: Request, res: Response) => {
    try {
      const workoutId = parseInt(req.params.workoutId);
      const exerciseId = parseInt(req.params.exerciseId);
      
      const success = await storage.removeExerciseFromWorkout(workoutId, exerciseId);
      
      if (!success) {
        return res.status(404).json({ message: "Workout exercise not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Meal routes
  app.get("/api/meals", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const meals = await storage.getUserMeals(userId);
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/meals", async (req: Request, res: Response) => {
    try {
      const mealInput = insertMealSchema.parse(req.body);
      const meal = await storage.createMeal(mealInput);
      res.status(201).json(meal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/meals/:id", async (req: Request, res: Response) => {
    try {
      const mealId = parseInt(req.params.id);
      const mealUpdate = req.body;
      
      const updatedMeal = await storage.updateMeal(mealId, mealUpdate);
      
      if (!updatedMeal) {
        return res.status(404).json({ message: "Meal not found" });
      }
      
      res.status(200).json(updatedMeal);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/meals/:id", async (req: Request, res: Response) => {
    try {
      const mealId = parseInt(req.params.id);
      const success = await storage.deleteMeal(mealId);
      
      if (!success) {
        return res.status(404).json({ message: "Meal not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Progress Record routes
  app.get("/api/progress/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressRecords = await storage.getUserProgressRecords(userId);
      res.status(200).json(progressRecords);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/progress", async (req: Request, res: Response) => {
    try {
      const recordInput = insertProgressRecordSchema.parse(req.body);
      const record = await storage.createProgressRecord(recordInput);
      res.status(201).json(record);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Challenge routes
  app.get("/api/challenges", async (req: Request, res: Response) => {
    try {
      const challenges = await storage.getChallenges();
      res.status(200).json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/challenges/:id", async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      const challenge = await storage.getChallenge(challengeId);
      
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      
      res.status(200).json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/challenges", async (req: Request, res: Response) => {
    try {
      const challengeInput = insertChallengeSchema.parse(req.body);
      const challenge = await storage.createChallenge(challengeInput);
      res.status(201).json(challenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/challenges/:id/join", async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const challenge = await storage.getChallenge(challengeId);
      
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
      
      const participantInput = insertChallengeParticipantSchema.parse({
        challengeId,
        userId
      });
      
      const participant = await storage.joinChallenge(participantInput);
      res.status(201).json(participant);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/challenges/:id/leave", async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      const userId = parseInt(req.query.userId as string);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const success = await storage.leaveChallenge(challengeId, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Participation not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/users/:id/challenges", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const challenges = await storage.getUserChallenges(userId);
      res.status(200).json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // AI Routes
  app.post("/api/ai/workout-plan", async (req: Request, res: Response) => {
    try {
      const { 
        fitnessLevel, 
        goal, 
        equipment, 
        duration, 
        frequency, 
        preferences, 
        restrictions 
      } = req.body;
      
      if (!fitnessLevel || !goal || !duration || !frequency) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const workoutPlan = await generateWorkoutPlan(
        fitnessLevel,
        goal,
        equipment || "bodyweight",
        duration,
        frequency,
        preferences || "",
        restrictions || ""
      );
      
      res.status(200).json({ workoutPlan });
    } catch (error) {
      console.error("Error generating workout plan:", error);
      res.status(500).json({ message: "Failed to generate workout plan" });
    }
  });

  // RPG Routes
  app.get("/api/rpg/quests", async (_req: Request, res: Response) => {
    try {
      const quests = await storage.getQuests();
      res.status(200).json(quests);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/rpg/quests", async (req: Request, res: Response) => {
    try {
      const questInput = insertQuestSchema.parse(req.body);
      const quest = await storage.createQuest(questInput);
      res.status(201).json(quest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/rpg/characters", async (req: Request, res: Response) => {
    try {
      const input = insertCharacterSchema.parse(req.body);
      const character = await storage.createCharacter(input);
      res.status(201).json(character);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/rpg/characters/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const character = await storage.getCharacter(id);
      if (!character) return res.status(404).json({ message: "Character not found" });
      res.status(200).json(character);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/rpg/users/:userId/characters", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const characters = await storage.getUserCharacters(userId);
      res.status(200).json(characters);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/rpg/characters/:id/xp", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const amount = Number(req.body.amount ?? 0);
      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ message: "Invalid XP amount" });
      }
      const updated = await storage.addXp(id, amount);
      if (!updated) return res.status(404).json({ message: "Character not found" });
      res.status(200).json(updated);
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/ai/diet-plan", async (req: Request, res: Response) => {
    try {
      const { 
        calorieGoal, 
        dietType, 
        restrictions, 
        goal, 
        mealsPerDay 
      } = req.body;
      
      if (!calorieGoal || !dietType || !goal) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const dietPlan = await generateDietPlan(
        calorieGoal,
        dietType,
        restrictions || "none",
        goal,
        mealsPerDay || 3
      );
      
      res.status(200).json({ dietPlan });
    } catch (error) {
      console.error("Error generating diet plan:", error);
      res.status(500).json({ message: "Failed to generate diet plan" });
    }
  });
  
  app.post("/api/ai/form-analysis", async (req: Request, res: Response) => {
    try {
      const { exercise, formDescription } = req.body;
      
      if (!exercise || !formDescription) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const formAnalysis = await analyzeWorkoutForm(exercise, formDescription);
      
      res.status(200).json({ formAnalysis });
    } catch (error) {
      console.error("Error analyzing workout form:", error);
      res.status(500).json({ message: "Failed to analyze workout form" });
    }
  });
  
  app.post("/api/ai/fitness-insights", async (req: Request, res: Response) => {
    try {
      const { 
        workoutHistory, 
        dietHistory, 
        progressMetrics, 
        goal 
      } = req.body;
      
      if (!workoutHistory || !goal) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const insights = await generateFitnessInsights(
        workoutHistory,
        dietHistory || "",
        progressMetrics || "",
        goal
      );
      
      res.status(200).json({ insights });
    } catch (error) {
      console.error("Error generating fitness insights:", error);
      res.status(500).json({ message: "Failed to generate fitness insights" });
    }
  });
  
  app.post("/api/ai/fitness-question", async (req: Request, res: Response) => {
    try {
      const { question } = req.body;
      
      if (!question) {
        return res.status(400).json({ message: "Question is required" });
      }
      
      const answer = await answerFitnessQuestion(question);
      
      res.status(200).json({ answer });
    } catch (error) {
      console.error("Error answering fitness question:", error);
      res.status(500).json({ message: "Failed to answer fitness question" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
