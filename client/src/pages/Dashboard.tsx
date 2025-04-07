import { useEffect, useState } from 'react';
import { getDefaultUser } from '@/lib/utils';
import { UserStats, NutritionMacros, ChatMessage, Challenge } from '@/lib/types';
import StatsCard from '@/components/dashboard/StatsCard';
import ProgressChart from '@/components/dashboard/ProgressChart';
import GoalsCard from '@/components/dashboard/GoalsCard';
import WorkoutSection from '@/components/dashboard/WorkoutSection';
import DietSection from '@/components/dashboard/DietSection';
import AIChatSection from '@/components/dashboard/AIChatSection';
import CommunitySection from '@/components/dashboard/CommunitySection';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const user = getDefaultUser();
  const [stats, setStats] = useState<UserStats>({
    todayWorkout: {
      name: 'Upper Body',
      scheduledTime: '6:00 PM',
    },
    calories: {
      current: 2380,
      target: 2500,
    },
    progress: {
      percentage: 72,
      change: 4,
    },
    streak: {
      days: 16,
      toRecord: 4,
    },
  });
  
  const [macros, setMacros] = useState<NutritionMacros>({
    protein: {
      current: 150,
      target: 180,
    },
    carbs: {
      current: 220,
      target: 250,
    },
    fat: {
      current: 55,
      target: 70,
    },
  });
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'ai',
      message: 'Good afternoon! Based on your workout today, I recommend focusing on protein intake. How can I help you with your fitness goals?',
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: 'user',
      message: 'What exercises can I do if my shoulder feels a bit sore?',
      timestamp: new Date(),
    },
    {
      id: 3,
      sender: 'ai',
      message: 'For shoulder soreness, try these modifications: \n1. Switch from bench press to floor press \n2. Use cables instead of free weights \n3. Reduce weight by 20% \nWould you like a complete shoulder-friendly alternative workout?',
      timestamp: new Date(),
    },
  ]);
  
  const [challenges, setChallenges] = useState<Challenge[]>([
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
  ]);
  
  const handleNewWorkout = () => {
    // In a real app, this would navigate to the workout generator
    console.log('Create new workout');
  };
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      message,
      timestamp: new Date(),
    };
    
    setChatMessages([...chatMessages, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: chatMessages.length + 2,
        sender: 'ai',
        message: `I understand you're asking about "${message}". This would be answered by the AI in a real implementation.`,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const handleJoinChallenge = (challengeId: number) => {
    // In a real app, this would call the API to join the challenge
    console.log(`Join challenge: ${challengeId}`);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user.firstName}!</h1>
          <p className="text-slate-300 mt-1">Let's crush your fitness goals today</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={handleNewWorkout}
            className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            New Workout
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Today's Workout"
          value={stats.todayWorkout?.name || "None scheduled"}
          subtitle={stats.todayWorkout?.scheduledTime ? `Scheduled for ${stats.todayWorkout.scheduledTime}` : "No workout scheduled"}
          status="success"
          icon="workout"
        />
        
        <StatsCard
          title="Today's Calories"
          value={`${stats.calories.current} / ${stats.calories.target}`}
          subtitle="On track"
          status="success"
          icon="calories"
        />
        
        <StatsCard
          title="Progress"
          value={`${stats.progress.percentage}%`}
          subtitle={`+${stats.progress.change}% from last week`}
          status="success"
          icon="progress"
        />
        
        <StatsCard
          title="Workout Streak"
          value={`${stats.streak.days} days`}
          subtitle={`${stats.streak.toRecord} days to new record!`}
          status="warning"
          icon="streak"
        />
      </div>

      {/* Progress Charts & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ProgressChart className="lg:col-span-2" />
        <GoalsCard />
      </div>

      {/* Today's Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <WorkoutSection className="lg:col-span-2" />
        <DietSection macros={macros} />
      </div>
      
      {/* AI Fitness Coach & Community */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AIChatSection 
          messages={chatMessages} 
          onSendMessage={handleSendMessage} 
        />
        <CommunitySection 
          challenges={challenges} 
          onJoinChallenge={handleJoinChallenge} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
