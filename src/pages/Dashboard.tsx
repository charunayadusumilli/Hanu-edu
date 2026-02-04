import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bell, BookOpen, GraduationCap, Play, Star, Clock, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Student Panel
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Welcome back! You're 75% through your current course.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-primary/20">
            <Play className="w-4 h-4 mr-2" />
            Resume Last Lesson
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">4</div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                2 in progress
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Certificates Earned</CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">12</div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Expert status
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">124h</div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Top 5% this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Avg. Score</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">4.8</div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Outstanding performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Courses */}
          <Card className="lg:col-span-2 bg-white border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                Continue Learning
              </CardTitle>
              <CardDescription className="font-medium">
                Your recent active courses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: 'Generative AI for Business', status: 'Module 4: Prompt Engineering', progress: 75, priority: 'High Priority' },
                { name: 'Deep Learning Mastery', status: 'Module 2: Neural Networks', progress: 25, priority: 'Technical' },
                { name: 'Cloud Native AI Ops', status: 'Module 8: Final Project', progress: 90, priority: 'Exam Soon' }
              ].map((course, index) => (
                <div key={index} className="p-6 border border-slate-50 rounded-2xl hover:border-primary/20 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{course.name}</h4>
                    <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider">
                      {course.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-500">{course.status}</span>
                    <span className="text-sm font-bold text-slate-900">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 bg-slate-100" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Up Next & Notifications */}
          <div className="space-y-8">
            <Card className="bg-white border-slate-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Bell className="w-5 h-5 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'live', message: 'Live Q&A starts in 30 mins', time: '30m' },
                  { type: 'feedback', message: 'Assignment graded: Module 3', time: '4h' },
                  { type: 'new', message: 'New course available: AI Security', time: '1d' }
                ].map((notification, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-slate-50 rounded-xl">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{notification.message}</p>
                      <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wide">{notification.time} ago</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg font-bold">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-none rounded-xl" variant="outline">
                  <BookOpen className="w-4 h-4 mr-3" />
                  Course Catalog
                </Button>
                <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-none rounded-xl" variant="outline">
                  <GraduationCap className="w-4 h-4 mr-3" />
                  My Certificates
                </Button>
                <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-none rounded-xl" variant="outline">
                  <Users className="w-4 h-4 mr-3" />
                  Community Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}