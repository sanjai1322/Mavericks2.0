import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function Card({ children, className, hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={hover ? { scale: 1.05 } : undefined}
      className={cn(
        "bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-secondary transition-all duration-300",
        hover && "hover:border-accent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
