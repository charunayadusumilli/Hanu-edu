import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText, Users, Calendar, BookOpen, Phone } from 'lucide-react';
import { ChallengeSubmissionForm } from '@/components/forms/challenge-submission';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  category: string;
  read_time_minutes: number;
}

export default function ClientsHub() {
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, category, read_time_minutes')
        .limit(3);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'submit-challenge':
        setShowChallengeForm(true);
        break;
      case 'solutions-cases':
        navigate('/solutions');
        break;
      case 'meet-experts':
        navigate('/experts');
        break;
      case 'project-tracker':
        navigate('/projects');
        break;
    }
  };

  if (showChallengeForm) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowChallengeForm(false)}
              className="mb-4"
            >
              ← Back to Clients Hub
            </Button>
          </div>
          <ChallengeSubmissionForm />
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
              <Button 
                className="w-full bg-gradient-primary"
                onClick={() => handleQuickAction('submit-challenge')}
              >
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
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('solutions-cases')}
              >
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
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('meet-experts')}
              >
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
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleQuickAction('project-tracker')}
              >
                View Projects
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Challenge Submit */}
        <Card className="glass mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Submit Your Challenge?</CardTitle>
            <CardDescription>
              Get matched with the right expert consultant for your business needs
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8 py-3"
              onClick={() => handleQuickAction('submit-challenge')}
            >
              Submit Challenge Now
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Our experts will review your challenge and connect with you within 24 hours
            </p>
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
              {articles.map((article) => (
                <div key={article.id} className="p-4 border border-border rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium mb-1">{article.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span className="text-sm text-muted-foreground">{article.read_time_minutes} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {articles.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading knowledge base...</p>
                </div>
              )}
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