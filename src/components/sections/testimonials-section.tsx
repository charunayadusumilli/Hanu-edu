import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Solutions",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    quote: "Hanu Consulting transformed our entire operation with AI automation. We achieved 40% cost reduction and 3x faster processing times within 6 months.",
    metrics: [
      { icon: DollarSign, label: "Cost Reduction", value: "40%" },
      { icon: Clock, label: "Processing Time", value: "3x Faster" },
      { icon: TrendingUp, label: "Efficiency Gain", value: "65%" }
    ],
    industry: "Technology",
    projectType: "Process Automation"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    company: "DataVision Corp",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    quote: "The predictive analytics solution they built for us has revolutionized our decision-making process. Our forecasting accuracy improved by 85%.",
    metrics: [
      { icon: TrendingUp, label: "Accuracy", value: "85%" },
      { icon: Users, label: "Team Productivity", value: "50%" },
      { icon: DollarSign, label: "Revenue Impact", value: "$2.3M" }
    ],
    industry: "Finance",
    projectType: "Predictive Analytics"
  },
  {
    name: "Emily Thompson",
    role: "VP Operations",
    company: "Global Logistics Inc",
    avatar: "/api/placeholder/80/80",
    rating: 5,
    quote: "Hanu's AI-powered supply chain optimization has been a game-changer. We reduced delivery times by 30% while cutting operational costs significantly.",
    metrics: [
      { icon: Clock, label: "Delivery Time", value: "30% Faster" },
      { icon: DollarSign, label: "Cost Savings", value: "25%" },
      { icon: TrendingUp, label: "Efficiency", value: "45%" }
    ],
    industry: "Logistics",
    projectType: "Supply Chain AI"
  }
];

const caseStudyHighlights = [
  {
    title: "Fortune 500 Manufacturer",
    description: "AI-powered quality control system",
    result: "99.2% accuracy in defect detection",
    icon: TrendingUp,
    color: "from-accent-cyan to-primary"
  },
  {
    title: "Global E-commerce Platform",
    description: "Personalization engine implementation",
    result: "42% increase in conversion rates",
    icon: Users,
    color: "from-accent-purple to-accent-cyan"
  },
  {
    title: "Healthcare Provider Network",
    description: "Predictive patient care system",
    result: "35% reduction in readmission rates",
    icon: Star,
    color: "from-accent-green to-accent-purple"
  }
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-elevated to-background" />
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-secondary rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-primary/20 mb-6"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Client Success Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6"
          >
            Proven{' '}
            <span className="text-gradient-primary">Results</span> That Matter
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Don't just take our word for it. See how we've helped businesses like yours 
            achieve remarkable results with AI-powered solutions.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <Card className="h-full glass hover:glass-strong transition-all duration-500 border-primary/10 hover:border-primary/30 group-hover:scale-105 overflow-hidden">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent-orange text-accent-orange" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                    <p className="text-muted-foreground leading-relaxed pl-6">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {testimonial.metrics.map((metric, metricIndex) => (
                      <div key={metric.label} className="text-center">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <metric.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-sm font-bold text-primary">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.industry}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.projectType}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Case Study Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 border border-primary/20"
        >
          <h3 className="text-2xl font-space-grotesk font-bold text-center mb-8">
            Featured <span className="text-gradient-primary">Case Studies</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudyHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse`}>
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-gradient-primary transition-all duration-300">
                  {highlight.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {highlight.description}
                </p>
                <div className="text-lg font-bold text-primary">
                  {highlight.result}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}