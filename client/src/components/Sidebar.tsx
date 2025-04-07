import { useLocation, Link } from 'wouter';
import { getDefaultUser } from '@/lib/utils';
import { 
  Home, 
  PlusCircle, 
  ClipboardList, 
  Users, 
  HelpCircle, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const [location] = useLocation();
  const user = getDefaultUser();
  
  // Navigation items
  const navItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      path: '/workouts', 
      label: 'Workout Generator', 
      icon: <PlusCircle className="h-5 w-5" /> 
    },
    { 
      path: '/diet', 
      label: 'Diet Planner', 
      icon: <ClipboardList className="h-5 w-5" /> 
    },
    { 
      path: '/community', 
      label: 'Community', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      path: '/support', 
      label: 'Support', 
      icon: <HelpCircle className="h-5 w-5" /> 
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-dark-600 p-4 border-r border-dark-500">
      <div className="flex items-center space-x-2 mb-10 mt-4">
        <div className="bg-primary-600 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm1 2a1 1 0 10-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V5z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">AI Fit Revolution</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a 
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                location === item.path 
                  ? 'bg-primary-600 text-white' 
                  : 'text-slate-300 hover:bg-dark-500 transition'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto">
        <div className="border-t border-dark-500 my-4 pt-4">
          <Link href="/settings">
            <a className="flex items-center space-x-2 p-3 rounded-lg text-slate-300 hover:bg-dark-500 transition">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-3 p-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="font-semibold">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-slate-400">Fitness Level: {user.fitnessLevel}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
