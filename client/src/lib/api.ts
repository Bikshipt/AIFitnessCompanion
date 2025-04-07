import { apiRequest } from "./queryClient";
import { 
  User, 
  Workout, 
  Exercise, 
  WorkoutExercise, 
  Meal, 
  ProgressRecord, 
  Challenge, 
  ChallengeParticipant 
} from "./types";

// Auth API
export const registerUser = async (userData: Record<string, any>): Promise<User> => {
  const res = await apiRequest("POST", "/api/auth/register", userData);
  return res.json();
};

export const loginUser = async (credentials: { username: string; password: string }): Promise<User> => {
  const res = await apiRequest("POST", "/api/auth/login", credentials);
  return res.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const res = await apiRequest("GET", `/api/auth/user/${userId}`);
  return res.json();
};

// Workouts API
export const getUserWorkouts = async (userId: number): Promise<Workout[]> => {
  const res = await apiRequest("GET", `/api/workouts?userId=${userId}`);
  return res.json();
};

export const getWorkout = async (workoutId: number): Promise<Workout> => {
  const res = await apiRequest("GET", `/api/workouts/${workoutId}`);
  return res.json();
};

export const createWorkout = async (workoutData: Record<string, any>): Promise<Workout> => {
  const res = await apiRequest("POST", "/api/workouts", workoutData);
  return res.json();
};

export const updateWorkout = async (workoutId: number, workoutData: Record<string, any>): Promise<Workout> => {
  const res = await apiRequest("PUT", `/api/workouts/${workoutId}`, workoutData);
  return res.json();
};

export const deleteWorkout = async (workoutId: number): Promise<void> => {
  await apiRequest("DELETE", `/api/workouts/${workoutId}`);
};

// Exercises API
export const getExercises = async (params?: { type?: string; muscleGroup?: string }): Promise<Exercise[]> => {
  let url = "/api/exercises";
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append("type", params.type);
    if (params.muscleGroup) queryParams.append("muscleGroup", params.muscleGroup);
    
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
  }
  
  const res = await apiRequest("GET", url);
  return res.json();
};

export const getExercise = async (exerciseId: number): Promise<Exercise> => {
  const res = await apiRequest("GET", `/api/exercises/${exerciseId}`);
  return res.json();
};

export const createExercise = async (exerciseData: Record<string, any>): Promise<Exercise> => {
  const res = await apiRequest("POST", "/api/exercises", exerciseData);
  return res.json();
};

// Workout Exercises API
export const getWorkoutExercises = async (workoutId: number): Promise<WorkoutExercise[]> => {
  const res = await apiRequest("GET", `/api/workouts/${workoutId}/exercises`);
  return res.json();
};

export const addExerciseToWorkout = async (workoutId: number, exerciseData: Record<string, any>): Promise<WorkoutExercise> => {
  const res = await apiRequest("POST", `/api/workouts/${workoutId}/exercises`, exerciseData);
  return res.json();
};

export const removeExerciseFromWorkout = async (workoutId: number, exerciseId: number): Promise<void> => {
  await apiRequest("DELETE", `/api/workouts/${workoutId}/exercises/${exerciseId}`);
};

// Meals API
export const getUserMeals = async (userId: number): Promise<Meal[]> => {
  const res = await apiRequest("GET", `/api/meals?userId=${userId}`);
  return res.json();
};

export const createMeal = async (mealData: Record<string, any>): Promise<Meal> => {
  const res = await apiRequest("POST", "/api/meals", mealData);
  return res.json();
};

export const updateMeal = async (mealId: number, mealData: Record<string, any>): Promise<Meal> => {
  const res = await apiRequest("PUT", `/api/meals/${mealId}`, mealData);
  return res.json();
};

export const deleteMeal = async (mealId: number): Promise<void> => {
  await apiRequest("DELETE", `/api/meals/${mealId}`);
};

// Progress API
export const getUserProgress = async (userId: number): Promise<ProgressRecord[]> => {
  const res = await apiRequest("GET", `/api/progress/${userId}`);
  return res.json();
};

export const createProgressRecord = async (recordData: Record<string, any>): Promise<ProgressRecord> => {
  const res = await apiRequest("POST", "/api/progress", recordData);
  return res.json();
};

// Challenges API
export const getChallenges = async (): Promise<Challenge[]> => {
  const res = await apiRequest("GET", "/api/challenges");
  return res.json();
};

export const getChallenge = async (challengeId: number): Promise<Challenge> => {
  const res = await apiRequest("GET", `/api/challenges/${challengeId}`);
  return res.json();
};

export const joinChallenge = async (challengeId: number, userId: number): Promise<ChallengeParticipant> => {
  const res = await apiRequest("POST", `/api/challenges/${challengeId}/join`, { userId });
  return res.json();
};

export const leaveChallenge = async (challengeId: number, userId: number): Promise<void> => {
  await apiRequest("DELETE", `/api/challenges/${challengeId}/leave?userId=${userId}`);
};

export const getUserChallenges = async (userId: number): Promise<Challenge[]> => {
  const res = await apiRequest("GET", `/api/users/${userId}/challenges`);
  return res.json();
};
