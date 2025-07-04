import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Cog, 
  Rocket, 
  Users, 
  ArrowRight, 
  Zap,
  Target,
  BarChart3,
  Shield,
  Lightbulb
} from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: "AI Strategy Development",
    description: "Comprehensive AI roadmaps tailored to your business objectives, ensuring maximum ROI and competitive advantage.",
    features: ["Strategic Planning", "Market Analysis", "ROI Optimization", "Risk Assessment"],
    color: "from-accent-cyan to-primary",
    delay: 0.2,
  },
  {
    icon: Cog,
    title: "Implementation Support",
    description: "End-to-end AI implementation with expert guidance, ensuring seamless integration with existing systems.",
    features: ["System Integration", "Technical Support", "Quality Assurance", "Performance Monitoring"],
    color: "from-accent-purple to-accent-cyan",
    delay: 0.4,
  },
  {
    icon: Rocket,
    title: "Custom AI Solutions",
    description: "Bespoke AI applications designed specifically for your unique business challenges and requirements.",
    features: ["Custom Development", "Machine Learning", "Automation", "Predictive Analytics"],
    color: "from-accent-green to-accent-purple",
    delay: 0.6,
  },
  {
    icon: Users,
    title: "Training & Development",
    description: "Comprehensive training programs to empower your team with AI knowledge and best practices.",
    features: ["Team Training", "Workshops", "Certification", "Ongoing Support"],
    color: "from-accent-orange to-accent-green",
    delay: 0.8,
  },
];

const benefits = [
  { icon: Target, title: "Strategic Focus", description: "Targeted solutions for maximum impact" },
  { icon: Zap, title: "Rapid Implementation", description: "Quick deployment with minimal disruption" },
  { icon: BarChart3, title: "Measurable Results", description: "Quantifiable ROI and performance metrics" },
  { icon: Shield, title: "Risk Mitigation", description: "Comprehensive risk assessment and management" },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-secondary rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-primary/20 mb-6"
          >
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Our Expertise</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6"
          >
            Comprehensive{' '}
            <span className="text-gradient-primary">AI Solutions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            From strategy to implementation, we provide end-to-end AI consulting services 
            that transform your business and drive measurable results.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.delay }}
              className="group"
            >
              <Card className="h-full glass hover:glass-strong transition-all duration-500 border-primary/10 hover:border-primary/30 group-hover:scale-105 overflow-hidden">
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:animate-bounce-subtle`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-space-grotesk font-bold mb-4 group-hover:text-gradient-primary transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="group/btn w-full animated-border"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-8 border border-primary/20"
        >
          <h3 className="text-2xl font-space-grotesk font-bold text-center mb-8">
            Why Choose <span className="text-gradient-primary">Hanu Consulting</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}