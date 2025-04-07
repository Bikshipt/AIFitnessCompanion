import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { NutritionMacros } from '@/lib/types';
import MealCard from '@/components/diet/MealCard';

interface DietSectionProps {
  macros: NutritionMacros;
}

// Sample meal data
const todayMeals = [
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
  },
];

const DietSection = ({ macros }: DietSectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Today's Meals</h2>
        <Button variant="link" className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center">
          <span>View All</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <Card className="bg-dark-600 rounded-xl border border-dark-500 overflow-hidden">
        {/* Macro Breakdown */}
        <div className="p-4 border-b border-dark-500">
          <h3 className="font-medium mb-3">Macro Breakdown</h3>
          <div className="flex space-x-2">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>Protein</span>
                <span>{macros.protein.current}g / {macros.protein.target}g</span>
              </div>
              <Progress 
                value={(macros.protein.current / macros.protein.target) * 100} 
                className="bg-dark-500 h-1.5" 
                indicatorClassName="bg-primary-600" 
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>Carbs</span>
                <span>{macros.carbs.current}g / {macros.carbs.target}g</span>
              </div>
              <Progress 
                value={(macros.carbs.current / macros.carbs.target) * 100} 
                className="bg-dark-500 h-1.5" 
                indicatorClassName="bg-warning" 
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>Fats</span>
                <span>{macros.fat.current}g / {macros.fat.target}g</span>
              </div>
              <Progress 
                value={(macros.fat.current / macros.fat.target) * 100} 
                className="bg-dark-500 h-1.5" 
                indicatorClassName="bg-success" 
              />
            </div>
          </div>
        </div>
        
        {/* Meals */}
        <div className="divide-y divide-dark-500">
          {todayMeals.map((meal) => (
            <MealCard
              key={meal.id}
              type={meal.type}
              name={meal.name}
              calories={meal.calories}
            />
          ))}
        </div>
        
        <div className="p-4 border-t border-dark-500">
          <Button className="w-full bg-dark-500 hover:bg-dark-400 text-white py-2 rounded-lg font-medium transition">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Generate Shopping List
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DietSection;
