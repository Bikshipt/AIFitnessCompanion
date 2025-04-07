import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, CalendarDays, Download, Printer, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import MealCard from './MealCard';
import { generateDietPlan } from '@/lib/aiService';
import { useToast } from '@/hooks/use-toast';

interface DietPlannerProps {
  calorieGoal: number;
  dietType: string;
  restrictions: string;
}

interface Meal {
  id: number;
  type: string;
  name: string;
  calories: number;
}

// Default meal plans as fallback
const defaultMealPlan = {
  monday: [
    {
      id: 1,
      type: 'breakfast',
      name: 'Greek yogurt with berries and granola',
      calories: 450,
    },
    {
      id: 2,
      type: 'lunch',
      name: 'Chicken quinoa bowl with avocado',
      calories: 630,
    },
    {
      id: 3,
      type: 'dinner',
      name: 'Salmon with roasted vegetables',
      calories: 550,
    },
    {
      id: 4,
      type: 'snack',
      name: 'Protein shake with banana',
      calories: 320,
    }
  ],
  tuesday: [
    {
      id: 5,
      type: 'breakfast',
      name: 'Spinach and mushroom omelette',
      calories: 380,
    },
    {
      id: 6,
      type: 'lunch',
      name: 'Turkey wrap with mixed greens',
      calories: 520,
    },
    {
      id: 7,
      type: 'dinner',
      name: 'Grilled steak with sweet potato',
      calories: 680,
    },
    {
      id: 8,
      type: 'snack',
      name: 'Apple with almond butter',
      calories: 240,
    }
  ],
  wednesday: [
    {
      id: 9,
      type: 'breakfast',
      name: 'Overnight protein oats with berries',
      calories: 420,
    },
    {
      id: 10,
      type: 'lunch',
      name: 'Tuna salad with mixed vegetables',
      calories: 480,
    },
    {
      id: 11,
      type: 'dinner',
      name: 'Chicken stir-fry with brown rice',
      calories: 590,
    },
    {
      id: 12,
      type: 'snack',
      name: 'Greek yogurt with honey',
      calories: 220,
    }
  ]
};

