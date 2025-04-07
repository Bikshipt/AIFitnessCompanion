import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-dark-700 text-slate-50 font-sans">
      {/* Sidebar - Desktop only */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Nav - Mobile Only */}
        <MobileNav />
        
        {/* Content */}
        {children}
      </main>
      
      {/* Mobile bottom navigation - Only visible on mobile */}
      <div className="md:hidden">
        <div className="h-16"></div> {/* Spacer to prevent content being hidden behind the nav */}
        <MobileNav isBottom />
      </div>
    </div>
  );
};

export default AppLayout;
