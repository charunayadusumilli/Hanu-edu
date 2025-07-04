import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  User, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Briefcase,
  GraduationCap,
  Globe,
  Award,
  TrendingUp,
  Zap
} from 'lucide-react';

const tabs = [
  { id: 'clients', label: 'For Clients', icon: Users },
  { id: 'talent', label: 'For Talent', icon: User },
];

const clientFeatures = [
  {
    icon: Briefcase,
    title: "Submit Your Challenge",
    description: "Describe your business challenge and we'll match you with the perfect AI consultant.",
    steps: ["Upload requirements", "AI matching", "Expert assignment", "Project kickoff"],
  },
  {
    icon: Star,
    title: "Meet AI Experts",
    description: "Access our vetted network of top-tier AI consultants and data scientists.",
    steps: ["Browse profiles", "Review portfolios", "Schedule consultations", "Select your expert"],
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Real-time project tracking with AI-powered insights and regular updates.",
    steps: ["Dashboard access", "Milestone tracking", "Progress reports", "Success metrics"],
  },
];

const talentFeatures = [
  {
    icon: GraduationCap,
    title: "Join as Consultant",
    description: "Become part of our elite network of AI consultants and grow your career.",
    steps: ["Apply online", "Skill assessment", "Interview process", "Onboarding"],
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description: "Work with clients worldwide on cutting-edge AI projects and challenges.",
    steps: ["Browse projects", "Submit proposals", "Client matching", "Start working"],
  },
  {
    icon: Award,
    title: "Professional Growth",
    description: "Continuous learning opportunities with access to latest AI tools and training.",
    steps: ["Skill development", "Certification programs", "Mentorship", "Career advancement"],
  },
];

const stats = {
  clients: [
    { label: "Global Clients", value: "500+", color: "text-accent-cyan" },
    { label: "Success Rate", value: "98%", color: "text-accent-green" },
    { label: "Projects Completed", value: "1,200+", color: "text-accent-purple" },
  ],
  talent: [
    { label: "Expert Consultants", value: "200+", color: "text-accent-cyan" },
    { label: "Countries", value: "25+", color: "text-accent-green" },
    { label: "Avg. Experience", value: "8+ years", color: "text-accent-purple" },
  ],
};

export function ClientsTalentSection() {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-secondary opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="glass rounded-2xl p-2 inline-flex border border-primary/20">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-primary text-white shadow-glow"
                    : "hover:bg-surface-elevated"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-space-grotesk font-bold mb-6"
              >
                {activeTab === 'clients' ? (
                  <>Transform Your Business with <span className="text-gradient-primary">AI Expertise</span></>
                ) : (
                  <>Join Our Elite <span className="text-gradient-primary">AI Consultant</span> Network</>
                )}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                {activeTab === 'clients'
                  ? "Connect with world-class AI consultants who understand your industry and deliver measurable results."
                  : "Work on cutting-edge AI projects with global clients while advancing your career in artificial intelligence."
                }
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {(activeTab === 'clients' ? clientFeatures : talentFeatures).map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group"
                >
                  <Card className="h-full glass hover:glass-strong transition-all duration-500 border-primary/10 hover:border-primary/30 group-hover:scale-105 overflow-hidden">
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:animate-bounce-subtle">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-space-grotesk font-bold mb-4 group-hover:text-gradient-primary transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Steps */}
                      <div className="space-y-3">
                        {feature.steps.map((step, stepIndex) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-primary">{stepIndex + 1}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass rounded-2xl p-8 border border-primary/20 mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats[activeTab as keyof typeof stats].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 shadow-glow-strong px-12 py-6 text-lg font-semibold group"
              >
                {activeTab === 'clients' ? 'Start Your AI Journey' : 'Join Our Network'}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                {activeTab === 'clients' 
                  ? 'Free consultation • No commitment required'
                  : 'Elite network • Global opportunities'
                }
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}