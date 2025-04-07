import { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { getDefaultUser } from '@/lib/utils';
import { 
  User, 
  Settings, 
  Bell, 
  Lock, 
  Shield, 
  WatchIcon, 
  Smartphone, 
  Save,
  Globe,
  Moon,
  Sun,
  RefreshCw
} from 'lucide-react';

const SettingsPage = () => {
  const user = getDefaultUser();
  
  // Account settings state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [fitnessLevel, setFitnessLevel] = useState(user.fitnessLevel.toLowerCase());
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [goal, setGoal] = useState(user.goal);
  
  // Preference settings state
  const [darkMode, setDarkMode] = useState(true);
  const [measurementUnit, setMeasurementUnit] = useState('metric');
  const [restTimerEnabled, setRestTimerEnabled] = useState(true);
  
  // Notification settings state
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);
  const [challengeNotifications, setChallengeNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  
  // Device integration settings state
  const [connectedDevices, setConnectedDevices] = useState([
    { id: 1, name: 'Fitbit Charge 5', type: 'activity_tracker', status: 'connected', lastSync: '2 hours ago' }
  ]);
  
  const handleSaveProfile = () => {
    // This would save the profile to the backend in a real implementation
    console.log('Save profile');
  };
  
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-slate-300 mt-1">Manage your account and preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="account" className="w-full mb-8">
        <TabsList className="bg-dark-600 border border-dark-500 mb-6 grid grid-cols-4 max-w-[600px]">
          <TabsTrigger value="account" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white">
            <WatchIcon className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        {/* Account Settings Tab */}
        <TabsContent value="account">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-dark-600 border-dark-500 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-500" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your account details and personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-dark-700 border-dark-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-dark-700 border-dark-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-dark-700 border-dark-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value))}
                      className="bg-dark-700 border-dark-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(parseInt(e.target.value))}
                      className="bg-dark-700 border-dark-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fitnessLevel">Fitness Level</Label>
                    <Select 
                      value={fitnessLevel}
                      onValueChange={setFitnessLevel}
                    >
                      <SelectTrigger id="fitnessLevel" className="bg-dark-700 border-dark-500">
                        <SelectValue placeholder="Select fitness level" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-600 border-dark-500">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal">Primary Goal</Label>
                    <Select 
                      value={goal}
                      onValueChange={setGoal}
                    >
                      <SelectTrigger id="goal" className="bg-dark-700 border-dark-500">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-600 border-dark-500">
                        <SelectItem value="general_fitness">General Fitness</SelectItem>
                        <SelectItem value="weight_loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="endurance">Endurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  className="bg-primary-600 hover:bg-primary-700"
                  onClick={handleSaveProfile}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="bg-dark-600 border-dark-500">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-primary-500" />
                    Password
                  </CardTitle>
                  <CardDescription>
                    Update your password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      className="bg-dark-700 border-dark-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      className="bg-dark-700 border-dark-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      className="bg-dark-700 border-dark-500"
                    />
                  </div>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-600 border-dark-500">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary-500" />
                    Privacy
                  </CardTitle>
                  <CardDescription>
                    Manage your privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Profile Visibility</Label>
                      <p className="text-sm text-slate-400">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Share Workout Activity</Label>
                      <p className="text-sm text-slate-400">
                        Let the community see your workouts
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Data Collection</Label>
                      <p className="text-sm text-slate-400">
                        Allow AI to learn from your workout patterns
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-dark-600 border-dark-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary-500" />
                  App Preferences
                </CardTitle>
                <CardDescription>
                  Customize how the app works for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-slate-400">
                      Switch between light and dark theme
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-slate-400" />
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                    />
                    <Moon className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="measurementUnit">Measurement Units</Label>
                  <div>
                    <Select 
                      value={measurementUnit}
                      onValueChange={setMeasurementUnit}
                    >
                      <SelectTrigger id="measurementUnit" className="bg-dark-700 border-dark-500">
                        <SelectValue placeholder="Select measurement units" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-600 border-dark-500">
                        <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (lb, ft/in)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Rest Timer</Label>
                    <p className="text-sm text-slate-400">
                      Enable automatic rest timer between sets
                    </p>
                  </div>
                  <Switch 
                    checked={restTimerEnabled} 
                    onCheckedChange={setRestTimerEnabled} 
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">Default Rest Time</Label>
                    <span className="text-sm text-slate-300">60 seconds</span>
                  </div>
                  <Slider
                    defaultValue={[60]}
                    max={180}
                    min={15}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <div className="flex items-center space-x-4">
                    <Globe className="h-5 w-5 text-slate-400" />
                    <Select defaultValue="en">
                      <SelectTrigger id="language" className="bg-dark-700 border-dark-500">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-600 border-dark-500">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-600 border-dark-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-primary-500" />
                  Workout Preferences
                </CardTitle>
                <CardDescription>
                  Customize your workout experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workoutDuration">Default Workout Duration</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="workoutDuration" className="bg-dark-700 border-dark-500">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-600 border-dark-500">
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workoutDays">Preferred Workout Days</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div 
                        key={i} 
                        className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer border ${
                          [0, 1, 3, 4].includes(i) 
                            ? 'bg-primary-600 border-primary-700 text-white' 
                            : 'bg-dark-700 border-dark-500 text-slate-300 hover:bg-dark-600'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="equipmentAccess">Equipment Access</Label>
                  <Select defaultValue="full_gym">
                    <SelectTrigger id="equipmentAccess" className="bg-dark-700 border-dark-500">
                      <SelectValue placeholder="Select equipment access" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-600 border-dark-500">
                      <SelectItem value="full_gym">Full Gym</SelectItem>
                      <SelectItem value="home_basic">Home (Basic Equipment)</SelectItem>
                      <SelectItem value="home_advanced">Home (Advanced Equipment)</SelectItem>
                      <SelectItem value="bodyweight">Bodyweight Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Exercise Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="limitedMobility" className="text-sm text-slate-300">
                        I have limited mobility
                      </Label>
                      <Switch id="limitedMobility" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="jointIssues" className="text-sm text-slate-300">
                        I have joint issues
                      </Label>
                      <Switch id="jointIssues" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preferHIIT" className="text-sm text-slate-300">
                        I prefer HIIT workouts
                      </Label>
                      <Switch id="preferHIIT" />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-dark-600 border-dark-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary-500" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-base">App Notifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Workout Reminders</Label>
                          <p className="text-sm text-slate-400">
                            Receive reminders for scheduled workouts
                          </p>
                        </div>
                        <Switch 
                          checked={workoutReminders} 
                          onCheckedChange={setWorkoutReminders} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Meal Reminders</Label>
                          <p className="text-sm text-slate-400">
                            Get notifications for meal times and nutrition
                          </p>
                        </div>
                        <Switch 
                          checked={mealReminders} 
                          onCheckedChange={setMealReminders} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Progress Updates</Label>
                          <p className="text-sm text-slate-400">
                            Weekly reports on your fitness progress
                          </p>
                        </div>
                        <Switch 
                          checked={progressUpdates} 
                          onCheckedChange={setProgressUpdates} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Challenge Updates</Label>
                          <p className="text-sm text-slate-400">
                            Notifications about challenges and events
                          </p>
                        </div>
                        <Switch 
                          checked={challengeNotifications} 
                          onCheckedChange={setChallengeNotifications} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-dark-500 pt-6">
                  <h3 className="font-medium text-base mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Updates</Label>
                        <p className="text-sm text-slate-400">
                          Receive occasional emails about your progress and new features
                        </p>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-dark-500 pt-6">
                  <h3 className="font-medium text-base mb-4">Quiet Hours</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Set a time period when you won't receive notifications
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="quietHoursStart">Start Time</Label>
                      <Select defaultValue="22:00">
                        <SelectTrigger id="quietHoursStart" className="bg-dark-700 border-dark-500">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-600 border-dark-500">
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quietHoursEnd">End Time</Label>
                      <Select defaultValue="07:00">
                        <SelectTrigger id="quietHoursEnd" className="bg-dark-700 border-dark-500">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-600 border-dark-500">
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-primary-600 hover:bg-primary-700">
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-dark-600 border-dark-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <WatchIcon className="h-5 w-5 mr-2 text-primary-500" />
                  Connected Devices
                </CardTitle>
                <CardDescription>
                  Manage fitness trackers and other connected devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {connectedDevices.map((device) => (
                  <div key={device.id} className="bg-dark-700 p-4 rounded-lg border border-dark-500">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-dark-600 rounded-full mr-4 flex items-center justify-center">
                          <WatchIcon className="h-5 w-5 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{device.name}</h3>
                          <p className="text-xs text-slate-400">
                            Last synced: {device.lastSync}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-dark-500 hover:bg-dark-600">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 border-dashed flex items-center justify-center cursor-pointer hover:bg-dark-600/50 transition">
                  <div className="text-center py-6">
                    <WatchIcon className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <h3 className="font-medium text-slate-300">Connect a Device</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Add a fitness tracker, smart scale, or other device
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-600 border-dark-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-primary-500" />
                  App Integrations
                </CardTitle>
                <CardDescription>
                  Connect with other fitness and health apps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-600 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Strava</h3>
                        <p className="text-xs text-slate-400">
                          Connect to import running and cycling activities
                        </p>
                      </div>
                    </div>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-green-600 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">MF</span>
                      </div>
                      <div>
                        <h3 className="font-medium">MyFitnessPal</h3>
                        <p className="text-xs text-slate-400">
                          Sync nutrition data and calorie information
                        </p>
                      </div>
                    </div>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-purple-600 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">SP</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Sleep Cycle</h3>
                        <p className="text-xs text-slate-400">
                          Import sleep data to optimize recovery
                        </p>
                      </div>
                    </div>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="bg-dark-700 p-4 rounded-lg border border-dark-500 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-red-600 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">G</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Google Fit</h3>
                        <p className="text-xs text-slate-400">
                          Sync activity data across platforms
                        </p>
                      </div>
                    </div>
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
