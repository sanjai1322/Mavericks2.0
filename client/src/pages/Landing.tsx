import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Brain, Code, Trophy } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FloatingCodeSnippets from "@/components/FloatingCodeSnippets";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Skill Analysis",
    description: "Get personalized insights into your coding strengths and areas for improvement with our advanced AI assessment system."
  },
  {
    icon: Code,
    title: "Code Challenges",
    description: "Solve hundreds of coding problems ranging from beginner to expert level, with real-time feedback and detailed explanations."
  },
  {
    icon: Trophy,
    title: "Hackathons",
    description: "Participate in exciting hackathons, collaborate with other developers, and showcase your skills to win amazing prizes."
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        <FloatingCodeSnippets />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Mavericks{" "}
              <span className="text-accent">Coding</span>
              <br />
              Platform
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Learn. Compete. Grow.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              Master coding skills through AI-powered assessments, engaging challenges, and competitive hackathons. 
              Join thousands of developers on their journey to excellence.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                  Login
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Platform Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Discover powerful tools designed to accelerate your coding journey and help you reach new heights.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <Card key={index} delay={index * 0.1}>
                  <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
