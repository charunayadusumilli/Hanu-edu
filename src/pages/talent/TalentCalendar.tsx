import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TalentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('month');

  // Mock calendar events
  const events = [
    {
      id: '1',
      title: 'Team Stand-up',
      type: 'meeting',
      date: new Date(2024, 2, 15, 9, 0),
      duration: 30,
      attendees: ['Sarah Chen', 'Marcus Johnson'],
      location: 'Conference Room A'
    },
    {
      id: '2',
      title: 'Annual Leave',
      type: 'timeoff',
      date: new Date(2024, 2, 18),
      duration: 480,
      attendees: [],
      location: ''
    },
    {
      id: '3',
      title: 'Client Presentation',
      type: 'meeting',
      date: new Date(2024, 2, 20, 14, 0),
      duration: 120,
      attendees: ['Elena Rodriguez', 'Marcus Johnson'],
      location: 'Virtual - Zoom'
    }
  ];

  // Mock time-off requests
  const timeOffRequests = [
    {
      id: '1',
      type: 'Vacation',
      startDate: '2024-03-25',
      endDate: '2024-03-29',
      status: 'pending',
      days: 5
    },
    {
      id: '2',
      type: 'Sick Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-10',
      status: 'approved',
      days: 1
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border/20"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(event => 
        event.date.getDate() === day && 
        event.date.getMonth() === currentDate.getMonth()
      );

      days.push(
        <div key={day} className="h-24 border border-border/20 p-1 hover:bg-surface/50 transition-colors">
          <div className="text-sm font-medium text-foreground mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${
                  event.type === 'meeting' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                }`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gradient-primary">Time Management</h1>
                <p className="text-muted-foreground">Manage your schedule, time off, and team availability</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <Link to="/talent">Back to Talent Hub</Link>
                </Button>
                <Button className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              {['month', 'week', 'day'].map((view) => (
                <Button
                  key={view}
                  variant={selectedView === view ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedView(view)}
                  className="capitalize"
                >
                  {view}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="p-6 glass">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border border-border/20">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0">
                {renderCalendarGrid()}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Request Time Off
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Clock In/Out
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </Card>

            {/* Time Off Requests */}
            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold text-foreground mb-4">Time Off Requests</h3>
              <div className="space-y-3">
                {timeOffRequests.map((request) => (
                  <div key={request.id} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{request.type}</span>
                      <Badge variant={request.status === 'approved' ? 'default' : 'secondary'}>
                        {request.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>{request.startDate} to {request.endDate}</div>
                      <div>{request.days} day{request.days !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Team Availability */}
            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold text-foreground mb-4">Team Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Sarah Chen</span>
                  <Badge variant="default">Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Marcus Johnson</span>
                  <Badge variant="secondary">In Meeting</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Elena Rodriguez</span>
                  <Badge variant="outline">Out of Office</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCalendar;