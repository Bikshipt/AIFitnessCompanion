import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { 
  Filter, 
  Utensils, 
  ArrowRight,
  CalendarDays,
  Plus
} from 'lucide-react';
import DietPlanner from '@/components/diet/DietPlanner';

const DietPage = () => {
  const [calorieGoal, setCalorieGoal] = useState('2500');
  const [dietType, setDietType] = useState('balanced');
  const [restrictions, setRestrictions] = useState('none');
  
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Diet Planner</h1>
          <p className="text-slate-300 mt-1">Create personalized meal plans aligned with your fitness goals</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-primary-600 hover:bg-primary-700 text-white flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Custom Meal
          </Button>
        </div>
      </div>
      
      <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Filter className="h-5 w-5 mr-2 text-primary-500" />
            <h2 className="text-xl font-semibold">Diet Preferences</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="calorie-goal">Daily Calorie Goal</Label>
            <Input 
              id="calorie-goal" 
              type="number" 
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              className="bg-dark-700 border-dark-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="diet-type">Diet Type</Label>
            <Select value={dietType} onValueChange={setDietType}>
              <SelectTrigger id="diet-type" className="bg-dark-700 border-dark-500">
                <SelectValue placeholder="Select diet type" />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-500">
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="high-protein">High Protein</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="low-carb">Low Carb</SelectItem>
                <SelectItem value="mediterranean">Mediterranean</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="restrictions">Dietary Restrictions</Label>
            <Select value={restrictions} onValueChange={setRestrictions}>
              <SelectTrigger id="restrictions" className="bg-dark-700 border-dark-500">
                <SelectValue placeholder="Select restrictions" />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-500">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="gluten-free">Gluten Free</SelectItem>
                <SelectItem value="dairy-free">Dairy Free</SelectItem>
                <SelectItem value="nut-free">Nut Free</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center">
            <Utensils className="h-5 w-5 mr-2" />
            Generate Meal Plan
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </Card>
      
      <DietPlanner 
        calorieGoal={parseInt(calorieGoal)}
        dietType={dietType}
        restrictions={restrictions}
      />
    </div>
  );
};

export default DietPage;
