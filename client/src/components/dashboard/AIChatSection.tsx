import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PieChart, Send } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AIChatSectionProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const AIChatSection = ({ messages, onSendMessage }: AIChatSectionProps) => {
  const [inputMessage, setInputMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <Card className="bg-dark-600 rounded-xl p-6 border border-dark-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">AI Fitness Coach</h2>
          <p className="text-slate-400 text-sm">Ask FitBot anything about your fitness journey</p>
        </div>
        <div className="bg-primary-600/20 p-2 rounded-lg">
          <PieChart className="h-6 w-6 text-primary-500" />
        </div>
      </div>
      
      <div className="bg-dark-700 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex items-start",
                msg.sender === 'user' ? "justify-end" : ""
              )}
            >
              {msg.sender === 'ai' && (
                <div className="bg-primary-600 h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-xs font-bold">AI</span>
                </div>
              )}
              
              <div 
                className={cn(
                  "rounded-lg p-3 text-sm",
                  msg.sender === 'ai' ? "bg-dark-600" : "bg-dark-500"
                )}
              >
                <p className="whitespace-pre-line">{msg.message}</p>
              </div>
              
              {msg.sender === 'user' && (
                <div className="bg-slate-500 h-8 w-8 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <span className="text-xs font-bold">JS</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex">
        <Input
          type="text"
          placeholder="Ask FitBot a question..."
          className="bg-dark-700 border border-dark-500 rounded-l-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button 
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 rounded-r-lg transition"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </Card>
  );
};

export default AIChatSection;
