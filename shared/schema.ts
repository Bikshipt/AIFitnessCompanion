import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  fitnessLevel: text("fitness_level").notNull().default("beginner"),
  height: integer("height"), // in cm
  weight: integer("weight"), // in kg
  goal: text("goal").default("general_fitness"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true,
  createdAt: true
});

// Workouts
export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // strength, cardio, flexibility, etc.
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  duration: integer("duration").notNull(), // in minutes
  calories: integer("calories"), // estimated calories burned
  description: text("description"),
  completed: boolean("completed").default(false),
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWorkoutSchema = createInsertSchema(workouts).omit({
  id: true,
  createdAt: true
});

// Exercises
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // strength, cardio, etc.
  muscleGroup: text("muscle_group").notNull(), // chest, back, legs, etc.
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  equipment: text("equipment"), // required equipment if any
  description: text("description"),
  instructions: text("instructions"),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
  createdAt: true
});

// Workout Exercises (junction table)
export const workoutExercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull(),
  exerciseId: integer("exercise_id").notNull(),
  sets: integer("sets"),
  reps: integer("reps"),
  weight: integer("weight"), // in kg
  duration: integer("duration"), // in seconds
  restTime: integer("rest_time"), // in seconds
  order: integer("order").notNull(), // order of exercises in workout
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWorkoutExerciseSchema = createInsertSchema(workoutExercises).omit({
  id: true,
  createdAt: true
});

// Meals
export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // breakfast, lunch, dinner, snack
  calories: integer("calories").notNull(),
  protein: integer("protein"), // in grams
  carbs: integer("carbs"), // in grams
  fat: integer("fat"), // in grams
  description: text("description"),
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMealSchema = createInsertSchema(meals).omit({
  id: true,
  createdAt: true
});

// Progress records
export const progressRecords = pgTable("progress_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  weight: integer("weight"), // in kg
  strength: integer("strength"), // arbitrary strength score
  workoutsCompleted: integer("workouts_completed"),
  recordDate: date("record_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProgressRecordSchema = createInsertSchema(progressRecords).omit({
  id: true,
  createdAt: true
});

// Challenges
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  goal: text("goal").notNull(),
  reward: text("reward"),
  participantCount: integer("participant_count").default(0),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
  participantCount: true,
  createdAt: true
});

// Challenge Participants
export const challengeParticipants = pgTable("challenge_participants", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull(),
  userId: integer("user_id").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const insertChallengeParticipantSchema = createInsertSchema(challengeParticipants).omit({
  id: true,
  joinedAt: true,
  completed: true,
  completedAt: true
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = z.infer<typeof insertWorkoutSchema>;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type InsertWorkoutExercise = z.infer<typeof insertWorkoutExerciseSchema>;

export type Meal = typeof meals.$inferSelect;
export type InsertMeal = z.infer<typeof insertMealSchema>;

export type ProgressRecord = typeof progressRecords.$inferSelect;
export type InsertProgressRecord = z.infer<typeof insertProgressRecordSchema>;

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;

export type ChallengeParticipant = typeof challengeParticipants.$inferSelect;
export type InsertChallengeParticipant = z.infer<typeof insertChallengeParticipantSchema>;
