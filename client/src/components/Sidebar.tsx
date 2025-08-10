import { Link, useLocation } from "wouter";
import { X, Home, ClipboardList, GraduationCap, Trophy, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const menuItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/assessments", icon: ClipboardList, label: "Assessments" },
  { href: "/learning", icon: GraduationCap, label: "Learning Path" },
  { href: "/hackathons", icon: Trophy, label: "Hackathons" },
  { href: "/leaderboard", icon: Crown, label: "Leaderboard" },
];

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => isMobile && onClose()}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/70 text-accent'
                      : 'text-white hover:bg-primary/50'
                  }`}
                >
                  <Icon className="text-accent mr-3 h-5 w-5" />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>
        
        <div className="px-6 py-4 border-t border-primary">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold">
                {user?.name?.[0] || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'John Doe'}</p>
              <p className="text-xs text-gray-300">Level {user?.level || 5}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-secondary z-50 lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold">Menu</span>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-accent transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-secondary border-r border-primary">
      {sidebarContent}
    </aside>
  );
}
