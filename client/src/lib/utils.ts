import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatTime(date: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function calculateCalorieProgress(current: number, target: number): number {
  return Math.round((current / target) * 100);
}

export function calculateMacroPercentage(current: number, target: number): number {
  return Math.min(Math.round((current / target) * 100), 100);
}

// Mock sample user data for UI development
export const SAMPLE_USER = {
  id: 1,
  username: "johnsmith",
  firstName: "John",
  lastName: "Smith",
  email: "john@example.com",
  fitnessLevel: "Intermediate",
  height: 180,
  weight: 75,
  goal: "Muscle Gain"
};

// Helper function to create a default user for the app
export const getDefaultUser = (): any => {
  // In a real app, this would check localStorage or a cookie for a logged in user
  return SAMPLE_USER;
};
