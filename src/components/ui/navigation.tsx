import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, User, Users, Sparkles, ChevronDown } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  {
    id: 'clients',
    label: 'Hanu Clients',
    icon: Users,
    sections: [
      'Overview',
      'Submit Challenge',
      'Solutions & Cases',
      'Meet Experts',
      'Project Tracker',
      'Knowledge Base',
      'Contact'
    ]
  },
  {
    id: 'talent',
    label: 'Hanu Talent',
    icon: User,
    sections: [
      'Join as Consultant',
      'Onboarding',
      'Internship Programs',
      'Profile Builder',
      'Collaboration Tools',
      'Opportunities',
      'Resources'
    ]
  }
];

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('clients');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "glass-strong shadow-lg" 
          : "bg-transparent",
        className
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-space-grotesk font-bold text-gradient-primary">
                Hanu Consulting
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Solutions</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Button
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "relative group px-6 py-3 transition-all duration-300",
                    activeTab === item.id 
                      ? "bg-gradient-primary text-white shadow-glow" 
                      : "hover:bg-surface-elevated"
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                  <ChevronDown className="w-4 h-4 ml-2 transition-transform group-hover:rotate-180" />
                </Button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {hoveredTab === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-xl border border-primary/20 shadow-lg overflow-hidden"
                    >
                      {item.sections.map((section, index) => (
                        <motion.a
                          key={section}
                          href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="block px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/10 last:border-b-0"
                        >
                          {section}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="animated-border">
              Sign In
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-6 glass-strong rounded-xl border border-primary/20 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <Button
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                    {activeTab === item.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pl-6 space-y-1"
                      >
                        {item.sections.map((section) => (
                          <a
                            key={section}
                            href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {section}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-border space-y-2">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-primary">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}