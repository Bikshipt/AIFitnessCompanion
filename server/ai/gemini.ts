import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Get the generative model (Gemini Pro)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * Generate a personalized workout plan based on user preferences
 */
export async function generateWorkoutPlan(
  fitnessLevel: string,
  goal: string,
  equipment: string,
  duration: number,
  frequency: number,
  preferences: string,
  restrictions: string
): Promise<string> {
  const prompt = `
    Create a personalized workout plan with the following parameters:
    - Fitness Level: ${fitnessLevel}
    - Goal: ${goal}
    - Available Equipment: ${equipment}
    - Workout Duration: ${duration} minutes
    - Frequency: ${frequency} days per week
    - Preferences: ${preferences}
    - Restrictions/Injuries: ${restrictions}

    Format the response as a detailed workout plan with:
    1. A brief introduction explaining the plan's focus
    2. Weekly schedule breakdown
    3. Detailed exercises with sets, reps, and rest periods
    4. Progressive overload suggestions
    5. Warm-up and cool-down recommendations
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating workout plan:', error);
    throw new Error('Failed to generate workout plan');
  }
}

/**
 * Generate a personalized diet plan based on user preferences
 */
export async function generateDietPlan(
  calorieGoal: number,
  dietType: string,
  restrictions: string,
  goal: string,
  mealsPerDay: number
): Promise<string> {
  const prompt = `
    Create a personalized diet plan with the following parameters:
    - Daily Calorie Goal: ${calorieGoal} calories
    - Diet Type: ${dietType}
    - Dietary Restrictions: ${restrictions}
    - Fitness Goal: ${goal}
    - Meals Per Day: ${mealsPerDay}

    Format the response as a detailed meal plan with:
    1. A brief introduction explaining the nutritional approach
    2. Weekly meal plan with specific foods for each meal
    3. Macronutrient breakdown (protein, carbs, fats)
    4. Hydration recommendations
    5. Supplement suggestions if appropriate
    6. Timing of meals relative to workouts
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating diet plan:', error);
    throw new Error('Failed to generate diet plan');
  }
}

/**
 * Analyze workout form based on description
 */
export async function analyzeWorkoutForm(
  exercise: string,
  formDescription: string
): Promise<string> {
  const prompt = `
    Analyze the following workout form for ${exercise}:
    "${formDescription}"

    Provide detailed feedback on:
    1. What's being done correctly
    2. Areas for improvement
    3. Common mistakes to avoid
    4. Safety considerations
    5. Specific cues to improve form
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing workout form:', error);
    throw new Error('Failed to analyze workout form');
  }
}

/**
 * Generate personalized fitness insights
 */
export async function generateFitnessInsights(
  workoutHistory: string,
  dietHistory: string,
  progressMetrics: string,
  goal: string
): Promise<string> {
  const prompt = `
    Based on the following user data, provide personalized fitness insights:
    
    Workout History: ${workoutHistory}
    Diet History: ${dietHistory}
    Progress Metrics: ${progressMetrics}
    Goal: ${goal}

    Provide insights on:
    1. Progress assessment (what's working, what's not)
    2. Potential plateaus and how to overcome them
    3. Optimization suggestions for both workout and nutrition
    4. Recovery recommendations
    5. Next milestone targets
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating fitness insights:', error);
    throw new Error('Failed to generate fitness insights');
  }
}

/**
 * Answer a fitness-related question
 */
export async function answerFitnessQuestion(question: string): Promise<string> {
  const prompt = `
    Answer the following fitness question as an expert personal trainer and nutritionist:
    "${question}"
    
    Provide an informative, accurate, and helpful response based on current scientific understanding.
    Include practical advice when appropriate.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error answering fitness question:', error);
    throw new Error('Failed to answer fitness question');
  }
}