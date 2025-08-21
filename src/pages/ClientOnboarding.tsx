import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building, 
  MessageSquare, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  Clock,
  Users,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const ClientOnboarding = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Basic Information
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    company_name: '',
    position: '',
    
    // Inquiry Details
    inquiry_type: '',
    subject: '',
    message: '',
    
    // Project Details
    project_scope: '',
    budget_range: '',
    timeline: '',
    urgency: 'medium',
    
    // Additional Services
    additional_services: [] as string[],
    preferred_contact_method: 'email',
    follow_up_preference: 'within_24_hours'
  });

  const inquiryTypes = [
    { value: 'consulting', label: 'General Consulting', description: 'Strategic business consulting and advisory services' },
    { value: 'talent', label: 'Talent Solutions', description: 'HR services and talent management solutions' },
    { value: 'academy', label: 'Training Programs', description: 'Educational courses and skill development' },
    { value: 'partnerships', label: 'Partnership Opportunities', description: 'Strategic partnerships and collaborations' },
    { value: 'solutions', label: 'Technology Solutions', description: 'AI-powered software and technology platforms' },
    { value: 'general', label: 'General Inquiry', description: 'Other questions or information requests' }
  ];

  const budgetRanges = [
    '$10K - $50K',
    '$50K - $100K',
    '$100K - $250K',
    '$250K - $500K',
    '$500K - $1M',
    '$1M+'
  ];

  const timelineOptions = [
    'Immediate (within 1 month)',
    'Short-term (1-3 months)',
    'Medium-term (3-6 months)',
    'Long-term (6+ months)',
    'To be determined'
  ];

  const additionalServices = [
    'Change Management',
    'Training & Development',
    'Technical Support',
    'Data Migration',
    'Custom Development',
    'Integration Services',
    'Ongoing Maintenance',
    'Performance Optimization'
  ];

  const steps = [
    { number: 1, title: 'Basic Information', icon: <User className="w-5 h-5" /> },
    { number: 2, title: 'Inquiry Details', icon: <MessageSquare className="w-5 h-5" /> },
    { number: 3, title: 'Project Scope', icon: <Target className="w-5 h-5" /> },
    { number: 4, title: 'Review & Submit', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additional_services: prev.additional_services.includes(service)
        ? prev.additional_services.filter(s => s !== service)
        : [...prev.additional_services, service]
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.company_name;
      case 2:
        return formData.inquiry_type && formData.subject && formData.message;
      case 3:
        return formData.project_scope && formData.budget_range && formData.timeline;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const inquiryData = {
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email,
        company_name: formData.company_name,
        phone: formData.phone,
        inquiry_type: formData.inquiry_type,
        subject: formData.subject,
        message: `${formData.message}\n\nProject Details:\n- Scope: ${formData.project_scope}\n- Budget: ${formData.budget_range}\n- Timeline: ${formData.timeline}\n- Additional Services: ${formData.additional_services.join(', ')}\n- Preferred Contact: ${formData.preferred_contact_method}`,
        priority: formData.urgency,
        status: 'new'
      };

      // Save to database
      const { error } = await supabase
        .from('client_inquiries')
        .insert([inquiryData]);

      if (error) throw error;

      // Send email notification
      try {
        const emailData = {
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.company_name,
          inquiryType: formData.inquiry_type,
          message: formData.message,
          budget: formData.budget_range,
          timeline: formData.timeline,
          urgency: formData.urgency
        };

        await supabase.functions.invoke('send-inquiry-email', {
          body: emailData
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the whole submission if email fails
      }

      setCurrentStep(5); // Success step
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "We'll get back to you within 24 hours."
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card className="p-8 glass">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-foreground mb-4">Thank You!</h1>
              <p className="text-muted-foreground mb-6">
                Your inquiry has been submitted successfully. Our team will review your request and get back to you within 24 hours.
              </p>
              <div className="space-y-3 text-sm text-muted-foreground mb-6">
                <div className="flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Response time: Within 24 hours
                </div>
                <div className="flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Assigned to: {formData.inquiry_type} team
                </div>
              </div>
              <Button className="bg-gradient-primary" asChild>
                <a href="/">Return to Home</a>
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gradient-primary mb-4">Client Onboarding</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and requirements. We'll match you with the right experts and solutions.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted text-muted-foreground'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.icon}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    Step {step.number}
                  </div>
                  <div className={`text-xs ${
                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 glass">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <User className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Your Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      placeholder="e.g., CEO, CTO, Manager"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <MessageSquare className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Inquiry Details</h2>
                </div>

                <div className="space-y-4">
                  <Label>Type of Inquiry *</Label>
                  <RadioGroup
                    value={formData.inquiry_type}
                    onValueChange={(value) => handleInputChange('inquiry_type', value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {inquiryTypes.map((type) => (
                      <div key={type.value} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={type.value} className="font-medium cursor-pointer">{type.label}</Label>
                          <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Detailed Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please provide detailed information about your requirements, challenges, or questions..."
                    rows={5}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <Target className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Project Scope</h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scope">Project Scope *</Label>
                  <Textarea
                    id="scope"
                    value={formData.project_scope}
                    onChange={(e) => handleInputChange('project_scope', e.target.value)}
                    placeholder="Describe the scope and objectives of your project..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Budget Range *</Label>
                    <Select value={formData.budget_range} onValueChange={(value) => handleInputChange('budget_range', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timeline *</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Priority Level</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => handleInputChange('urgency', value)}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>Additional Services Needed</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {additionalServices.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.additional_services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label htmlFor={service} className="text-sm cursor-pointer">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold text-foreground">Review & Submit</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-muted-foreground">Name:</span> {formData.name}</div>
                      <div><span className="text-muted-foreground">Email:</span> {formData.email}</div>
                      <div><span className="text-muted-foreground">Company:</span> {formData.company_name}</div>
                      <div><span className="text-muted-foreground">Phone:</span> {formData.phone || 'Not provided'}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Inquiry Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-muted-foreground">Type:</span> {inquiryTypes.find(t => t.value === formData.inquiry_type)?.label}</div>
                      <div><span className="text-muted-foreground">Subject:</span> {formData.subject}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-surface rounded-lg">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-muted-foreground">Budget:</span> {formData.budget_range}</div>
                      <div><span className="text-muted-foreground">Timeline:</span> {formData.timeline}</div>
                      <div><span className="text-muted-foreground">Priority:</span> <Badge variant={formData.urgency === 'high' ? 'destructive' : formData.urgency === 'medium' ? 'default' : 'secondary'}>{formData.urgency}</Badge></div>
                    </div>
                    {formData.additional_services.length > 0 && (
                      <div className="mt-3">
                        <span className="text-muted-foreground text-sm">Additional Services:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.additional_services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">{service}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-primary flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-primary flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientOnboarding;