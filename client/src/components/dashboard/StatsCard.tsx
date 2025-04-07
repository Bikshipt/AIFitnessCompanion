import { 
  Activity, 
  Clock, 
  TrendingUp, 
  Flame,
  LucideIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';

type StatusType = 'success' | 'warning' | 'danger' | 'info';
type IconType = 'workout' | 'calories' | 'progress' | 'streak';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  status: StatusType;
  icon: IconType;
}

const StatsCard = ({ title, value, subtitle, status, icon }: StatsCardProps) => {
  // Map status to color
  const statusColors = {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-red-500',
    info: 'text-blue-500'
  };
  
  // Map icon type to component
  const iconComponents: Record<IconType, JSX.Element> = {
    workout: <Clock className="h-5 w-5 text-primary-500" />,
    calories: <Flame className="h-5 w-5 text-warning" />,
    progress: <TrendingUp className="h-5 w-5 text-primary-500" />,
    streak: <Activity className="h-5 w-5 text-success" />
  };

  return (
    <Card className="bg-dark-600 rounded-xl p-5 border border-dark-500">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <h3 className="text-xl font-semibold mt-1">{value}</h3>
          <div className="mt-1 text-sm flex items-center">
            <span className={statusColors[status]}>{subtitle}</span>
          </div>
        </div>
        <div className="bg-dark-500 p-2 rounded-lg">
          {iconComponents[icon]}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
