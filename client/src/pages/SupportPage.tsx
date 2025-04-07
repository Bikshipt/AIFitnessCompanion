import { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/lib/types';
import { 
  Search, 
  HelpCircle, 
  MessageSquare,
  Phone,
  Mail,
  BookOpen,
  Video,
  Send
} from 'lucide-react';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'ai',
      message: 'Hello! I\'m FitBot, your AI fitness assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  // Sample FAQs for the page
  const faqs = [
    {
      question: 'How does the AI create personalized workout plans?',
      answer: 'Our AI analyzes your fitness level, goals, available equipment, and any limitations to create tailored workout routines. It considers factors like progressive overload, exercise variety, and recovery time to optimize your results. The AI continuously learns from your feedback and adjusts recommendations accordingly.'
    },
    {
      question: 'Can I sync my fitness wearable with the app?',
      answer: 'Yes, AI Fit Revolution supports integration with popular fitness wearables including Fitbit, Apple Watch, Garmin, and more. Go to Settings > Connected Devices to set up syncing. This allows the AI to incorporate real-time data like heart rate, sleep patterns, and activity levels into your personalized recommendations.'
    },
    {
      question: 'How accurate are the calorie calculations?',
      answer: 'Our calorie calculations are based on industry-standard metabolic formulas that consider your age, gender, weight, height, and activity level. While these provide a solid estimate (typically within 10-15% accuracy), individual metabolism varies. We recommend using the calculated values as a starting point and adjusting based on your results over 2-3 weeks.'
    },
    {
      question: 'What if I have dietary restrictions or allergies?',
      answer: 'The diet planner fully accommodates dietary restrictions and allergies. During setup, you can specify vegetarian, vegan, gluten-free, dairy-free, nut-free, and other requirements. You can also exclude specific ingredients in your profile settings. The AI will only suggest meals and recipes that align with your restrictions.'
    },
    {
      question: 'How often should I update my fitness metrics?',
      answer: 'For optimal results, we recommend updating your weight, measurements, and performance metrics weekly. This allows the AI to track your progress accurately and make necessary adjustments to your plans. You can set automatic reminders in the app for these updates.'
    },
    {
      question: 'Is my personal fitness data secure?',
      answer: 'Yes, we take data security seriously. All your personal information and fitness data is encrypted both in transit and at rest. We never share your data with third parties without your explicit consent. You can review our complete privacy policy in the app under Settings > Privacy.'
    }
  ];
  
  // Sample video tutorials
  const videoTutorials = [
    {
      id: 1,
      title: 'Getting Started with AI Fit Revolution',
      thumbnail: 'tutorial-1',
      duration: '5:32',
      views: '14.5K',
    },
    {
      id: 2,
      title: 'How to Create Your First AI Workout Plan',
      thumbnail: 'tutorial-2',
      duration: '7:18',
      views: '9.8K',
    },
    {
      id: 3,
      title: 'Understanding Your Nutrition Dashboard',
      thumbnail: 'tutorial-3',
      duration: '6:45',
      views: '11.2K',
    },
    {
      id: 4,
      title: 'Tracking Progress and Setting Realistic Goals',
      thumbnail: 'tutorial-4',
      duration: '8:21',
      views: '7.3K',
    }
  ];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      message: inputMessage,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I'd be happy to help with that! To adjust your workout routine for shoulder pain, try using resistance bands instead of weights for upper body exercises, and focus on rotator cuff strengthening exercises.",
        "Based on your current fitness goals, I recommend increasing your protein intake to 1.6-1.8g per kg of bodyweight to support muscle recovery and growth.",
        "For your question about cardio frequency, the optimal approach would be 2-3 HIIT sessions (20-30 minutes) and 1-2 longer steady-state sessions (40-60 minutes) per week for balanced cardiovascular development.",
        "I understand your concern. If you're experiencing persistent knee pain during squats, I recommend checking your form first - ensure your knees don't extend past your toes. You might also benefit from strengthening your VMO muscle and exploring alternative exercises like box squats temporarily.",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: chatMessages.length + 2,
        sender: 'ai',
        message: randomResponse,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Support Center</h1>
          <p className="text-slate-300 mt-1">Get help with your fitness journey</p>
        </div>
        <div className="mt-4 md:mt-0 relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input 
            placeholder="Search help topics..." 
            className="bg-dark-600 border-dark-500 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="chat" className="w-full mb-8">
        <TabsList className="bg-dark-600 border border-dark-500 mb-6 grid grid-cols-3 max-w-[400px]">
          <TabsTrigger value="chat" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat Support
          </TabsTrigger>
          <TabsTrigger value="faq" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Tutorials
          </TabsTrigger>
        </TabsList>
        
        {/* Chat Support Tab */}
        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-dark-600 border-dark-500 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary-500" />
                  AI Fitness Assistant
                </CardTitle>
                <CardDescription>
                  Chat with our AI to get instant answers to your fitness questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-dark-700 rounded-lg p-4 h-[400px] overflow-y-auto mb-4">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex items-start mb-4 ${
                        msg.sender === 'user' ? 'justify-end' : ''
                      }`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="bg-primary-600 h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-xs font-bold">AI</span>
                        </div>
                      )}
                      
                      <div 
                        className={`rounded-lg p-3 text-sm max-w-[80%] ${
                          msg.sender === 'ai' 
                            ? 'bg-dark-600 border border-dark-500' 
                            : 'bg-primary-600/20 border border-primary-600/30'
                        }`}
                      >
                        <p>{msg.message}</p>
                      </div>
                      
                      {msg.sender === 'user' && (
                        <div className="bg-slate-500 h-8 w-8 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                          <span className="text-xs font-bold">JS</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSendMessage} className="flex w-full">
                  <Input
                    placeholder="Type your question here..."
                    className="bg-dark-700 border-dark-500 rounded-r-none"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 rounded-l-none"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
            
            <Card className="bg-dark-600 border-dark-500">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get in touch with our human support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-dark-700 p-4 rounded-lg flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Email Support</h3>
                    <p className="text-sm text-slate-300">
                      Get a response within 24 hours
                    </p>
                    <Button 
                      variant="link" 
                      className="text-primary-500 p-0 h-auto mt-1"
                    >
                      support@aifitrevolution.com
                    </Button>
                  </div>
                </div>
                
                <div className="bg-dark-700 p-4 rounded-lg flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Phone Support</h3>
                    <p className="text-sm text-slate-300">
                      Available Mon-Fri, 9am-5pm ET
                    </p>
                    <Button 
                      variant="link" 
                      className="text-primary-500 p-0 h-auto mt-1"
                    >
                      +1 (888) 555-1234
                    </Button>
                  </div>
                </div>
                
                <div className="border-t border-dark-500 pt-6">
                  <h3 className="font-medium mb-3">Submit a Request</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Subject</label>
                      <Input className="bg-dark-700 border-dark-500" placeholder="Briefly describe your issue" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-1 block">Description</label>
                      <Textarea 
                        className="bg-dark-700 border-dark-500 min-h-[100px]" 
                        placeholder="Please provide details about your issue"
                      />
                    </div>
                    <Button className="w-full bg-primary-600 hover:bg-primary-700">
                      Submit Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* FAQs Tab */}
        <TabsContent value="faq">
          <Card className="bg-dark-600 border-dark-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary-500" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find answers to common questions about AI Fit Revolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium hover:text-primary-500">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-dark-500 pt-6">
              <p className="text-sm text-slate-400">
                Can't find what you're looking for? 
                <Button variant="link" className="text-primary-500 p-0 h-auto">
                  Contact Support
                </Button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Tutorials Tab */}
        <TabsContent value="tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="bg-dark-600 border-dark-500 overflow-hidden">
                <div className="relative aspect-video bg-dark-800 flex items-center justify-center group cursor-pointer">
                  {/* Video thumbnail background - would be an image in a real implementation */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-dark-600 to-primary-900/20 opacity-70`}></div>
                  
                  {/* Play button */}
                  <div className="relative z-10 bg-primary-600/90 rounded-full p-4 group-hover:bg-primary-500 transition-colors">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {tutorial.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{tutorial.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{tutorial.views} views</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-dark-600 border-dark-500 mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Interactive Guides</CardTitle>
              <CardDescription>
                Step-by-step instructions for common tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 hover:border-primary-600/40 transition cursor-pointer">
                  <h3 className="font-medium mb-2">Setting Up Your Profile</h3>
                  <p className="text-sm text-slate-400 mb-4">Learn how to complete your profile for personalized recommendations</p>
                  <Button variant="outline" className="w-full border-dark-500 hover:bg-dark-600">
                    View Guide
                  </Button>
                </div>
                
                <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 hover:border-primary-600/40 transition cursor-pointer">
                  <h3 className="font-medium mb-2">Tracking Your Progress</h3>
                  <p className="text-sm text-slate-400 mb-4">How to record measurements and view your fitness journey</p>
                  <Button variant="outline" className="w-full border-dark-500 hover:bg-dark-600">
                    View Guide
                  </Button>
                </div>
                
                <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 hover:border-primary-600/40 transition cursor-pointer">
                  <h3 className="font-medium mb-2">Advanced AI Features</h3>
                  <p className="text-sm text-slate-400 mb-4">Explore the AI-powered features to maximize your results</p>
                  <Button variant="outline" className="w-full border-dark-500 hover:bg-dark-600">
                    View Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportPage;
