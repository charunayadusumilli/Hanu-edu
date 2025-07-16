import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Brain, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import heroBackground from '@/assets/hanu-hero-bg.jpg';

export function HeroSection() {
  const { user } = useAuth();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
        <img 
          src={heroBackground} 
          alt="Luxury Consulting Office" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        {/* Sophisticated overlay pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Minimal Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="inline-block px-6 py-2 text-sm font-medium tracking-widest uppercase text-primary/80 border border-primary/20 backdrop-blur-xl">
              Strategic Excellence
            </span>
          </motion.div>

          {/* Montfort-Style Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-space-grotesk font-light mb-20 leading-[0.8]"
          >
            <span className="block text-foreground tracking-[0.15em] mb-4">
              H&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;U
            </span>
            <span className="block text-primary/90 font-extralight tracking-[0.2em]">
              C&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;U&nbsp;&nbsp;&nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;G
            </span>
          </motion.h1>

          {/* Minimal Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground/60 mb-20 max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            i s &nbsp;&nbsp;&nbsp; a &nbsp;&nbsp;&nbsp; g l o b a l &nbsp;&nbsp;&nbsp; c o n s u l t i n g &nbsp;&nbsp;&nbsp; f i r m
          </motion.p>

          {/* Email Capture */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/50 focus:outline-none focus:border-primary/40 backdrop-blur-xl transition-all duration-300 font-light tracking-wider"
              />
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-base font-light tracking-wider transition-all duration-300 rounded-none"
              >
                Begin
              </Button>
            </div>
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-white/60 hover:text-white/80 px-8 py-4 text-base font-light tracking-wider transition-all duration-300"
              asChild
            >
              <Link to="/solutions">
                Explore Solutions
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Atmospheric Elements */}
      <div className="absolute top-1/4 left-[10%] w-32 h-32 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-[15%] w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-[60%] left-[20%] w-24 h-24 bg-primary/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Sophisticated Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}