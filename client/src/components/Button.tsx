import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children,
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseClasses = "font-semibold rounded-lg transition-all duration-300 flex items-center justify-center";
  
  const variants = {
    primary: "bg-accent text-accent-foreground hover:bg-accent/90",
    secondary: "bg-transparent text-white border-2 border-secondary hover:border-accent hover:text-accent"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
