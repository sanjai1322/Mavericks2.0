import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Assessments from "@/pages/Assessments";
import LearningPath from "@/pages/LearningPath";
import Hackathons from "@/pages/Hackathons";
import Leaderboard from "@/pages/Leaderboard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        user={user} 
        onLogin={() => setUser({ name: "John Doe", level: 5 })}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        showSidebarToggle={isLoggedIn}
      />
      
      {isLoggedIn && (
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
        />
      )}
      
      <main className={`${isLoggedIn ? 'lg:ml-64' : ''} pt-16`}>
        {children}
      </main>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/assessments" component={Assessments} />
        <Route path="/learning" component={LearningPath} />
        <Route path="/hackathons" component={Hackathons} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
