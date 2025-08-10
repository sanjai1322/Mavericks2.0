import { Link } from "wouter";
import { Menu, X, Code } from "lucide-react";
import Button from "./Button";

interface NavbarProps {
  user: any;
  onLogin: () => void;
  onSidebarToggle: () => void;
  showSidebarToggle: boolean;
}

export default function Navbar({ user, onLogin, onSidebarToggle, showSidebarToggle }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showSidebarToggle && (
              <button 
                onClick={onSidebarToggle}
                className="lg:hidden text-white hover:text-accent transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">Mavericks</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-white hover:text-accent transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-white hover:text-accent transition-colors">
              About
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">
                    {user.name?.[0] || 'U'}
                  </span>
                </div>
                <span className="hidden sm:block text-sm font-medium">{user.name}</span>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary" size="sm" className="hidden sm:flex">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
