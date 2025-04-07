// User types
export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  fitnessLevel: string;
  height?: number;
  weight?: number;
  goal: string;
}

// Workout types
export interface Workout {
  id: number;
  userId: number;
  name: string;
  type: string;
  difficulty: string;
  duration: number;
  calories?: number;
  description?: string;
  completed: boolean;
  scheduledFor?: Date;
}

export interface Exercise {
  id: number;
  name: string;
  type: string;
  muscleGroup: string;
  difficulty: string;
  equipment?: string;
  description?: string;
  instructions?: string;
  videoUrl?: string;
}

export interface WorkoutExercise {
  id: number;
  workoutId: number;
  exerciseId: number;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  restTime?: number;
  order: number;
  
  // Joined data
  exercise?: Exercise;
}

// Meal types
export interface Meal {
  id: number;
  userId: number;
  name: string;
  type: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  description?: string;
  scheduledFor?: Date;
}

// Progress types
export interface ProgressRecord {
  id: number;
  userId: number;
  weight?: number;
  strength?: number;
  workoutsCompleted?: number;
  recordDate: Date;
}

// Challenge types
export interface Challenge {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  startDate: Date;
  endDate: Date;
  goal: string;
  reward?: string;
  participantCount: number;
  isFeatured: boolean;
}

export interface ChallengeParticipant {
  id: number;
  challengeId: number;
  userId: number;
  joinedAt: Date;
  completed: boolean;
  completedAt?: Date;
}

// Chat types
export interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

// Stats types
export interface UserStats {
  todayWorkout?: {
    name: string;
    scheduledTime: string;
  };
  calories: {
    current: number;
    target: number;
  };
  progress: {
    percentage: number;
    change: number;
  };
  streak: {
    days: number;
    toRecord: number;
  };
}

// Diet types
export interface NutritionMacros {
  protein: {
    current: number;
    target: number;
  };
  carbs: {
    current: number;
    target: number;
  };
  fat: {
    current: number;
    target: number;
  };
}
