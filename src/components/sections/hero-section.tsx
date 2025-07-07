import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Brain, Target } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="AI Consulting Background" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge variant="outline" className="glass px-6 py-2 text-primary border-primary/30">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Business Transformation
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-bold mb-6"
          >
            <span className="text-gradient-primary">Hanu Consulting</span>
            <br />
            <span className="text-foreground">Expert Solutions</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with top-tier business consultants and unlock your company's potential through 
            <span className="text-primary font-semibold"> AI-driven strategies</span>, 
            digital transformation, and expert guidance.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 shadow-glow px-8 py-4 text-lg"
            >
              <Target className="w-5 h-5 mr-2" />
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="animated-border px-8 py-4 text-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Brain, title: "AI-Powered", desc: "Intelligent insights and automation" },
              { icon: Zap, title: "Fast Results", desc: "Rapid implementation and delivery" },
              { icon: Target, title: "Expert Guidance", desc: "Top-tier consulting professionals" }
            ].map((feature, index) => (
              <div key={index} className="glass rounded-xl p-6 hover:shadow-glow transition-all duration-300">
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-secondary rounded-full opacity-10 blur-2xl animate-float-delayed" />
    </section>
  );
}