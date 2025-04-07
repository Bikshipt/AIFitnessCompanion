import { useLocation, Link } from 'wouter';
import { Menu, Home, PlusCircle, ClipboardList, Users, HelpCircle } from 'lucide-react';

interface MobileNavProps {
  isBottom?: boolean;
}

const MobileNav = ({ isBottom = false }: MobileNavProps) => {
  const [location] = useLocation();
  
  // Only show the top nav if not bottom nav
  if (!isBottom) {
    return (
      <nav className="md:hidden bg-dark-600 p-4 flex items-center justify-between border-b border-dark-500">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-600 p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm1 2a1 1 0 10-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V5z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-lg font-bold">AI Fit Revolution</h1>
        </div>
        <button className="p-2 rounded-lg bg-dark-500">
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    );
  }
  
  // Bottom navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-6 w-6" /> },
    { path: '/workouts', label: 'Workouts', icon: <PlusCircle className="h-6 w-6" /> },
    { path: '/diet', label: 'Diet', icon: <ClipboardList className="h-6 w-6" /> },
    { path: '/community', label: 'Community', icon: <Users className="h-6 w-6" /> },
    { path: '/support', label: 'Support', icon: <HelpCircle className="h-6 w-6" /> },
  ];
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-600 border-t border-dark-500 p-2 z-10">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className={`flex flex-col items-center p-2 ${
              location === item.path ? 'text-primary-500' : 'text-slate-400'
            }`}>
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