const DietPlanner = ({ calorieGoal, dietType, restrictions }: DietPlannerProps) => {
  const [mealPlan, setMealPlan] = useState(defaultMealPlan);
  const [nutritionInsights, setNutritionInsights] = useState<string[]>([
    'Based on your activity pattern, consuming your largest meal 2-3 hours before your workout can optimize energy availability.',
    'Consider adding more fatty fish, eggs, and leafy greens to address potential vitamin and mineral gaps.',
    'For your training intensity, aim for 3-3.5 liters of water daily. Increase intake by 500ml on training days.'
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Capitalize diet type and restrictions for display
  const formattedDietType = dietType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const formattedRestrictions = restrictions === 'none' 
    ? 'None' 
    : restrictions
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  
  // Calculate approximate macros based on diet type
  const macros = {
    protein: { value: 0, percentage: 0 },
    carbs: { value: 0, percentage: 0 },
    fats: { value: 0, percentage: 0 }
  };
  
  switch (dietType) {
    case 'balanced':
      macros.protein.percentage = 30;
      macros.carbs.percentage = 40;
      macros.fats.percentage = 30;
      break;
    case 'high-protein':
      macros.protein.percentage = 40;
      macros.carbs.percentage = 30;
      macros.fats.percentage = 30;
      break;
    case 'keto':
      macros.protein.percentage = 20;
      macros.carbs.percentage = 10;
      macros.fats.percentage = 70;
      break;
    case 'low-carb':
      macros.protein.percentage = 35;
      macros.carbs.percentage = 25;
      macros.fats.percentage = 40;
      break;
    case 'mediterranean':
      macros.protein.percentage = 25;
      macros.carbs.percentage = 45;
      macros.fats.percentage = 30;
      break;
  }
  
  // Calculate macro values in grams
  // Protein: 4 calories per gram
  // Carbs: 4 calories per gram
  // Fats: 9 calories per gram
  macros.protein.value = Math.round((calorieGoal * (macros.protein.percentage / 100)) / 4);
  macros.carbs.value = Math.round((calorieGoal * (macros.carbs.percentage / 100)) / 4);
  macros.fats.value = Math.round((calorieGoal * (macros.fats.percentage / 100)) / 9);

  // Parse AI-generated diet plan
  const parseDietPlan = (dietPlanText: string) => {
    try {
      // Try to extract meal plans
      let parsedMeals: {[key: string]: Meal[]} = {
        monday: [],
        tuesday: [],
        wednesday: []
      };
      
      // Look for meal sections like "Monday:" or "Day 1:"
      const dayMatches = dietPlanText.match(/(?:Monday|Day 1|Day One):([\s\S]*?)(?=Tuesday|Day 2|Day Two|$)/i);
      
      if (dayMatches && dayMatches[1]) {
        const mondayText = dayMatches[1];
        
        // Try to extract meal items
        const breakfastMatch = mondayText.match(/breakfast:?([\s\S]*?)(?=lunch|dinner|snack|$)/i);
        const lunchMatch = mondayText.match(/lunch:?([\s\S]*?)(?=breakfast|dinner|snack|$)/i);
        const dinnerMatch = mondayText.match(/dinner:?([\s\S]*?)(?=breakfast|lunch|snack|$)/i);
        const snackMatch = mondayText.match(/snack:?([\s\S]*?)(?=breakfast|lunch|dinner|$)/i);
        
        // Calculate approximate calories
        let mealId = 1;
        
        if (breakfastMatch && breakfastMatch[1]) {
          const breakfast = breakfastMatch[1].trim();
          // Extract the first food item that looks like a meal
          const foodItem = breakfast.split('\n')[0].replace(/^[-*•]/, '').trim();
          
          if (foodItem) {
            parsedMeals.monday.push({
              id: mealId++,
              type: 'breakfast',
              name: foodItem,
              calories: Math.round(calorieGoal * 0.25) // Approx 25% of daily calories
            });
          }
        }
        
        if (lunchMatch && lunchMatch[1]) {
          const lunch = lunchMatch[1].trim();
          const foodItem = lunch.split('\n')[0].replace(/^[-*•]/, '').trim();
          
          if (foodItem) {
            parsedMeals.monday.push({
              id: mealId++,
              type: 'lunch',
              name: foodItem,
              calories: Math.round(calorieGoal * 0.35) // Approx 35% of daily calories
            });
          }
        }
        
        if (dinnerMatch && dinnerMatch[1]) {
          const dinner = dinnerMatch[1].trim();
          const foodItem = dinner.split('\n')[0].replace(/^[-*•]/, '').trim();
          
          if (foodItem) {
            parsedMeals.monday.push({
              id: mealId++,
              type: 'dinner',
              name: foodItem,
              calories: Math.round(calorieGoal * 0.3) // Approx 30% of daily calories
            });
          }
        }
        
        if (snackMatch && snackMatch[1]) {
          const snack = snackMatch[1].trim();
          const foodItem = snack.split('\n')[0].replace(/^[-*•]/, '').trim();
          
          if (foodItem) {
            parsedMeals.monday.push({
              id: mealId++,
              type: 'snack',
              name: foodItem,
              calories: Math.round(calorieGoal * 0.1) // Approx 10% of daily calories
            });
          }
        }
      }
      
      // If we successfully parsed Monday meals
      if (parsedMeals.monday.length > 0) {
        setMealPlan({
          ...mealPlan,
          monday: parsedMeals.monday
        });
      }
      
      // Extract nutrition insights
      const insightsMatches = dietPlanText.match(/(?:Tips|Notes|Recommendations|Insights):([\s\S]*?)(?=\n\n|$)/i);
      
      if (insightsMatches && insightsMatches[1]) {
        const insightsText = insightsMatches[1].trim();
        const insights = insightsText
          .split(/\n/)
          .map(line => line.replace(/^[-*•]/, '').trim())
          .filter(line => line.length > 15); // Only include substantial insights
        
        if (insights.length > 0) {
          setNutritionInsights(insights);
        }
      }
      
    } catch (error) {
      console.error('Error parsing diet plan:', error);
      toast({
        title: 'Error parsing diet plan',
        description: 'The AI generated content could not be properly parsed. Using default meal plan.',
        variant: 'destructive',
      });
    }
  };
  
  const generateMealPlan = async () => {
    setIsLoading(true);
    try {
      const dietPlan = await generateDietPlan({
        calorieGoal,
        dietType,
        restrictions,
        goal: 'optimal nutrition',
        mealsPerDay: 4 // breakfast, lunch, dinner, snack
      });
      
      parseDietPlan(dietPlan);
      
      toast({
        title: 'Meal plan generated',
        description: 'Your personalized AI meal plan has been created.',
      });
    } catch (error) {
      console.error('Error generating diet plan:', error);
      toast({
        title: 'Failed to generate meal plan',
        description: 'Could not connect to AI service. Using default meal plan.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate meal plan on initial load
  useEffect(() => {
    generateMealPlan();
  }, [calorieGoal, dietType, restrictions]);

  return (
    <div>
      <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Your AI-Generated Meal Plan</h2>
            <p className="text-slate-400 text-sm mt-1">
              {formattedDietType} diet • {formattedRestrictions} restrictions • {calorieGoal} calories
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="outline" 
              className="border-dark-500 hover:bg-dark-500"
              onClick={generateMealPlan}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
            <Button variant="outline" className="border-dark-500 hover:bg-dark-500">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-dark-500 hover:bg-dark-500">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        
        {/* Macro Breakdown */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Macro Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-700 p-4 rounded-lg border border-dark-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Protein</span>
                <span className="text-sm font-medium">{macros.protein.value}g • {macros.protein.percentage}%</span>
              </div>
              <Progress 
                value={macros.protein.percentage} 
                className="bg-dark-500 h-2" 
                indicatorClassName="bg-primary-600" 
              />
            </div>
            
            <div className="bg-dark-700 p-4 rounded-lg border border-dark-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Carbohydrates</span>
                <span className="text-sm font-medium">{macros.carbs.value}g • {macros.carbs.percentage}%</span>
              </div>
              <Progress 
                value={macros.carbs.percentage} 
                className="bg-dark-500 h-2" 
                indicatorClassName="bg-warning" 
              />
            </div>
            
            <div className="bg-dark-700 p-4 rounded-lg border border-dark-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Fats</span>
                <span className="text-sm font-medium">{macros.fats.value}g • {macros.fats.percentage}%</span>
              </div>
              <Progress 
                value={macros.fats.percentage} 
                className="bg-dark-500 h-2" 
                indicatorClassName="bg-success" 
              />
            </div>
          </div>
        </div>
        
        {/* Weekly Plan Tabs */}
        <Tabs defaultValue="monday" className="w-full">
          <TabsList className="bg-dark-700 border border-dark-500 mb-4 grid grid-cols-7">
            <TabsTrigger value="monday" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
              Mon
            </TabsTrigger>
            <TabsTrigger value="tuesday" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
              Tue
            </TabsTrigger>
            <TabsTrigger value="wednesday" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
              Wed
            </TabsTrigger>
            <TabsTrigger value="thursday" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
              Thu
            </TabsTrigger>
            <TabsTrigger value="friday" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
              Fri
            </TabsTrigger>
            <TabsTrigger value="saturday" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
              Sat
            </TabsTrigger>
            <TabsTrigger value="sunday" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
              Sun
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="monday">
            <Card className="bg-dark-700 border border-dark-500">
              <div className="flex justify-between items-center p-4 border-b border-dark-500">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-primary-500" />
                  <h3 className="text-lg font-medium">Monday</h3>
                </div>
                <div className="text-sm text-slate-300">
                  Total: {mealPlan.monday.reduce((sum, meal) => sum + meal.calories, 0)} kcal
                </div>
              </div>
              <div className="divide-y divide-dark-500">
                {mealPlan.monday.map(meal => (
                  <MealCard 
                    key={meal.id}
                    type={meal.type}
                    name={meal.name}
                    calories={meal.calories}
                  />
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tuesday">
            <Card className="bg-dark-700 border border-dark-500">
              <div className="flex justify-between items-center p-4 border-b border-dark-500">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-primary-500" />
                  <h3 className="text-lg font-medium">Tuesday</h3>
                </div>
                <div className="text-sm text-slate-300">
                  Total: {mealPlan.tuesday.reduce((sum, meal) => sum + meal.calories, 0)} kcal
                </div>
              </div>
              <div className="divide-y divide-dark-500">
                {mealPlan.tuesday.map(meal => (
                  <MealCard 
                    key={meal.id}
                    type={meal.type}
                    name={meal.name}
                    calories={meal.calories}
                  />
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="wednesday">
            <Card className="bg-dark-700 border border-dark-500">
              <div className="flex justify-between items-center p-4 border-b border-dark-500">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-primary-500" />
                  <h3 className="text-lg font-medium">Wednesday</h3>
                </div>
                <div className="text-sm text-slate-300">
                  Total: {mealPlan.wednesday.reduce((sum, meal) => sum + meal.calories, 0)} kcal
                </div>
              </div>
              <div className="divide-y divide-dark-500">
                {mealPlan.wednesday.map(meal => (
                  <MealCard 
                    key={meal.id}
                    type={meal.type}
                    name={meal.name}
                    calories={meal.calories}
                  />
                ))}
              </div>
            </Card>
          </TabsContent>
          
          {/* Placeholder tabs for the rest of the week */}
          {['thursday', 'friday', 'saturday', 'sunday'].map(day => (
            <TabsContent key={day} value={day}>
              <div className="flex flex-col items-center justify-center py-10 bg-dark-700 rounded-lg border border-dark-500">
                <CalendarDays className="h-12 w-12 text-slate-500 mb-4" />
                <h3 className="text-lg font-medium text-slate-400 mb-2">
                  {day.charAt(0).toUpperCase() + day.slice(1)}'s Meal Plan
                </h3>
                <p className="text-sm text-slate-500">
                  Click "Generate Meal Plan" to create meals for this day
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          <Button className="bg-dark-500 hover:bg-dark-400 text-white py-2 rounded-lg font-medium transition">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Generate Shopping List
          </Button>
          
          <Button className="bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition">
            Save Meal Plan
          </Button>
        </div>
      </Card>
      
      <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">AI Nutrition Insights</h2>
            <p className="text-slate-400 text-sm mt-1">Personalized nutrition tips based on your goals</p>
          </div>
          <div className="bg-primary-600/20 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-4">
          {nutritionInsights.map((insight, index) => (
            <div key={index} className="bg-dark-700 p-4 rounded-lg border border-dark-500">
              <h3 className="font-medium text-primary-400 mb-2">
                {index === 0 ? 'Meal Timing Optimization' : 
                 index === 1 ? 'Nutrient Deficiency Prevention' : 
                 'Hydration Strategy'}
              </h3>
              <p className="text-sm text-slate-300">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DietPlanner;
