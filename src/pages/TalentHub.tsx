import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Briefcase, GraduationCap, Settings, Search, Star, MapPin } from 'lucide-react';

export default function TalentHub() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-space-grotesk font-bold text-gradient-primary mb-4">
            Hanu Talent Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our expert network, build your profile, and access premium consulting opportunities
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Join as Consultant</CardTitle>
              <CardDescription>
                Apply to become part of our expert network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary">
                Apply Now
              </Button>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Profile Builder</CardTitle>
              <CardDescription>
                Create your professional consulting profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Build Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Opportunities</CardTitle>
              <CardDescription>
                Browse available consulting projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                View Jobs
              </Button>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Learning Hub</CardTitle>
              <CardDescription>
                Access training and certification programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="glass mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Join Our Expert Network</CardTitle>
            <CardDescription>
              Complete your application to become a Hanu consultant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="your.email@example.com" type="email" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialization</label>
                <Input placeholder="e.g., Digital Transformation, AI Strategy" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Level</label>
                <Input placeholder="e.g., 10+ years" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Professional Summary</label>
              <Textarea 
                placeholder="Brief overview of your consulting experience and expertise..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="City, Country" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Availability</label>
                <Input placeholder="e.g., Full-time, Part-time, Project-based" />
              </div>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
              Submit Application
            </Button>
          </CardContent>
        </Card>

        {/* Opportunities & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Latest Opportunities
              </CardTitle>
              <CardDescription>
                Premium consulting projects available now
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  title: 'Digital Transformation Lead', 
                  company: 'TechCorp', 
                  location: 'Remote', 
                  duration: '6 months',
                  rate: '$150-200/hr',
                  skills: ['Strategy', 'Digital', 'Leadership']
                },
                { 
                  title: 'AI Implementation Specialist', 
                  company: 'StartupX', 
                  location: 'New York', 
                  duration: '3 months',
                  rate: '$180-220/hr',
                  skills: ['AI', 'Machine Learning', 'Strategy']
                },
                { 
                  title: 'Process Optimization Expert', 
                  company: 'MegaCorp', 
                  location: 'Chicago', 
                  duration: '4 months',
                  rate: '$120-160/hr',
                  skills: ['Operations', 'Lean', 'Six Sigma']
                }
              ].map((opportunity, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-surface-hover transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium mb-1">{opportunity.title}</h4>
                      <p className="text-sm text-muted-foreground">{opportunity.company}</p>
                    </div>
                    <Badge className="bg-gradient-primary text-white">
                      {opportunity.rate}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {opportunity.location}
                    </span>
                    <span>{opportunity.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {opportunity.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" className="w-full">
                    Apply Now
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Learning & Development
              </CardTitle>
              <CardDescription>
                Enhance your skills and earn certifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  title: 'Advanced Consulting Methodology', 
                  progress: 75, 
                  duration: '8 hours',
                  level: 'Advanced'
                },
                { 
                  title: 'AI in Business Strategy', 
                  progress: 40, 
                  duration: '12 hours',
                  level: 'Intermediate'
                },
                { 
                  title: 'Digital Transformation Framework', 
                  progress: 100, 
                  duration: '6 hours',
                  level: 'Beginner'
                }
              ].map((course, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium mb-1">{course.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <span className="text-sm text-muted-foreground">{course.duration}</span>
                      </div>
                    </div>
                    {course.progress === 100 && (
                      <Star className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-3" 
                    variant={course.progress === 100 ? "outline" : "default"}
                  >
                    {course.progress === 100 ? 'Completed' : 'Continue'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}