import { apiRequest } from './queryClient';

/**
 * Generate a personalized workout plan
 */
export async function generateWorkoutPlan(params: {
  fitnessLevel: string;
  goal: string;
  equipment?: string;
  duration: number;
  frequency: number;
  preferences?: string;
  restrictions?: string;
}): Promise<string> {
  const response = await apiRequest('POST', '/api/ai/workout-plan', params);
  const data = await response.json();
  return data.workoutPlan;
}

/**
 * Generate a personalized diet plan
 */
export async function generateDietPlan(params: {
  calorieGoal: number;
  dietType: string;
  restrictions?: string;
  goal: string;
  mealsPerDay?: number;
}): Promise<string> {
  const response = await apiRequest('POST', '/api/ai/diet-plan', params);
  const data = await response.json();
  return data.dietPlan;
}

/**
 * Analyze workout form
 */
export async function analyzeWorkoutForm(params: {
  exercise: string;
  formDescription: string;
}): Promise<string> {
  const response = await apiRequest('POST', '/api/ai/form-analysis', params);
  const data = await response.json();
  return data.formAnalysis;
}

/**
 * Generate personalized fitness insights
 */
export async function generateFitnessInsights(params: {
  workoutHistory: string;
  dietHistory?: string;
  progressMetrics?: string;
  goal: string;
}): Promise<string> {
  const response = await apiRequest('POST', '/api/ai/fitness-insights', params);
  const data = await response.json();
  return data.insights;
}

/**
 * Ask a fitness-related question
 */
export async function askFitnessQuestion(question: string): Promise<string> {
  const response = await apiRequest('POST', '/api/ai/fitness-question', { question });
  const data = await response.json();
  return data.answer;
}