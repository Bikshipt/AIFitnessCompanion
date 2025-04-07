import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { InfoIcon } from 'lucide-react';

const GoalsCard = () => {
  return (
    <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500">
      <h2 className="text-xl font-semibold mb-6">Your Goals</h2>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">Weekly Workouts</span>
            <span className="text-slate-300">4/5</span>
          </div>
          <Progress value={80} className="bg-dark-500 h-2.5" indicatorClassName="bg-primary-600" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">Protein Intake</span>
            <span className="text-slate-300">150/180g</span>
          </div>
          <Progress value={83} className="bg-dark-500 h-2.5" indicatorClassName="bg-warning" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">Weight Goal</span>
            <span className="text-slate-300">72/68kg</span>
          </div>
          <Progress value={50} className="bg-dark-500 h-2.5" indicatorClassName="bg-success" />
        </div>
        
        <div className="bg-primary-600/10 rounded-lg p-4 mt-6 border border-primary-600/20">
          <h3 className="font-medium text-primary-400 flex items-center">
            <InfoIcon className="h-5 w-5 mr-2" />
            AI Insight
          </h3>
          <p className="text-sm text-slate-300 mt-2">
            You're 4 days away from your longest workout streak. Keep going to unlock the "Iron Will" badge!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GoalsCard;
