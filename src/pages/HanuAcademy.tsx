import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Award, Users, Clock, Star, GraduationCap, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const HanuAcademy = () => {
  const { user } = useAuth();

  const featuredCourses = [
    {
      id: 1,
      title: "AI Fundamentals for Business",
      description: "Learn the basics of artificial intelligence and its applications in modern business",
      instructor: "Dr. Sarah Chen",
      duration: "8 hours",
      level: "Beginner",
      enrolled: 245,
      rating: 4.8,
      price: "$99",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Advanced Machine Learning",
      description: "Deep dive into ML algorithms, neural networks, and practical implementations",
      instructor: "Prof. Michael Rodriguez",
      duration: "24 hours",
      level: "Advanced",
      enrolled: 156,
      rating: 4.9,
      price: "$299",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Data Analytics Bootcamp",
      description: "Complete guide to data analysis, visualization, and business intelligence",
      instructor: "Alex Thompson",
      duration: "16 hours",
      level: "Intermediate",
      enrolled: 189,
      rating: 4.7,
      price: "$199",
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  const academyFeatures = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Interactive Courses",
      description: "Hands-on learning with real-world projects and practical applications"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Certified Learning",
      description: "Earn industry-recognized certificates upon course completion"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and thought leaders"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Skill Progression",
      description: "Track your learning journey and skill development"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gradient-primary mb-6">HANU AI Academy</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Advance your career with cutting-edge AI and technology training programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary" size="lg" asChild>
                <Link to="/academy/courses">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                </Link>
              </Button>
              {!user && (
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth">Sign Up for Free</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose HANU Academy?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive learning platform combines theory with practical application to deliver real results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {academyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 glass text-center h-full">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Courses</h2>
            <Button variant="outline" asChild>
              <Link to="/academy/courses">View All Courses</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className="overflow-hidden glass hover:glass-strong transition-all duration-300 group">
                  <div className="aspect-video bg-gradient-primary/20 flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">By {course.instructor}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-foreground">{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{course.price}</span>
                      <Button size="sm" className="bg-gradient-primary">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-16"
        >
          <Card className="p-8 glass text-center">
            <h2 className="text-2xl font-bold text-foreground mb-8">Academy Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-sm text-muted-foreground">Students Enrolled</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Courses Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HanuAcademy;