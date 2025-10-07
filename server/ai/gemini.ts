import { GoogleGenerativeAI } from '@google/generative-ai';

// Check if API key is available
const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY is not set. AI features will return mock data.');
  console.warn('📝 To use real AI features:');
  console.warn('   1. Get your API key from: https://makersuite.google.com/app/apikey');
  console.warn('   2. Create a .env file in the project root');
  console.warn('   3. Add: GEMINI_API_KEY=your_api_key_here');
}

// Initialize the Google Generative AI with the API key
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Get the generative model (Gemini Pro)
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-pro' }) : null;

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
  // Return mock data if no API key is set
  if (!model) {
    return `# Mock Workout Plan (Add GEMINI_API_KEY to .env for real AI-generated plans)

## ${goal} Workout Plan
**Fitness Level:** ${fitnessLevel}
**Duration:** ${duration} minutes per session
**Frequency:** ${frequency} days per week

### Weekly Schedule
- **Day 1-3:** Upper body focus with compound movements
- **Day 4-5:** Lower body and core strength
- **Day 6-7:** Active recovery or rest

### Sample Exercises
1. **Warm-up** (5-10 min): Dynamic stretching, light cardio
2. **Main Workout** (${duration - 15} min):
   - Push-ups: 3 sets x 10-15 reps
   - Squats: 3 sets x 12-15 reps
   - Planks: 3 sets x 30-60 sec
3. **Cool-down** (5 min): Static stretching

💡 **To get AI-generated personalized plans:** Set up your GEMINI_API_KEY in the .env file.`;
  }

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
  // Return mock data if no API key is set
  if (!model) {
    return `# Mock Diet Plan (Add GEMINI_API_KEY to .env for real AI-generated plans)

## ${dietType} Diet Plan
**Daily Calories:** ${calorieGoal} kcal
**Meals Per Day:** ${mealsPerDay}
**Goal:** ${goal}

### Sample Daily Meal Plan

**Breakfast** (7:00 AM)
- Oatmeal with berries and nuts
- Greek yogurt
- Coffee/Tea
*~${Math.round(calorieGoal / mealsPerDay)} calories*

**Lunch** (12:00 PM)
- Grilled chicken breast
- Brown rice
- Mixed vegetables
*~${Math.round(calorieGoal / mealsPerDay)} calories*

**Dinner** (7:00 PM)
- Salmon fillet
- Sweet potato
- Salad
*~${Math.round(calorieGoal / mealsPerDay)} calories*

### Macronutrient Split
- **Protein:** 30% (~${Math.round(calorieGoal * 0.3 / 4)}g)
- **Carbs:** 40% (~${Math.round(calorieGoal * 0.4 / 4)}g)
- **Fats:** 30% (~${Math.round(calorieGoal * 0.3 / 9)}g)

💡 **To get AI-generated personalized meal plans:** Set up your GEMINI_API_KEY in the .env file.`;
  }

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
  // Return mock data if no API key is set
  if (!model) {
    return `# Form Analysis for ${exercise} (Mock Data)

**Your Description:** "${formDescription}"

## Assessment
✅ **Good Points:**
- Attempting the exercise shows commitment

⚠️ **Areas for Improvement:**
- For detailed AI-powered form analysis, add GEMINI_API_KEY to .env

## General Tips for ${exercise}:
- Focus on controlled movements
- Maintain proper breathing
- Start with lighter weights to master form
- Consider filming yourself for self-assessment

💡 **To get AI-powered form analysis:** Set up your GEMINI_API_KEY in the .env file.`;
  }

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
  // Return mock data if no API key is set
  if (!model) {
    return `# Fitness Insights (Mock Data)

## Your Goal: ${goal}

### Progress Assessment
📊 Your journey is showing positive signs! Keep up the consistency.

### Key Recommendations
1. **Workout:** Continue progressive overload
2. **Nutrition:** Stay within your calorie targets
3. **Recovery:** Ensure 7-8 hours of sleep
4. **Hydration:** Drink at least 2-3 liters of water daily

### Next Milestones
- Track weekly progress photos
- Measure body composition monthly
- Adjust macros based on results

💡 **To get AI-powered personalized insights:** Set up your GEMINI_API_KEY in the .env file for detailed analysis of your workout history, diet, and progress metrics.`;
  }

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
  // Return mock data if no API key is set
  if (!model) {
    return `# AI Fitness Coach (Mock Response)

**Your Question:** "${question}"

**Response:**
Thank you for your question! To get personalized, AI-powered fitness advice, please set up your Google Gemini API key.

### General Fitness Tips:
- **Consistency is key** - Regular exercise is more important than intensity
- **Progressive overload** - Gradually increase difficulty over time
- **Recovery matters** - Get adequate sleep and rest days
- **Nutrition is 70%** - You can't out-train a bad diet
- **Stay hydrated** - Drink water throughout the day

💡 **To get AI-powered answers to your fitness questions:**
1. Get your API key from: https://makersuite.google.com/app/apikey
2. Create a \`.env\` file in the project root
3. Add: \`GEMINI_API_KEY=your_api_key_here\`
4. Restart the server`;
  }

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