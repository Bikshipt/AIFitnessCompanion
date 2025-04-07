import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Filter, Dumbbell, ArrowRight } from 'lucide-react';
import WorkoutGenerator from '@/components/workout/WorkoutGenerator';

const WorkoutPage = () => {
  const [fitnessLevel, setFitnessLevel] = useState('intermediate');
  const [goal, setGoal] = useState('strength');
  const [equipment, setEquipment] = useState('gym');
  
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Workout Generator</h1>
          <p className="text-slate-300 mt-1">Create personalized workouts tailored to your goals</p>
        </div>
      </div>
      
      <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Filter className="h-5 w-5 mr-2 text-primary-500" />
            <h2 className="text-xl font-semibold">Workout Preferences</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fitness-level">Fitness Level</Label>
            <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
              <SelectTrigger id="fitness-level" className="bg-dark-700 border-dark-500">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-500">
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger id="goal" className="bg-dark-700 border-dark-500">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-500">
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="endurance">Endurance</SelectItem>
                <SelectItem value="fat-loss">Fat Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="equipment">Equipment</Label>
            <Select value={equipment} onValueChange={setEquipment}>
              <SelectTrigger id="equipment" className="bg-dark-700 border-dark-500">
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-500">
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
                <SelectItem value="bodyweight">Bodyweight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center">
            <Dumbbell className="h-5 w-5 mr-2" />
            Generate Workout
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </Card>
      
      <WorkoutGenerator 
        fitnessLevel={fitnessLevel}
        goal={goal}
        equipment={equipment}
      />
    </div>
  );
};

export default WorkoutPage;
