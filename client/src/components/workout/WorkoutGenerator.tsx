import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Calendar, RefreshCw } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import { generateWorkoutPlan } from '@/lib/aiService';
import { useToast } from '@/hooks/use-toast';

interface WorkoutGeneratorProps {
  fitnessLevel: string;
  goal: string;
  equipment: string;
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: string;
}

// Fallback exercises in case AI generation is not available
const fallbackExercises = [
  {
    id: 1,
    name: 'Barbell Squats',
    sets: 4,
    reps: 8,
    weight: '70-80% 1RM',
  },
  {
    id: 2,
    name: 'Romanian Deadlifts',
    sets: 3,
    reps: 10,
    weight: '65-75% 1RM',
  },
  {
    id: 3,
    name: 'Walking Lunges',
    sets: 3,
    reps: 12,
    weight: 'Moderate weight',
  },
  {
    id: 4,
    name: 'Leg Press',
    sets: 3,
    reps: 12,
    weight: 'Heavy weight',
  },
  {
    id: 5,
    name: 'Leg Extensions',
    sets: 3,
    reps: 15,
    weight: 'Moderate weight',
  },
  {
    id: 6,
    name: 'Seated Calf Raises',
    sets: 4,
    reps: 15,
    weight: 'Moderate weight',
  },
];

const WorkoutGenerator = ({ fitnessLevel, goal, equipment }: WorkoutGeneratorProps) => {
  const [workoutName, setWorkoutName] = useState<string>('Personalized Workout Plan');
  const [exercises, setExercises] = useState<Exercise[]>(fallbackExercises);
  const [aiTips, setAiTips] = useState<string>('Loading AI recommendations...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Parse the AI response to extract exercises and tips
  const parseWorkoutPlan = (workoutPlan: string) => {
    try {
      // Find workout name in the first lines
      const nameMatch = workoutPlan.match(/^#+\s*(.*?)(?:\n|$)/m) || 
                        workoutPlan.match(/^(.*?Workout.*?)(?:\n|$)/mi);
      
      if (nameMatch && nameMatch[1]) {
        setWorkoutName(nameMatch[1].trim());
      }

      // Extract exercises using regex
      const exerciseRegex = /[-*]\s*(.*?):\s*(\d+)\s*sets.*?(\d+)(?:-\d+)?\s*reps/gm;
      let match;
      const extractedExercises: Exercise[] = [];
      let index = 0;
      
      // Use exec in a loop instead of matchAll
      while ((match = exerciseRegex.exec(workoutPlan)) !== null) {
        if (match && match.length >= 4) {
          extractedExercises.push({
            id: index + 1,
            name: match[1].trim(),
            sets: parseInt(match[2]),
            reps: parseInt(match[3]),
            weight: match[0].includes('weight') ? match[0].split('weight')[1].trim() : 'As appropriate',
          });
          index++;
        }
      }
      
      if (extractedExercises.length > 0) {
        setExercises(extractedExercises);
      }
      
      // Extract any tips or notes - simplified approach without 's' flag
      let tipsText = '';
      
      // Try to find Tips section
      const tipsHeaderIndex = workoutPlan.indexOf('Tips:');
      if (tipsHeaderIndex !== -1) {
        const tipsStart = tipsHeaderIndex + 'Tips:'.length;
        const nextSectionIndex = workoutPlan.indexOf('\n\n', tipsStart);
        if (nextSectionIndex !== -1) {
          tipsText = workoutPlan.substring(tipsStart, nextSectionIndex).trim();
        } else {
          tipsText = workoutPlan.substring(tipsStart).trim();
        }
      } else {
        // If no specific tips section, use the last paragraph
        const paragraphs = workoutPlan.split('\n\n');
        if (paragraphs.length > 0) {
          tipsText = paragraphs[paragraphs.length - 1].trim();
        }
      }
      
      if (tipsText) {
        setAiTips(tipsText);
      }
    } catch (error) {
      console.error('Error parsing workout plan:', error);
      toast({
        title: 'Error parsing workout plan',
        description: 'The AI generated content could not be properly parsed. Using default workout.',
        variant: 'destructive',
      });
    }
  };
  
  const generateWorkout = async () => {
    setIsLoading(true);
    try {
      const workoutPlan = await generateWorkoutPlan({
        fitnessLevel,
        goal,
        equipment,
        duration: 60, // default 60 minute workout
        frequency: 3, // default 3 days per week
        preferences: `Focus on ${goal}`,
        restrictions: 'None'
      });
      
      parseWorkoutPlan(workoutPlan);
      
      toast({
        title: 'Workout generated',
        description: 'Your personalized AI workout has been created.',
      });
    } catch (error) {
      console.error('Error generating workout plan:', error);
      toast({
        title: 'Failed to generate workout',
        description: 'Could not connect to AI service. Using default workout plan.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate workout on initial load
  useEffect(() => {
    generateWorkout();
  }, [fitnessLevel, goal, equipment]);
  
  return (
    <div>
      <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{workoutName}</h2>
            <p className="text-slate-400 text-sm mt-1">
              Optimized for {fitnessLevel} level with {equipment} equipment
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="outline" 
              className="border-dark-500 hover:bg-dark-500"
              onClick={generateWorkout}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
            <Button variant="outline" className="border-dark-500 hover:bg-dark-500">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Workout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              weight={exercise.weight}
            />
          ))}
        </div>
        
        <div className="mt-6 bg-primary-600/10 rounded-lg p-4 border border-primary-600/20">
          <h3 className="font-medium text-primary-400">AI Customization Tips</h3>
          <p className="text-sm text-slate-300 mt-2">
            {aiTips || `Based on your preferences, this workout focuses on ${goal}. For optimal results, rest 90-120 seconds between sets and ensure proper form.`}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WorkoutGenerator;
