import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ChevronRight } from 'lucide-react';
import ExerciseCard from '@/components/workout/ExerciseCard';

interface WorkoutSectionProps {
  className?: string;
}

// Sample workout data
const todayExercises = [
  {
    id: 1,
    name: 'Bench Press',
    sets: 4,
    reps: 10,
    weight: '60-70% 1RM',
  },
  {
    id: 2,
    name: 'Incline Dumbbell Press',
    sets: 3,
    reps: 12,
    weight: '45-55% 1RM',
  },
  {
    id: 3,
    name: 'Cable Flyes',
    sets: 3,
    reps: 15,
    weight: 'Moderate resistance',
  },
  {
    id: 4,
    name: 'Tricep Pushdowns',
    sets: 4,
    reps: 12,
    weight: 'Moderate resistance',
  },
];

const WorkoutSection = ({ className }: WorkoutSectionProps) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Today's Workout</h2>
        <Button variant="link" className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center">
          <span>View All</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {todayExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            name={exercise.name}
            sets={exercise.sets}
            reps={exercise.reps}
            weight={exercise.weight}
          />
        ))}
        
        <div className="col-span-1 md:col-span-2 mt-2">
          <Button 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSection;
