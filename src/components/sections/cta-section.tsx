import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Sparkles,
  Zap,
  Users,
  CheckCircle
} from 'lucide-react';

const benefits = [
  "Free AI readiness assessment",
  "Custom strategy consultation",
  "Expert matching guarantee",
  "Risk-free trial period"
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@hanuconsulting.ai",
    action: "mailto:hello@hanuconsulting.ai"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    action: "tel:+15551234567"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Global • Remote First",
    action: null
  }
];

export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent-purple/5" />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Ready to Transform?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6"
            >
              Start Your{' '}
              <span className="text-gradient-primary">AI Journey</span>{' '}
              Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Join hundreds of companies that have already transformed their business with AI. 
              Get your free consultation and discover what's possible.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-strong border-primary/30 shadow-glow p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-space-grotesk font-bold">
                      Book Your Free Consultation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      30-minute strategy session with our AI experts
                    </p>
                  </div>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      className="glass border-primary/20 focus:border-primary/50"
                    />
                    <Input
                      placeholder="Last Name"
                      className="glass border-primary/20 focus:border-primary/50"
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Work Email"
                    className="glass border-primary/20 focus:border-primary/50"
                  />
                  <Input
                    placeholder="Company Name"
                    className="glass border-primary/20 focus:border-primary/50"
                  />
                  <Input
                    placeholder="What's your biggest AI challenge?"
                    className="glass border-primary/20 focus:border-primary/50"
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 shadow-glow-strong py-3 text-lg font-semibold group"
                  >
                    Book Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                {/* Benefits */}
                <div className="mt-6 space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-accent-green" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact Info & Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="glass hover:glass-strong transition-all duration-300 border-primary/20 hover:border-primary/40 p-6 group cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:animate-pulse">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground">
                            {info.label}
                          </h4>
                          <p className="text-lg font-medium group-hover:text-gradient-primary transition-all duration-300">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <Card className="glass-strong border-primary/30 p-6">
                <h3 className="text-lg font-space-grotesk font-bold mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start animated-border group"
                  >
                    <Users className="w-5 h-5 mr-3" />
                    Join Talent Network
                    <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start animated-border group"
                  >
                    <Zap className="w-5 h-5 mr-3" />
                    AI Readiness Assessment
                    <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>

              {/* Stats */}
              <Card className="glass border-primary/20 p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gradient-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gradient-primary">48h</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}