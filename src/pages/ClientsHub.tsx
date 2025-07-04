import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText, Users, Calendar, BookOpen, Phone } from 'lucide-react';

export default function ClientsHub() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-space-grotesk font-bold text-gradient-primary mb-4">
            Hanu Clients Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit challenges, connect with experts, and track your consulting journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Submit Challenge</CardTitle>
              <CardDescription>
                Describe your business challenge and get expert help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Solutions & Cases</CardTitle>
              <CardDescription>
                Browse successful case studies and solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Explore
              </Button>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Meet Experts</CardTitle>
              <CardDescription>
                Connect with top consultants in your industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Browse Experts
              </Button>
            </CardContent>
          </Card>

          <Card className="glass hover:shadow-glow transition-all duration-300 interactive">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Project Tracker</CardTitle>
              <CardDescription>
                Monitor your consulting projects in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                View Projects
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Submit Challenge Form */}
        <Card className="glass mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Submit Your Challenge</CardTitle>
            <CardDescription>
              Tell us about your business challenge and we'll connect you with the right experts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input placeholder="Your company name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Input placeholder="e.g., Technology, Healthcare, Finance" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Challenge Title</label>
              <Input placeholder="Brief title of your challenge" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Challenge Description</label>
              <Textarea 
                placeholder="Describe your challenge in detail..."
                className="min-h-[120px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget Range</label>
                <Input placeholder="e.g., $10,000 - $50,000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Timeline</label>
                <Input placeholder="e.g., 3-6 months" />
              </div>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
              Submit Challenge
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Knowledge Base
              </CardTitle>
              <CardDescription>
                Latest insights and resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Digital Transformation Best Practices', category: 'Strategy', readTime: '5 min' },
                { title: 'AI Implementation Roadmap', category: 'Technology', readTime: '8 min' },
                { title: 'Change Management Guide', category: 'Operations', readTime: '12 min' }
              ].map((article, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium mb-1">{article.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Contact & Support
              </CardTitle>
              <CardDescription>
                Get in touch with our team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Request Callback
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Support Ticket
                </Button>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Direct Contact:</p>
                <p className="text-sm">Email: clients@hanuconsulting.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}