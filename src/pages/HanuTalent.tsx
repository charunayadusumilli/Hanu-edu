import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Trophy, FileText, Settings, UserPlus, Briefcase, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const HanuTalent = () => {
  const { user } = useAuth();

  const talentFeatures = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Team Directory",
      description: "Comprehensive employee directory with skills tracking and performance metrics",
      href: "/talent/directory"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Time Management",
      description: "Track time off, manage schedules, and coordinate team availability",
      href: "/talent/calendar"
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "Performance Tracking",
      description: "Monitor goals, achievements, and professional development progress",
      href: "/talent/performance"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "HR Documents",
      description: "Access contracts, policies, and important HR documentation",
      href: "/talent/documents"
    },
    {
      icon: <UserPlus className="w-8 h-8 text-primary" />,
      title: "Recruitment",
      description: "Manage job postings, applications, and candidate evaluations",
      href: "/talent/recruitment"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Career Development",
      description: "Plan career paths, skill development, and training programs",
      href: "/talent/development"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Users className="w-16 h-16 text-primary mx-auto" />
            <h1 className="text-3xl font-bold text-foreground">HANU Talent Portal</h1>
            <p className="text-muted-foreground">
              Access your HR dashboard, manage your profile, and connect with your team.
            </p>
            <Button className="bg-gradient-primary" asChild>
              <Link to="/auth">Sign In to Access Talent Portal</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-gradient-primary mb-2">HANU Talent</h1>
              <p className="text-muted-foreground">Human Resources & Talent Management Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/talent/profile">
                  <Settings className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </Button>
              <Button className="bg-gradient-primary" asChild>
                <Link to="/talent/dashboard">
                  <Clock className="w-4 h-4 mr-2" />
                  Time Clock
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talentFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 glass hover:glass-strong transition-all duration-300 group cursor-pointer">
                <Link to={feature.href} className="block h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8 glass">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">24</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">5</div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">89%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HanuTalent;