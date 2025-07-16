import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Brain, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import heroBackground from '@/assets/montfort-hero-bg.jpg';

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
        <div className="text-center max-w-6xl mx-auto">
          {/* Sophisticated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <Badge variant="outline" className="glass-strong px-8 py-3 text-primary border-primary/20 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 mr-3" />
              Strategic Business Excellence
            </Badge>
          </motion.div>

          {/* Cinematic Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-space-grotesk font-bold mb-8 leading-[0.9]"
          >
            <span className="text-gradient-primary tracking-tight">HANU</span>
            <br />
            <span className="text-foreground/90 font-light tracking-wide">CONSULTING</span>
          </motion.h1>

          {/* Sophisticated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground/80 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Elevating enterprises through strategic excellence and innovative solutions.
            <br className="hidden md:block" />
            <span className="text-primary/90 font-medium">Where vision meets execution.</span>
          </motion.p>

          {/* Elegant Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:scale-105 shadow-glow-strong px-10 py-5 text-lg font-medium tracking-wide transition-all duration-300"
              asChild
            >
              <Link to={user ? "/dashboard" : "/auth"}>
                <Target className="w-5 h-5 mr-3" />
                {user ? "Enter Portal" : "Begin Journey"}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-strong border-primary/20 hover:border-primary/40 px-10 py-5 text-lg backdrop-blur-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/solutions">
                <Brain className="w-5 h-5 mr-3" />
                Explore Solutions
              </Link>
            </Button>
          </motion.div>

          {/* Sophisticated Feature Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { icon: Brain, title: "Strategic Innovation", desc: "Cutting-edge methodologies and frameworks" },
              { icon: Zap, title: "Accelerated Growth", desc: "Rapid transformation and measurable results" },
              { icon: Target, title: "Executive Excellence", desc: "World-class leadership and expertise" }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + (index * 0.2) }}
                className="glass-strong rounded-2xl p-8 hover:shadow-glow-strong transition-all duration-500 hover:scale-105 group"
              >
                <feature.icon className="w-10 h-10 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-xl mb-4 tracking-wide">{feature.title}</h3>
                <p className="text-muted-foreground/80 text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
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