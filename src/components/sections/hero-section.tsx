import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import hanuHeroRobotGlobe from '@/assets/hanu-hero-robot-globe.jpg';

export function HeroSection() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log('Email submitted:', email);
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url(${hanuHeroRobotGlobe})`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Atmospheric Elements */}
      <div className="absolute inset-0">
        <div className="energy-particles" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse rotate-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse rotate-reverse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full rotate-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full rotate-reverse" />
      </div>
      
      {/* Globe Transition Element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          id="transition-globe"
          className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm globe-element relative overflow-hidden"
          style={{
            boxShadow: '0 0 100px rgba(59, 130, 246, 0.3), inset 0 0 100px rgba(59, 130, 246, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/15 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/10 rounded-full rotate-slow" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[0.9] mb-4 tracking-[0.05em] float-animation">
            HANU CONSULTING
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light tracking-[0.1em] mb-8">
            AI-Powered Excellence
          </p>
        </motion.div>

        {/* Email Capture Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-form p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}