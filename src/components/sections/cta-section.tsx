import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Brain, 
  Calendar, 
  Users, 
  Sparkles,
  CheckCircle
} from 'lucide-react';

export function CtaSection() {
  const benefits = [
    "Free AI readiness assessment",
    "Custom strategy development", 
    "Expert consultant matching",
    "Guaranteed results or refund"
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-primary rounded-full opacity-10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-secondary rounded-full opacity-10 blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass-strong border-primary/30 shadow-glow overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <Badge variant="outline" className="glass px-6 py-2 text-primary border-primary/50">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ready to Transform Your Business?
                </Badge>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl md:text-5xl font-space-grotesk font-bold mb-6"
              >
                <span className="text-gradient-primary">Start Your Journey</span>
                <br />
                <span className="text-foreground">Today</span>
              </motion.h2>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto"
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 shadow-glow px-8 py-4 text-lg group"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="animated-border px-8 py-4 text-lg group"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}