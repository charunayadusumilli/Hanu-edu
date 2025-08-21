import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TalentDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock employee data
  const employees = [
    {
      id: '1',
      name: 'Sarah Chen',
      position: 'Senior AI Engineer',
      department: 'Engineering',
      email: 'sarah.chen@hanu.consulting',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      joinDate: '2022-03-15',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'AWS'],
      avatar: '/api/placeholder/150/150'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      position: 'Product Manager',
      department: 'Product',
      email: 'marcus.j@hanu.consulting',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      joinDate: '2021-11-08',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
      avatar: '/api/placeholder/150/150'
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      position: 'UX Designer',
      department: 'Design',
      email: 'elena.r@hanu.consulting',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      joinDate: '2023-01-20',
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
      avatar: '/api/placeholder/150/150'
    }
  ];

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'HR'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

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
                <h1 className="text-4xl font-bold text-gradient-primary">Team Directory</h1>
                <p className="text-muted-foreground">Connect with your colleagues and explore team expertise</p>
              </div>
              <Button className="bg-gradient-primary" asChild>
                <Link to="/talent">Back to Talent Hub</Link>
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, position, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 glass hover:glass-strong transition-all duration-300 group">
                <div className="space-y-4">
                  {/* Avatar and Basic Info */}
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground truncate">{employee.name}</h3>
                      <p className="text-primary font-medium">{employee.position}</p>
                      <Badge variant="secondary" className="mt-1">{employee.department}</Badge>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{employee.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No employees found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentDirectory;