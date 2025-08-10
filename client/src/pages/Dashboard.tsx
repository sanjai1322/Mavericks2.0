import { motion } from "framer-motion";
import { Play, Book, Trophy, BarChart, User } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import ProgressStepper from "@/components/ProgressStepper";

const steps = [
  { id: "1", label: "Profile", status: "completed" as const },
  { id: "2", label: "Assessment", status: "completed" as const },
  { id: "3", label: "Learning Path", status: "current" as const },
  { id: "4", label: "Hackathon", status: "upcoming" as const },
];

const skills = ["JavaScript", "Python", "React", "Node.js"];

const quickActions = [
  {
    icon: Play,
    title: "Continue Assessment",
    description: "2 challenges remaining",
    variant: "primary" as const
  },
  {
    icon: Book,
    title: "View Learning Path",
    description: "Personalized for you",
    variant: "secondary" as const
  },
  {
    icon: Trophy,
    title: "Join Hackathon",
    description: "3 events available",
    variant: "secondary" as const
  },
  {
    icon: BarChart,
    title: "View Analytics",
    description: "Track your progress",
    variant: "secondary" as const
  }
];

export default function Dashboard() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-gray-300">Continue your coding journey and track your progress.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-300">Full Stack Developer</p>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-accent font-semibold">Level 5</span>
                  <span className="text-gray-400 ml-2">•</span>
                  <span className="text-gray-300 ml-2">2,450 XP</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Progress & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracker */}
            <Card>
              <h3 className="text-xl font-semibold mb-6">Your Journey</h3>
              <ProgressStepper steps={steps} />
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={action.variant}
                        className="text-left p-4 rounded-lg flex items-center space-x-3 w-full h-auto"
                      >
                        <Icon className="h-6 w-6" />
                        <div>
                          <div className="font-medium">{action.title}</div>
                          <div className="text-sm opacity-75">{action.description}</div>
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
