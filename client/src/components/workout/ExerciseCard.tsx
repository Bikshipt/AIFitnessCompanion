import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: number;
  weight: string;
}

const ExerciseCard = ({ name, sets, reps, weight }: ExerciseCardProps) => {
  return (
    <Card className="bg-dark-600 rounded-xl overflow-hidden border border-dark-500">
      <div className="flex h-full">
        <div className="w-1/3 bg-dark-700 exercise-animation flex items-center justify-center">
          <div className="text-center">
            <Play className="h-12 w-12 mx-auto text-primary-500 opacity-60" />
          </div>
        </div>
        <div className="w-2/3 p-4">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex flex-col mt-2 text-sm text-slate-300">
            <span>{sets} sets x {reps} reps</span>
            <span>{weight}</span>
            <span className="text-primary-500 mt-2 font-medium">View Form Guide</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;
