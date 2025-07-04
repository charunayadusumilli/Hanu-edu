import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  User, 
  ArrowRight, 
  Building2, 
  GraduationCap,
  Briefcase,
  Star
} from 'lucide-react';

export function ClientsTalentSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="glass px-4 py-2 text-primary border-primary/30 mb-6">
              <Users className="w-4 h-4 mr-2" />
              Two Sides, One Platform
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-space-grotesk font-bold mb-6"
          >
            <span className="text-gradient-primary">Connecting Excellence</span>
            <br />
            <span className="text-foreground">Clients & Consultants</span>
          </motion.h2>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Clients */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass hover:shadow-glow transition-all duration-300 h-full">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-space-grotesk">
                  <span className="text-gradient-primary">Hanu Clients</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Transform your business with expert consulting solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  <Building2 className="w-4 h-4 mr-2" />
                  Submit Your Challenge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* For Talent */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass hover:shadow-glow transition-all duration-300 h-full">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-space-grotesk">
                  <span className="text-gradient-secondary">Hanu Talent</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Join our network of elite business consultants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-secondary hover:opacity-90">
                  <User className="w-4 h-4 mr-2" />
                  Join Our Network
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}