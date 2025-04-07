import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ChevronRight } from 'lucide-react';
import { Challenge } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface CommunitySectionProps {
  challenges: Challenge[];
  onJoinChallenge: (challengeId: number) => void;
}

const CommunitySection = ({ challenges, onJoinChallenge }: CommunitySectionProps) => {
  return (
    <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Community Challenges</h2>
          <p className="text-slate-400 text-sm">Join challenges to earn badges and rewards</p>
        </div>
        <div className="bg-warning/20 p-2 rounded-lg">
          <Play className="h-6 w-6 text-warning" />
        </div>
      </div>
      
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div 
            key={challenge.id} 
            className={`bg-dark-700 rounded-lg p-4 border ${
              challenge.isFeatured ? 'border-warning/20' : 'border-primary-600/20'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 
                className={`font-semibold ${
                  challenge.isFeatured ? 'text-warning' : 'text-primary-500'
                }`}
              >
                {challenge.name}
              </h3>
              {challenge.isFeatured && (
                <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
              {challenge.difficulty === 'advanced' && (
                <span className="text-xs bg-primary-600/20 text-primary-500 px-2 py-1 rounded-full">
                  Advanced
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 mt-1">{challenge.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-slate-500 border-2 border-dark-700"></div>
                  <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-dark-700"></div>
                  <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-dark-700"></div>
                  <div className="h-6 w-6 rounded-full bg-red-500 border-2 border-dark-700"></div>
                </div>
                <span className="text-xs text-slate-400 ml-2">+{challenge.participantCount} participants</span>
              </div>
              <Button 
                onClick={() => onJoinChallenge(challenge.id)}
                className={`text-sm font-medium px-3 py-1 rounded-lg transition ${
                  challenge.isFeatured 
                    ? 'bg-warning text-dark-800 hover:bg-warning/90' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                Join
              </Button>
            </div>
          </div>
        ))}
        
        <div className="mt-4 text-center">
          <Button variant="link" className="text-primary-500 hover:text-primary-400 text-sm inline-flex items-center">
            <span>View all challenges</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CommunitySection;
