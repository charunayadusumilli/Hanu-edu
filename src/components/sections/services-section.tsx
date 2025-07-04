import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  Cog, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: "AI Strategy & Implementation",
    description: "Transform your business with cutting-edge AI solutions and strategic implementation roadmaps.",
    features: ["AI Readiness Assessment", "Custom AI Solutions", "Implementation Support", "ROI Optimization"],
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    icon: TrendingUp,
    title: "Digital Transformation",
    description: "Modernize your operations and unlock new growth opportunities through digital innovation.",
    features: ["Process Digitization", "Technology Integration", "Change Management", "Performance Analytics"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Cog,
    title: "Process Optimization",
    description: "Streamline workflows and maximize efficiency across your entire organization.",
    features: ["Workflow Analysis", "Automation Solutions", "Quality Improvement", "Cost Reduction"],
    gradient: "from-green-500 to-emerald-500"
  }
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Badge variant="outline" className="glass px-4 py-2 text-primary border-primary/30 mb-6">
              <Cog className="w-4 h-4 mr-2" />
              Our Services
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-space-grotesk font-bold mb-6"
          >
            <span className="text-gradient-primary">Comprehensive Solutions</span>
            <br />
            <span className="text-foreground">For Every Challenge</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            From AI implementation to digital transformation, our expert consultants deliver results that drive growth and innovation.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass hover:shadow-glow transition-all duration-300 group h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-accent-green mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}