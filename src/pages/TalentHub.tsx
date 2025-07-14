import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Briefcase, GraduationCap, Settings, Search, Star, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SecurityLogger } from '@/utils/security-logger';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';

interface ExpertApplicationData {
  name: string;
  title: string;
  specialties: string[];
  industries: string[];
  experience_years: number;
  hourly_rate: number;
  bio: string;
  availability_status: string;
}

export default function TalentHub() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { user, loading } = useAuth();
  
  useSessionTimeout();
  
  const [formData, setFormData] = useState<ExpertApplicationData>({
    name: '',
    title: '',
    specialties: [],
    industries: [],
    experience_years: 0,
    hourly_rate: 0,
    bio: '',
    availability_status: 'available'
  });

  const handleInputChange = (field: keyof ExpertApplicationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateExpertForm = () => {
    const errors: string[] = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters");
    }
    
    if (!formData.title || formData.title.trim().length < 5) {
      errors.push("Professional title must be at least 5 characters");
    }
    
    if (!formData.specialties || formData.specialties.length === 0) {
      errors.push("At least one specialty is required");
    }
    
    if (!formData.industries || formData.industries.length === 0) {
      errors.push("At least one industry is required");
    }
    
    if (!formData.experience_years || formData.experience_years < 1) {
      errors.push("Experience must be at least 1 year");
    }
    
    if (!formData.hourly_rate || formData.hourly_rate < 1) {
      errors.push("Hourly rate must be greater than 0");
    }
    
    if (!formData.bio || formData.bio.trim().length < 50) {
      errors.push("Bio must be at least 50 characters");
    }
    
    return errors;
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Authentication check
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit an application.",
        variant: "destructive",
      });
      return;
    }
    
    // Form validation
    const validationErrors = validateExpertForm();
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors[0],
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('experts')
        .insert([{
          ...formData,
          user_id: user.id,
          name: formData.name.trim(),
          title: formData.title.trim(),
          bio: formData.bio.trim(),
          specialties: formData.specialties.filter(s => s.trim().length > 0),
          industries: formData.industries.filter(i => i.trim().length > 0)
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 48 hours.",
      });
      
      // Log successful submission
      await SecurityLogger.logFormSubmission('expert_application', true);
    } catch (error) {
      console.error('Error submitting application:', error);
      
      // Log failed submission
      await SecurityLogger.logFormSubmission('expert_application', false, 
        error instanceof Error ? error.message : 'Unknown error');
      
      toast({
        title: "Submission Failed",
        description: "Unable to submit your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAction = (action: string) => {
    // Check authentication for all actions
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature.",
        variant: "destructive",
      });
      return;
    }
    
    switch (action) {
      case 'apply':
        setShowApplicationForm(true);
        break;
      case 'profile':
        toast({
          title: "Profile Builder",
          description: "Profile builder coming soon!",
        });
        break;
      case 'opportunities':
        toast({
          title: "Opportunities",
          description: "Job board coming soon!",
        });
        break;
      case 'learning':
        toast({
          title: "Learning Hub",
          description: "Learning platform coming soon!",
        });
        break;
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="glass max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="glass max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in joining our expert network. We'll review your application and contact you within 48 hours.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <p>✓ Application received and logged</p>
              <p>✓ Initial review in progress</p>
              <p>✓ You'll hear from us soon</p>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setShowApplicationForm(false);
                setFormData({
                  name: '',
                  title: '',
                  specialties: [],
                  industries: [],
                  experience_years: 0,
                  hourly_rate: 0,
                  bio: '',
                  availability_status: 'available'
                });
              }}
              variant="outline"
            >
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showApplicationForm) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowApplicationForm(false)}
              className="mb-4"
            >
              ← Back to Talent Hub
            </Button>
          </div>
          
          <Card className="glass max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-gradient-primary">Join Our Expert Network</CardTitle>
              <CardDescription>
                Complete your application to become a certified Hanu consultant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input 
                      placeholder="Your full name" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      maxLength={255}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Professional Title *</label>
                    <Input 
                      placeholder="e.g., Digital Transformation Consultant" 
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      maxLength={255}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialties *</label>
                    <Input 
                      placeholder="e.g., AI Strategy, Digital Transformation (comma-separated)" 
                      onChange={(e) => handleInputChange('specialties', e.target.value.split(',').map(s => s.trim()))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Industries *</label>
                    <Input 
                      placeholder="e.g., Technology, Healthcare, Finance (comma-separated)" 
                      onChange={(e) => handleInputChange('industries', e.target.value.split(',').map(s => s.trim()))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Years of Experience *</label>
                    <Input 
                      type="number" 
                      placeholder="e.g., 10" 
                      value={formData.experience_years || ''}
                      onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hourly Rate (USD) *</label>
                    <Input 
                      type="number" 
                      placeholder="e.g., 150" 
                      value={formData.hourly_rate || ''}
                      onChange={(e) => handleInputChange('hourly_rate', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Professional Bio *</label>
                  <Textarea 
                    placeholder="Brief overview of your consulting experience, expertise, and what makes you unique..."
                    className="min-h-[120px]"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    maxLength={2000}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Availability Status</label>
                  <Select value={formData.availability_status} onValueChange={(value) => handleInputChange('availability_status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Currently Busy</SelectItem>
                      <SelectItem value="unavailable">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              <Button 
                className="w-full bg-gradient-primary"
                onClick={() => handleQuickAction('apply')}
              >
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
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('profile')}
              >
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
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('opportunities')}
              >
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
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('learning')}
              >
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