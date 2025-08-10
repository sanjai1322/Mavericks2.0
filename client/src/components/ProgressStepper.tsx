import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressStepperProps {
  steps: Step[];
}

export default function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-accent text-accent-foreground'
                  : step.status === 'current'
                  ? 'bg-gray-600 border-2 border-accent text-accent'
                  : 'bg-gray-600 text-gray-400'
              }`}
            >
              {step.status === 'completed' ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-sm font-bold">{index + 1}</span>
              )}
            </motion.div>
            <span className={`text-sm font-medium ${
              step.status === 'upcoming' ? 'text-gray-400' : 'text-white'
            }`}>
              {step.label}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`w-12 h-1 mx-4 rounded-full ${
              steps[index + 1].status !== 'upcoming' ? 'bg-accent' : 'bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
