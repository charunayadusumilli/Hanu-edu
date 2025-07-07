import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, DollarSign, FileText, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Challenge {
  id: string;
  company_name: string;
  challenge_title: string;
  description: string;
  budget_range: string;
  timeline: string;
  urgency: string;
  status: string;
  created_at: string;
  assigned_expert_id?: string;
}

const statusColors = {
  submitted: 'bg-blue-500',
  under_review: 'bg-yellow-500',
  assigned: 'bg-orange-500',
  in_progress: 'bg-purple-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500'
};

const statusLabels = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export default function ProjectTracker() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('client_challenges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredChallenges = () => {
    if (activeTab === 'all') return challenges;
    return challenges.filter(challenge => challenge.status === activeTab);
  };

  const getProgressPercentage = (status: string) => {
    const progressMap = {
      submitted: 20,
      under_review: 40,
      assigned: 60,
      in_progress: 80,
      completed: 100,
      cancelled: 0
    };
    return progressMap[status as keyof typeof progressMap] || 0;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      critical: 'text-red-600'
    };
    return colors[urgency as keyof typeof colors] || 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
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
            Project Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor your consulting projects and track progress in real-time
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{challenges.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">
                    {challenges.filter(c => c.status === 'in_progress').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">
                    {challenges.filter(c => c.status === 'completed').length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <User className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>
              Track the progress of all your consulting projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="under_review">Review</TabsTrigger>
                <TabsTrigger value="assigned">Assigned</TabsTrigger>
                <TabsTrigger value="in_progress">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {getFilteredChallenges().map((challenge) => (
                    <Card key={challenge.id} className="glass-subtle">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Project Info */}
                          <div className="lg:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">
                                  {challenge.challenge_title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {challenge.company_name}
                                </p>
                              </div>
                              <Badge 
                                variant="secondary"
                                className={`text-white ${statusColors[challenge.status as keyof typeof statusColors]}`}
                              >
                                {statusLabels[challenge.status as keyof typeof statusLabels]}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {challenge.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Started {formatDate(challenge.created_at)}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                Timeline: {challenge.timeline || 'TBD'}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                Budget: {challenge.budget_range || 'TBD'}
                              </div>
                              {challenge.urgency && (
                                <div className={`flex items-center font-medium ${getUrgencyColor(challenge.urgency)}`}>
                                  <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                  {challenge.urgency.charAt(0).toUpperCase() + challenge.urgency.slice(1)} Priority
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Progress & Actions */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>{getProgressPercentage(challenge.status)}%</span>
                              </div>
                              <Progress value={getProgressPercentage(challenge.status)} />
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <FileText className="w-4 h-4 mr-1" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {getFilteredChallenges().length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        No projects found for this status
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}