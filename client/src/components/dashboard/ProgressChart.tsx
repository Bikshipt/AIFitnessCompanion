import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProgressChartProps {
  className?: string;
}

const ProgressChart = ({ className }: ProgressChartProps) => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <Card className={cn("bg-dark-600 rounded-xl p-6 border border-dark-500", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Progress</h2>
        <div className="flex space-x-2">
          <Button 
            variant={period === 'week' ? 'default' : 'outline'}
            size="sm"
            className={period === 'week' ? 'bg-primary-600 text-white' : 'bg-dark-500 text-slate-300'}
            onClick={() => setPeriod('week')}
          >
            Week
          </Button>
          <Button 
            variant={period === 'month' ? 'default' : 'outline'}
            size="sm"
            className={period === 'month' ? 'bg-primary-600 text-white' : 'bg-dark-500 text-slate-300'}
            onClick={() => setPeriod('month')}
          >
            Month
          </Button>
          <Button 
            variant={period === 'year' ? 'default' : 'outline'}
            size="sm"
            className={period === 'year' ? 'bg-primary-600 text-white' : 'bg-dark-500 text-slate-300'}
            onClick={() => setPeriod('year')}
          >
            Year
          </Button>
        </div>
      </div>
      <div className="h-64 relative">
        {/* SVG Chart with gradient */}
        <svg className="w-full h-full" viewBox="0 0 600 240">
          {/* Grid lines */}
          <line x1="0" y1="200" x2="600" y2="200" stroke="#374151" strokeWidth="1" />
          <line x1="0" y1="150" x2="600" y2="150" stroke="#374151" strokeWidth="1" />
          <line x1="0" y1="100" x2="600" y2="100" stroke="#374151" strokeWidth="1" />
          <line x1="0" y1="50" x2="600" y2="50" stroke="#374151" strokeWidth="1" />
          
          {/* Weight Line */}
          <path className="chart-line" stroke="#10B981" d="M50,180 L130,160 L210,150 L290,140 L370,135 L450,125 L530,110" strokeWidth="3" strokeLinecap="round" fill="none" />
          <defs>
            <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#weightGradient)" d="M50,180 L130,160 L210,150 L290,140 L370,135 L450,125 L530,110 V200 H50 Z" />
          
          {/* Strength Line */}
          <path className="chart-line" stroke="#6666ff" d="M50,170 L130,150 L210,145 L290,125 L370,95 L450,85 L530,70" strokeWidth="3" strokeLinecap="round" fill="none" />
          <defs>
            <linearGradient id="strengthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6666ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6666ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path fill="url(#strengthGradient)" d="M50,170 L130,150 L210,145 L290,125 L370,95 L450,85 L530,70 V200 H50 Z" />
          
          {/* X-axis labels */}
          <text x="50" y="220" fill="#94A3B8" fontSize="12" textAnchor="middle">1 May</text>
          <text x="130" y="220" fill="#94A3B8" fontSize="12" textAnchor="middle">8 May</text>
          <text x="210" y="220" fill="#94A3B8" fontSize="12" textAnchor="middle">15 May</text>
          <text x="290" y="220" fill="#94A3B8" fontSize="12" textAnchor="middle">22 May</text>
          <text x="370" y="220" fill="#94A3B8" fontSize="12" textAnchor="middle">29 May</text>
          <text x="450" y="220" fill="#94A3B8" fontSize="12" textAnchor="middle">5 Jun</text>
          <text x="530" y="220" fill="#94A3B8" fontSize="12" textAnchor="middle">12 Jun</text>
        </svg>
        
        {/* Chart legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary-600 mr-2"></div>
            <span className="text-sm text-slate-300">Strength</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
            <span className="text-sm text-slate-300">Weight</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressChart;
