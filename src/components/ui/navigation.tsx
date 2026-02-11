import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, User, Users, Sparkles, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { id: 'courses', label: 'Explore Courses', href: '/academy/catalog' },
  { id: 'community', label: 'Join Community', href: '/enroll' },
];

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6",
        className
      )}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo matching Hanu UI */}
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Hanu Edu" className="h-11 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-slate-100">
                    <User className="h-5 w-5 text-slate-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-bold leading-none">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-xs leading-none text-slate-400">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Student Panel
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold uppercase tracking-widest text-slate-900 hover:text-primary transition-colors">
                  Log In
                </Link>
                <Button className="bg-primary hover:bg-primary-dark text-white font-bold h-10 px-6 rounded-full shadow-lg shadow-primary/20 transition-all text-sm" asChild>
                  <Link to="/enroll">Enroll Now</Link>
                </Button>
              </>
            )}
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
              className="lg:hidden mt-4 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors border-b border-slate-50 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-4">
                  {user ? (
                    <div className="space-y-4">
                      <div className="text-sm">
                        <p className="font-bold text-slate-900">{user.user_metadata?.full_name || user.email}</p>
                        <p className="text-slate-400">{user.email}</p>
                      </div>
                      <Button variant="outline" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }} className="w-full h-12 rounded-xl">
                        Student Panel
                      </Button>
                      <Button variant="ghost" onClick={handleSignOut} className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200" asChild onClick={() => setIsMenuOpen(false)}>
                        <Link to="/login">Log In</Link>
                      </Button>
                      <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20" asChild onClick={() => setIsMenuOpen(false)}>
                        <Link to="/enroll">Enroll Now</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}