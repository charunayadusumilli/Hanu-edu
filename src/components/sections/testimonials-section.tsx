import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions",
    rating: 5,
    quote: "Hanu Consulting transformed our entire AI strategy. Their expertise helped us reduce operational costs by 40% while improving customer satisfaction.",
    results: "40% cost reduction"
  },
  {
    name: "Michael Rodriguez", 
    role: "CEO",
    company: "GrowthCorp",
    rating: 5,
    quote: "The digital transformation roadmap provided by Hanu exceeded our expectations and delivered measurable results.",
    results: "200% revenue growth"
  },
  {
    name: "Emily Johnson",
    role: "Operations Director", 
    company: "InnovateCo",
    rating: 5,
    quote: "Working with Hanu's process optimization team saved us thousands of hours annually through smart automation.",
    results: "60% efficiency increase"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="glass px-4 py-2 text-primary border-primary/30 mb-6">
              <Star className="w-4 h-4 mr-2" />
              Client Success Stories
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-space-grotesk font-bold mb-6"
          >
            <span className="text-gradient-primary">Proven Results</span>
            <br />
            <span className="text-foreground">Real Impact</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass hover:shadow-glow transition-all duration-300 h-full">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="w-8 h-8 text-primary/30" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent-orange fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-foreground mb-6 text-sm italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Results Badge */}
                  <div className="mb-6">
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {testimonial.results}
                    </Badge>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}