import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import WorkoutPage from "@/pages/WorkoutPage";
import DietPage from "@/pages/DietPage";
import CommunityPage from "@/pages/CommunityPage";
import SupportPage from "@/pages/SupportPage";
import SettingsPage from "@/pages/SettingsPage";
import CharacterPage from "@/pages/CharacterPage";
import QuestsPage from "@/pages/QuestsPage";
import ProgressRPGPage from "@/pages/ProgressRPGPage";
import GuildsPage from "@/pages/GuildsPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/workouts" component={WorkoutPage} />
      <Route path="/diet" component={DietPage} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/character" component={CharacterPage} />
      <Route path="/quests" component={QuestsPage} />
      <Route path="/progress-rpg" component={ProgressRPGPage} />
      <Route path="/guilds" component={GuildsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Router />
      </AppLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
