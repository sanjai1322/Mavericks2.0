import { motion } from "framer-motion";
import { Clock, Play, Book, Database, Cloud, Smartphone, CodeIcon } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Resource {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'Recommended' | 'In Progress' | 'Advanced' | 'Popular' | 'New' | 'Trending';
  progress?: number;
  icon: any;
}

const resources: Resource[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript including variables, functions, and object-oriented programming.",
    duration: "4 hours",
    status: "Recommended",
    icon: Play
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    description: "Deep dive into essential data structures and algorithmic thinking for competitive programming.",
    duration: "8 hours",
    status: "In Progress",
    progress: 65,
    icon: Book
  },
  {
    id: "3",
    title: "System Design Principles",
    description: "Learn how to design scalable systems and understand architecture patterns used in industry.",
    duration: "12 hours",
    status: "Advanced",
    icon: CodeIcon
  },
  {
    id: "4",
    title: "Database Design & SQL",
    description: "Master relational databases, SQL queries, and learn about NoSQL alternatives for modern applications.",
    duration: "6 hours",
    status: "Popular",
    icon: Database
  },
  {
    id: "5",
    title: "Cloud Computing Basics",
    description: "Introduction to cloud platforms, deployment strategies, and modern DevOps practices.",
    duration: "5 hours",
    status: "New",
    icon: Cloud
  },
  {
    id: "6",
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native and modern development tools.",
    duration: "10 hours",
    status: "Trending",
    icon: Smartphone
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Recommended': return 'bg-green-100 text-green-800';
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    case 'Advanced': return 'bg-purple-100 text-purple-800';
    case 'Popular': return 'bg-orange-100 text-orange-800';
    case 'New': return 'bg-green-100 text-green-800';
    case 'Trending': return 'bg-pink-100 text-pink-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LearningPath() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Your Learning Path</h1>
          <p className="text-gray-300">Personalized resources to help you master coding skills efficiently.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <Badge className={getStatusColor(resource.status)}>
                      {resource.status}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3">{resource.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <Button 
                      variant={resource.status === 'In Progress' ? 'secondary' : 'primary'} 
                      size="sm"
                    >
                      {resource.status === 'In Progress' ? 'Continue' : 
                       resource.status === 'Recommended' ? 'Start Learning' : 
                       'View Details'}
                    </Button>
                  </div>
                  
                  {resource.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{resource.progress}%</span>
                      </div>
                      <Progress value={resource.progress} className="h-2" />
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
