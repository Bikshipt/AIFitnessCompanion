import { ShoppingBag } from 'lucide-react';

interface MealCardProps {
  type: string;
  name: string;
  calories: number;
}

const MealCard = ({ type, name, calories }: MealCardProps) => {
  // Determine the icon color based on meal type
  const getIconColorClass = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'bg-primary-500/20 text-primary-500';
      case 'lunch':
        return 'bg-success/20 text-success';
      case 'dinner':
        return 'bg-warning/20 text-warning';
      case 'snack':
        return 'bg-primary-500/20 text-primary-500';
      default:
        return 'bg-primary-500/20 text-primary-500';
    }
  };

  // Capitalize the meal type
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="p-4 flex items-center">
      <div className={`h-10 w-10 rounded-full ${getIconColorClass(type)} flex items-center justify-center mr-3`}>
        <ShoppingBag className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{formattedType}</h4>
        <p className="text-sm text-slate-300">{name}</p>
      </div>
      <span className="text-sm font-medium text-slate-400">{calories} kcal</span>
    </div>
  );
};

export default MealCard;
