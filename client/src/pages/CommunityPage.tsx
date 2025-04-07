import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Trophy, 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  Heart, 
  ThumbsUp, 
  Share2 
} from 'lucide-react';
import { Challenge } from '@/lib/types';
import { formatDate } from '@/lib/utils';

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample challenges data
  const challenges: Challenge[] = [
    {
      id: 1,
      name: 'Summer Shred Challenge',
      description: 'Complete 20 workouts in 30 days and earn the Summer Warrior badge',
      difficulty: 'intermediate',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      goal: 'Complete 20 workouts',
      reward: 'Summer Warrior Badge',
      participantCount: 483,
      isFeatured: true,
    },
    {
      id: 2,
      name: '1000 lb Club Challenge',
      description: 'Reach a combined 1000 lb total for squat, bench press, and deadlift',
      difficulty: 'advanced',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 60)),
      goal: '1000 lb combined total',
      reward: 'Strength Master Badge',
      participantCount: 189,
      isFeatured: false,
    },
    {
      id: 3,
      name: '30-Day Yoga Journey',
      description: 'Complete a yoga session every day for 30 days to improve flexibility and mindfulness',
      difficulty: 'beginner',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      goal: '30 days of yoga practice',
      reward: 'Zen Master Badge',
      participantCount: 342,
      isFeatured: true,
    },
    {
      id: 4,
      name: 'Marathon Training Challenge',
      description: 'Follow a 12-week progressive running program to prepare for a marathon',
      difficulty: 'advanced',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 84)),
      goal: 'Complete all training runs',
      reward: 'Marathon Ready Badge',
      participantCount: 127,
      isFeatured: false,
    },
  ];
  
  // Sample community posts
  const communityPosts = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        level: 'Advanced',
      },
      content: 'Just crushed my leg day workout! New PR on squats - 225 lbs for 5 reps. Hard work is paying off! 💪 #LegDay #NewPR',
      image: null,
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: {
        name: 'Mike Peterson',
        avatar: 'MP',
        level: 'Intermediate',
      },
      content: 'The AI suggested a great modification for my shoulder issues - switching to cable flyes instead of bench press has been a game changer! No more pain and still getting gains. Thanks FitBot!',
      image: null,
      timestamp: new Date(new Date().setHours(new Date().getHours() - 5)),
      likes: 17,
      comments: 4,
    },
    {
      id: 3,
      author: {
        name: 'Jessica Williams',
        avatar: 'JW',
        level: 'Beginner',
      },
      content: 'Today marks my 30th day using AI Fit Revolution! Down 8 pounds and feeling stronger than ever. The nutrition plans have completely changed my relationship with food. For anyone just starting - stick with it!',
      image: null,
      timestamp: new Date(new Date().setHours(new Date().getHours() - 8)),
      likes: 43,
      comments: 12,
    },
  ];
  
  // Format timestamp for posts
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };
  
  const handleJoinChallenge = (challengeId: number) => {
    console.log(`Join challenge: ${challengeId}`);
  };
  
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
          <p className="text-slate-300 mt-1">Connect with fitness enthusiasts, join challenges, and share your progress</p>
        </div>
      </div>
      
      <Tabs defaultValue="feed" className="w-full mb-8">
        <TabsList className="bg-dark-600 border border-dark-500 mb-6 grid grid-cols-3 max-w-[400px]">
          <TabsTrigger value="feed" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="challenges" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <Trophy className="h-4 w-4 mr-2" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <Users className="h-4 w-4 mr-2" />
            Members
          </TabsTrigger>
        </TabsList>
        
        {/* Community Feed Tab */}
        <TabsContent value="feed">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post Card */}
              <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <span className="font-semibold">JS</span>
                  </div>
                  <Input 
                    placeholder="Share your fitness journey..." 
                    className="bg-dark-700 border-dark-500"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" className="border-dark-500 hover:bg-dark-500 text-slate-300">
                    <Clock className="h-4 w-4 mr-2" />
                    Check In
                  </Button>
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    Post Update
                  </Button>
                </div>
              </Card>
              
              {/* Feed Posts */}
              {communityPosts.map(post => (
                <Card key={post.id} className="bg-dark-600 rounded-xl p-6 border border-dark-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold">{post.author.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{post.author.name}</h3>
                          <p className="text-xs text-slate-400">Fitness Level: {post.author.level}</p>
                        </div>
                        <span className="text-xs text-slate-400">{formatTimestamp(post.timestamp)}</span>
                      </div>
                      <p className="mt-3 text-slate-200">{post.content}</p>
                      
                      {/* Post actions */}
                      <div className="flex mt-4 pt-4 border-t border-dark-500">
                        <Button variant="ghost" className="flex items-center text-slate-300 hover:text-primary-500 hover:bg-dark-500 mr-2">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span className="text-xs">{post.likes}</span>
                        </Button>
                        <Button variant="ghost" className="flex items-center text-slate-300 hover:text-primary-500 hover:bg-dark-500 mr-2">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-xs">{post.comments}</span>
                        </Button>
                        <Button variant="ghost" className="flex items-center text-slate-300 hover:text-primary-500 hover:bg-dark-500">
                          <Share2 className="h-4 w-4 mr-1" />
                          <span className="text-xs">Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Featured Challenges */}
              <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500">
                <div className="flex items-center mb-4">
                  <Trophy className="h-5 w-5 mr-2 text-warning" />
                  <h2 className="text-xl font-semibold">Featured Challenges</h2>
                </div>
                
                <div className="space-y-4">
                  {challenges
                    .filter(challenge => challenge.isFeatured)
                    .map(challenge => (
                      <div 
                        key={challenge.id} 
                        className="bg-dark-700 rounded-lg p-4 border border-warning/20"
                      >
                        <h3 className="font-semibold text-warning">{challenge.name}</h3>
                        <p className="text-sm text-slate-300 mt-1">{challenge.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-slate-400">{challenge.participantCount} participants</span>
                          <Button 
                            onClick={() => handleJoinChallenge(challenge.id)}
                            className="bg-warning text-dark-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-warning/90"
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                  
                  <Button variant="link" className="text-primary-500 hover:text-primary-400 text-sm w-full">
                    View all challenges
                  </Button>
                </div>
              </Card>
              
              {/* Trending Topics */}
              <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500">
                <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
                <div className="space-y-3">
                  <div className="bg-dark-700 p-3 rounded-lg hover:bg-dark-500 cursor-pointer transition">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-500 mr-2"></div>
                      <span className="font-medium">#SummerShred</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">482 posts this week</p>
                  </div>
                  
                  <div className="bg-dark-700 p-3 rounded-lg hover:bg-dark-500 cursor-pointer transition">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-500 mr-2"></div>
                      <span className="font-medium">#MealPrep</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">347 posts this week</p>
                  </div>
                  
                  <div className="bg-dark-700 p-3 rounded-lg hover:bg-dark-500 cursor-pointer transition">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-500 mr-2"></div>
                      <span className="font-medium">#TransformationTuesday</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">289 posts this week</p>
                  </div>
                  
                  <div className="bg-dark-700 p-3 rounded-lg hover:bg-dark-500 cursor-pointer transition">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary-500 mr-2"></div>
                      <span className="font-medium">#AIFitTips</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">211 posts this week</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Challenges Tab */}
        <TabsContent value="challenges">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input 
                placeholder="Search challenges..." 
                className="bg-dark-600 border-dark-500 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <Card key={challenge.id} className="bg-dark-600 rounded-xl overflow-hidden border border-dark-500">
                <div className={`h-2 w-full ${challenge.isFeatured ? 'bg-warning' : 'bg-primary-600'}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{challenge.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      challenge.difficulty === 'beginner' 
                        ? 'bg-success/20 text-success' 
                        : challenge.difficulty === 'intermediate'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-primary-600/20 text-primary-500'
                    }`}>
                      {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 text-sm mt-2">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-dark-700 p-3 rounded-lg">
                      <p className="text-xs text-slate-400">Start Date</p>
                      <p className="text-sm font-medium">{formatDate(challenge.startDate)}</p>
                    </div>
                    <div className="bg-dark-700 p-3 rounded-lg">
                      <p className="text-xs text-slate-400">End Date</p>
                      <p className="text-sm font-medium">{formatDate(challenge.endDate)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-dark-500">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-slate-500 border-2 border-dark-600"></div>
                          <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-dark-600"></div>
                          <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-dark-600"></div>
                        </div>
                        <span className="text-xs text-slate-400 ml-2">+{challenge.participantCount}</span>
                      </div>
                      <Button 
                        onClick={() => handleJoinChallenge(challenge.id)}
                        className={`font-medium px-4 py-1 rounded-lg transition ${
                          challenge.isFeatured 
                            ? 'bg-warning text-dark-800 hover:bg-warning/90' 
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Members Tab */}
        <TabsContent value="members">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input 
                placeholder="Search members..." 
                className="bg-dark-600 border-dark-500 pl-10"
              />
            </div>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would be populated from API but showing sample UI for now */}
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="bg-dark-600 rounded-xl p-6 border border-dark-500 hover:border-primary-600/40 transition cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${
                    ['bg-primary-500', 'bg-success', 'bg-warning', 'bg-slate-500'][i % 4]
                  } flex items-center justify-center`}>
                    <span className="font-semibold text-white">{
                      ['MP', 'SJ', 'RK', 'AL', 'BT', 'CW', 'DH', 'EF', 'GM'][i]
                    }</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{
                      ['Michael Peters', 'Sarah Johnson', 'Robert King', 'Alicia Lee', 
                       'Brandon Taylor', 'Christina Wong', 'David Harris', 'Emma Foster', 'George Miller'][i]
                    }</h3>
                    <p className="text-xs text-slate-400">Fitness Level: {
                      ['Beginner', 'Intermediate', 'Advanced'][i % 3]
                    }</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="bg-dark-700 p-2 rounded-lg text-center">
                    <p className="text-xs text-slate-400">Workouts</p>
                    <p className="text-sm font-medium">{47 + i * 13}</p>
                  </div>
                  <div className="bg-dark-700 p-2 rounded-lg text-center">
                    <p className="text-xs text-slate-400">Streak</p>
                    <p className="text-sm font-medium">{7 + i * 3} days</p>
                  </div>
                  <div className="bg-dark-700 p-2 rounded-lg text-center">
                    <p className="text-xs text-slate-400">Badges</p>
                    <p className="text-sm font-medium">{4 + i}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex">
                  <Button 
                    variant="outline"
                    className="w-full border-dark-500 hover:bg-dark-500 text-slate-300 hover:text-primary-500"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPage;
