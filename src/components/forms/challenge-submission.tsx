import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, CheckCircle } from 'lucide-react';

interface ChallengeFormData {
  companyName: string;
  industry: string;
  challengeTitle: string;
  description: string;
  budgetRange: string;
  timeline: string;
  urgency: string;
  contactEmail: string;
  contactPhone: string;
  agreeToTerms: boolean;
}

export function ChallengeSubmissionForm() {
  const [formData, setFormData] = useState<ChallengeFormData>({
    companyName: '',
    industry: '',
    challengeTitle: '',
    description: '',
    budgetRange: '',
    timeline: '',
    urgency: '',
    contactEmail: '',
    contactPhone: '',
    agreeToTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Challenge Submitted Successfully!",
        description: "We'll review your challenge and connect you with the right expert within 24 hours.",
      });
    }, 2000);
  };

  const handleInputChange = (field: keyof ChallengeFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="glass max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-accent-green mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Challenge Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for submitting your challenge. Our expert matching system is now analyzing your requirements.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground mb-6">
            <p>✓ Challenge received and logged</p>
            <p>✓ Expert matching in progress</p>
            <p>✓ You'll hear from us within 24 hours</p>
          </div>
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                companyName: '',
                industry: '',
                challengeTitle: '',
                description: '',
                budgetRange: '',
                timeline: '',
                urgency: '',
                contactEmail: '',
                contactPhone: '',
                agreeToTerms: false
              });
            }}
            variant="outline"
          >
            Submit Another Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient-primary">Submit Your Business Challenge</CardTitle>
        <CardDescription>
          Provide detailed information about your challenge so we can match you with the perfect consultant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Challenge Details */}
          <div className="space-y-2">
            <Label htmlFor="challengeTitle">Challenge Title *</Label>
            <Input
              id="challengeTitle"
              value={formData.challengeTitle}
              onChange={(e) => handleInputChange('challengeTitle', e.target.value)}
              placeholder="Brief, descriptive title of your challenge"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your challenge in detail. Include current situation, desired outcomes, constraints, and any relevant context..."
              className="min-h-[150px]"
              required
            />
          </div>

          {/* Project Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budgetRange">Budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25k">Under $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="over-500k">Over $500,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (under 1 month)</SelectItem>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-12-months">6-12 months</SelectItem>
                  <SelectItem value="over-12-months">Over 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Planning ahead</SelectItem>
                  <SelectItem value="medium">Medium - Within quarter</SelectItem>
                  <SelectItem value="high">High - ASAP</SelectItem>
                  <SelectItem value="critical">Critical - Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="your.email@company.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* File Upload Placeholder */}
          <div className="space-y-2">
            <Label>Supporting Documents (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Upload relevant documents, presentations, or files</p>
              <p className="text-sm text-muted-foreground">Max 10MB per file • PDF, DOC, PPT, XLS supported</p>
              <Button variant="outline" type="button" className="mt-4">
                Browse Files
              </Button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions *
              </Label>
              <p className="text-xs text-muted-foreground">
                By submitting this challenge, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Challenge...
              </>
            ) : (
              'Submit Challenge'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}