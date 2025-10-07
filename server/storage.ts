import { 
  users, type User, type InsertUser,
  workouts, type Workout, type InsertWorkout,
  exercises, type Exercise, type InsertExercise,
  workoutExercises, type WorkoutExercise, type InsertWorkoutExercise,
  meals, type Meal, type InsertMeal,
  progressRecords, type ProgressRecord, type InsertProgressRecord,
  challenges, type Challenge, type InsertChallenge,
  challengeParticipants, type ChallengeParticipant, type InsertChallengeParticipant
} from "@shared/schema";
import {
  type Character,
  type InsertCharacter,
  type Quest,
  type InsertQuest,
  defaultStats,
} from "@shared/rpg";

// Extend storage interface with required methods
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Workouts
  getWorkout(id: number): Promise<Workout | undefined>;
  getUserWorkouts(userId: number): Promise<Workout[]>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  updateWorkout(id: number, workout: Partial<Workout>): Promise<Workout | undefined>;
  deleteWorkout(id: number): Promise<boolean>;
  
  // Exercises
  getExercise(id: number): Promise<Exercise | undefined>;
  getExercises(): Promise<Exercise[]>;
  getExercisesByType(type: string): Promise<Exercise[]>;
  getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  
  // Workout Exercises
  getWorkoutExercises(workoutId: number): Promise<WorkoutExercise[]>;
  addExerciseToWorkout(workoutExercise: InsertWorkoutExercise): Promise<WorkoutExercise>;
  removeExerciseFromWorkout(workoutId: number, exerciseId: number): Promise<boolean>;
  
  // Meals
  getMeal(id: number): Promise<Meal | undefined>;
  getUserMeals(userId: number): Promise<Meal[]>;
  createMeal(meal: InsertMeal): Promise<Meal>;
  updateMeal(id: number, meal: Partial<Meal>): Promise<Meal | undefined>;
  deleteMeal(id: number): Promise<boolean>;
  
  // Progress Records
  getUserProgressRecords(userId: number): Promise<ProgressRecord[]>;
  createProgressRecord(record: InsertProgressRecord): Promise<ProgressRecord>;
  
  // Challenges
  getChallenges(): Promise<Challenge[]>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  
  // Challenge Participants
  joinChallenge(challengeParticipant: InsertChallengeParticipant): Promise<ChallengeParticipant>;
  leaveChallenge(challengeId: number, userId: number): Promise<boolean>;
  getChallengeParticipants(challengeId: number): Promise<ChallengeParticipant[]>;
  getUserChallenges(userId: number): Promise<Challenge[]>;

  // RPG - Characters
  createCharacter(input: InsertCharacter): Promise<Character>;
  getCharacter(id: number): Promise<Character | undefined>;
  getUserCharacters(userId: number): Promise<Character[]>;
  addXp(characterId: number, amount: number, reason?: string): Promise<Character | undefined>;

  // RPG - Quests
  getQuests(): Promise<Quest[]>;
  createQuest(input: InsertQuest): Promise<Quest>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workouts: Map<number, Workout>;
  private exercises: Map<number, Exercise>;
  private workoutExercises: Map<number, WorkoutExercise>;
  private meals: Map<number, Meal>;
  private progressRecords: Map<number, ProgressRecord>;
  private challenges: Map<number, Challenge>;
  private challengeParticipants: Map<number, ChallengeParticipant>;
  // RPG
  private characters: Map<number, Character>;
  private quests: Map<number, Quest>;
  
  private userIdCounter: number;
  private workoutIdCounter: number;
  private exerciseIdCounter: number;
  private workoutExerciseIdCounter: number;
  private mealIdCounter: number;
  private progressRecordIdCounter: number;
  private challengeIdCounter: number;
  private challengeParticipantIdCounter: number;
  private characterIdCounter: number;
  private questIdCounter: number;

  constructor() {
    this.users = new Map();
    this.workouts = new Map();
    this.exercises = new Map();
    this.workoutExercises = new Map();
    this.meals = new Map();
    this.progressRecords = new Map();
    this.challenges = new Map();
    this.challengeParticipants = new Map();
    this.characters = new Map();
    this.quests = new Map();
    
    this.userIdCounter = 1;
    this.workoutIdCounter = 1;
    this.exerciseIdCounter = 1;
    this.workoutExerciseIdCounter = 1;
    this.mealIdCounter = 1;
    this.progressRecordIdCounter = 1;
    this.challengeIdCounter = 1;
    this.challengeParticipantIdCounter = 1;
    this.characterIdCounter = 1;
    this.questIdCounter = 1;
    
    this.initializeData();
  }
  
  private initializeData() {
    // Add sample exercises
    this.initializeExercises();
    
    // Add sample challenges
    this.initializeChallenges();

    // Add sample RPG quests
    this.initializeRpgQuests();
  }
  
  private initializeExercises() {
    const sampleExercises: InsertExercise[] = [
      {
        name: "Bench Press",
        type: "strength",
        muscleGroup: "chest",
        difficulty: "intermediate",
        equipment: "barbell, bench",
        description: "A compound exercise that primarily targets the chest muscles.",
        instructions: "Lie on a bench, grip the barbell with hands slightly wider than shoulder-width, lower the bar to your chest, then push it back up.",
        videoUrl: "",
      },
      {
        name: "Incline Dumbbell Press",
        type: "strength",
        muscleGroup: "chest",
        difficulty: "intermediate",
        equipment: "dumbbells, incline bench",
        description: "A variation of the chest press that emphasizes the upper chest muscles.",
        instructions: "Lie on an incline bench set to 30-45 degrees, hold a dumbbell in each hand at shoulder level, press the weights up until arms are extended, then lower them back down.",
        videoUrl: "",
      },
      {
        name: "Cable Flyes",
        type: "strength",
        muscleGroup: "chest",
        difficulty: "intermediate",
        equipment: "cable machine",
        description: "An isolation exercise that targets the chest muscles through horizontal adduction.",
        instructions: "Stand between cable stations with cables set at shoulder height, grab handles with palms facing forward, step forward and bring hands together in front of you with a slight bend in the elbows.",
        videoUrl: "",
      },
      {
        name: "Tricep Pushdowns",
        type: "strength",
        muscleGroup: "arms",
        difficulty: "beginner",
        equipment: "cable machine",
        description: "An isolation exercise for the triceps muscles.",
        instructions: "Stand facing a cable machine with a rope or bar attachment at shoulder height, grip the attachment with hands close together, keep elbows at your sides, and push the attachment down until arms are fully extended.",
        videoUrl: "",
      },
      {
        name: "Squats",
        type: "strength",
        muscleGroup: "legs",
        difficulty: "intermediate",
        equipment: "barbell, squat rack",
        description: "A compound exercise that targets the quadriceps, hamstrings, and glutes.",
        instructions: "Stand with feet shoulder-width apart, barbell across upper back, bend knees and lower hips until thighs are parallel to the floor, then stand back up.",
        videoUrl: "",
      },
      {
        name: "Deadlifts",
        type: "strength",
        muscleGroup: "back",
        difficulty: "advanced",
        equipment: "barbell",
        description: "A compound exercise that works multiple muscle groups including the back, legs, and core.",
        instructions: "Stand with feet hip-width apart, barbell over midfoot, bend at hips and knees to grip the bar, keep back straight, and lift the bar by extending hips and knees.",
        videoUrl: "",
      },
    ];
    
    sampleExercises.forEach(exercise => {
      this.createExercise(exercise);
    });
  }

  private initializeRpgQuests() {
    const sample: InsertQuest[] = [
      { title: "First Steps", description: "Complete a 10-minute walk.", tier: "F" },
      { title: "Awakening", description: "Do a 20-minute full-body session.", tier: "E" },
      { title: "Iron Will", description: "Finish a 30-minute strength workout.", tier: "D" },
    ];
    sample.forEach(q => {
      void this.createQuest(q);
    });
  }
  
  private initializeChallenges() {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    const sixtyDaysFromNow = new Date(today);
    sixtyDaysFromNow.setDate(today.getDate() + 60);
    
    const sampleChallenges: InsertChallenge[] = [
      {
        name: "Summer Shred Challenge",
        description: "Complete 20 workouts in 30 days and earn the Summer Warrior badge",
        difficulty: "intermediate",
        startDate: today,
        endDate: thirtyDaysFromNow,
        goal: "Complete 20 workouts",
        reward: "Summer Warrior Badge",
        isFeatured: true,
      },
      {
        name: "1000 lb Club Challenge",
        description: "Reach a combined 1000 lb total for squat, bench press, and deadlift",
        difficulty: "advanced",
        startDate: today,
        endDate: sixtyDaysFromNow,
        goal: "1000 lb combined total",
        reward: "Strength Master Badge",
        isFeatured: false,
      },
    ];
    
    sampleChallenges.forEach(challenge => {
      const newChallenge = this.createChallenge(challenge);
      // Set participant count
      this.challenges.set(newChallenge.id, {
        ...newChallenge,
        participantCount: newChallenge.name === "Summer Shred Challenge" ? 483 : 189
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(userInput: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...userInput, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Workout methods
  async getWorkout(id: number): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  async getUserWorkouts(userId: number): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(workout => workout.userId === userId);
  }

  async createWorkout(workoutInput: InsertWorkout): Promise<Workout> {
    const id = this.workoutIdCounter++;
    const workout: Workout = { ...workoutInput, id, createdAt: new Date() };
    this.workouts.set(id, workout);
    return workout;
  }

  async updateWorkout(id: number, workoutUpdate: Partial<Workout>): Promise<Workout | undefined> {
    const workout = this.workouts.get(id);
    if (!workout) return undefined;
    
    const updatedWorkout = { ...workout, ...workoutUpdate };
    this.workouts.set(id, updatedWorkout);
    return updatedWorkout;
  }

  async deleteWorkout(id: number): Promise<boolean> {
    return this.workouts.delete(id);
  }

  // Exercise methods
  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercisesByType(type: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(exercise => exercise.type === type);
  }

  async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(exercise => exercise.muscleGroup === muscleGroup);
  }

  async createExercise(exerciseInput: InsertExercise): Promise<Exercise> {
    const id = this.exerciseIdCounter++;
    const exercise: Exercise = { ...exerciseInput, id, createdAt: new Date() };
    this.exercises.set(id, exercise);
    return exercise;
  }

  // Workout Exercise methods
  async getWorkoutExercises(workoutId: number): Promise<WorkoutExercise[]> {
    return Array.from(this.workoutExercises.values()).filter(we => we.workoutId === workoutId);
  }

  async addExerciseToWorkout(workoutExerciseInput: InsertWorkoutExercise): Promise<WorkoutExercise> {
    const id = this.workoutExerciseIdCounter++;
    const workoutExercise: WorkoutExercise = { ...workoutExerciseInput, id, createdAt: new Date() };
    this.workoutExercises.set(id, workoutExercise);
    return workoutExercise;
  }

  async removeExerciseFromWorkout(workoutId: number, exerciseId: number): Promise<boolean> {
    const workoutExerciseToRemove = Array.from(this.workoutExercises.values()).find(
      we => we.workoutId === workoutId && we.exerciseId === exerciseId
    );
    
    if (!workoutExerciseToRemove) return false;
    return this.workoutExercises.delete(workoutExerciseToRemove.id);
  }

  // Meal methods
  async getMeal(id: number): Promise<Meal | undefined> {
    return this.meals.get(id);
  }

  async getUserMeals(userId: number): Promise<Meal[]> {
    return Array.from(this.meals.values()).filter(meal => meal.userId === userId);
  }

  async createMeal(mealInput: InsertMeal): Promise<Meal> {
    const id = this.mealIdCounter++;
    const meal: Meal = { ...mealInput, id, createdAt: new Date() };
    this.meals.set(id, meal);
    return meal;
  }

  async updateMeal(id: number, mealUpdate: Partial<Meal>): Promise<Meal | undefined> {
    const meal = this.meals.get(id);
    if (!meal) return undefined;
    
    const updatedMeal = { ...meal, ...mealUpdate };
    this.meals.set(id, updatedMeal);
    return updatedMeal;
  }

  async deleteMeal(id: number): Promise<boolean> {
    return this.meals.delete(id);
  }

  // Progress Record methods
  async getUserProgressRecords(userId: number): Promise<ProgressRecord[]> {
    return Array.from(this.progressRecords.values())
      .filter(record => record.userId === userId)
      .sort((a, b) => new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime());
  }

  async createProgressRecord(recordInput: InsertProgressRecord): Promise<ProgressRecord> {
    const id = this.progressRecordIdCounter++;
    const record: ProgressRecord = { ...recordInput, id, createdAt: new Date() };
    this.progressRecords.set(id, record);
    return record;
  }

  // Challenge methods
  async getChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values());
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }

  async createChallenge(challengeInput: InsertChallenge): Promise<Challenge> {
    const id = this.challengeIdCounter++;
    const challenge: Challenge = { 
      ...challengeInput, 
      id, 
      participantCount: 0,
      createdAt: new Date() 
    };
    this.challenges.set(id, challenge);
    return challenge;
  }

  // Challenge Participant methods
  async joinChallenge(participantInput: InsertChallengeParticipant): Promise<ChallengeParticipant> {
    const id = this.challengeParticipantIdCounter++;
    const participant: ChallengeParticipant = { 
      ...participantInput, 
      id, 
      joinedAt: new Date(),
      completed: false,
      completedAt: null
    };
    this.challengeParticipants.set(id, participant);
    
    // Update participant count in the challenge
    const challenge = this.challenges.get(participantInput.challengeId);
    if (challenge) {
      this.challenges.set(challenge.id, {
        ...challenge,
        participantCount: challenge.participantCount + 1
      });
    }
    
    return participant;
  }

  async leaveChallenge(challengeId: number, userId: number): Promise<boolean> {
    const participant = Array.from(this.challengeParticipants.values()).find(
      p => p.challengeId === challengeId && p.userId === userId
    );
    
    if (!participant) return false;
    
    const result = this.challengeParticipants.delete(participant.id);
    
    // Update participant count in the challenge
    if (result) {
      const challenge = this.challenges.get(challengeId);
      if (challenge && challenge.participantCount > 0) {
        this.challenges.set(challenge.id, {
          ...challenge,
          participantCount: challenge.participantCount - 1
        });
      }
    }
    
    return result;
  }

  async getChallengeParticipants(challengeId: number): Promise<ChallengeParticipant[]> {
    return Array.from(this.challengeParticipants.values())
      .filter(participant => participant.challengeId === challengeId);
  }

  async getUserChallenges(userId: number): Promise<Challenge[]> {
    const userParticipations = Array.from(this.challengeParticipants.values())
      .filter(participant => participant.userId === userId);
    
    return userParticipations.map(participation => {
      const challenge = this.challenges.get(participation.challengeId);
      return challenge!;
    }).filter(Boolean);
  }

  // RPG - Characters
  async createCharacter(input: InsertCharacter): Promise<Character> {
    const id = this.characterIdCounter++;
    const character: Character = {
      id,
      userId: input.userId,
      name: input.name,
      className: input.className,
      level: 1,
      xp: 0,
      stats: { ...defaultStats },
      createdAt: new Date(),
    };
    this.characters.set(id, character);
    return character;
  }

  async getCharacter(id: number): Promise<Character | undefined> {
    return this.characters.get(id);
  }

  async getUserCharacters(userId: number): Promise<Character[]> {
    return Array.from(this.characters.values()).filter(c => c.userId === userId);
  }

  private computeLevelFromXp(xp: number): number {
    // Simple curve: 1000 XP per level
    return Math.max(1, Math.floor(xp / 1000) + 1);
  }

  async addXp(characterId: number, amount: number): Promise<Character | undefined> {
    const c = this.characters.get(characterId);
    if (!c) return undefined;
    const newXp = Math.max(0, c.xp + Math.max(0, amount));
    const newLevel = this.computeLevelFromXp(newXp);
    const updated: Character = { ...c, xp: newXp, level: newLevel };
    this.characters.set(characterId, updated);
    return updated;
  }

  // RPG - Quests
  async getQuests(): Promise<Quest[]> {
    return Array.from(this.quests.values());
  }

  async createQuest(input: InsertQuest): Promise<Quest> {
    const id = this.questIdCounter++;
    const quest: Quest = { id, ...input, createdAt: new Date() };
    this.quests.set(id, quest);
    return quest;
  }
}

export const storage = new MemStorage();
