import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, Building, MapPin, Users, Globe, ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PartnershipsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // Mock partnership data
  const partnerships = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      type: 'Technology Partner',
      industry: 'Software Development',
      description: 'Leading software development company specializing in enterprise solutions and cloud infrastructure.',
      location: 'San Francisco, CA',
      employees: '500-1000',
      website: 'https://techcorp.com',
      logo: '/api/placeholder/100/100',
      partnershipDate: '2023-01-15',
      projects: 12,
      revenue: '$2.5M',
      status: 'Active',
      contactPerson: 'John Smith',
      contactEmail: 'john.smith@techcorp.com'
    },
    {
      id: '2',
      name: 'HealthTech Innovations',
      type: 'Strategic Partner',
      industry: 'Healthcare',
      description: 'Healthcare technology company focused on AI-driven medical solutions and patient management systems.',
      location: 'Boston, MA',
      employees: '200-500',
      website: 'https://healthtech.com',
      logo: '/api/placeholder/100/100',
      partnershipDate: '2022-08-20',
      projects: 8,
      revenue: '$1.8M',
      status: 'Active',
      contactPerson: 'Dr. Sarah Johnson',
      contactEmail: 'sarah.johnson@healthtech.com'
    },
    {
      id: '3',
      name: 'CloudScale Systems',
      type: 'Vendor Partner',
      industry: 'Cloud Computing',
      description: 'Cloud infrastructure provider offering scalable solutions for enterprise and government clients.',
      location: 'Seattle, WA',
      employees: '1000+',
      website: 'https://cloudscale.com',
      logo: '/api/placeholder/100/100',
      partnershipDate: '2023-06-10',
      projects: 15,
      revenue: '$3.2M',
      status: 'Active',
      contactPerson: 'Michael Chen',
      contactEmail: 'michael.chen@cloudscale.com'
    },
    {
      id: '4',
      name: 'GovTech Alliance',
      type: 'Government Partner',
      industry: 'Public Sector',
      description: 'Government technology alliance focused on digital transformation and citizen services improvement.',
      location: 'Washington, DC',
      employees: '100-200',
      website: 'https://govtech-alliance.org',
      logo: '/api/placeholder/100/100',
      partnershipDate: '2022-03-05',
      projects: 6,
      revenue: '$1.1M',
      status: 'Active',
      contactPerson: 'Lisa Anderson',
      contactEmail: 'lisa.anderson@govtech-alliance.org'
    }
  ];

  const partnerTypes = ['all', 'Technology Partner', 'Strategic Partner', 'Vendor Partner', 'Government Partner'];
  const industries = ['all', 'Software Development', 'Healthcare', 'Cloud Computing', 'Public Sector', 'Manufacturing'];

  const filteredPartnerships = partnerships.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    const matchesIndustry = selectedIndustry === 'all' || partner.industry === selectedIndustry;
    return matchesSearch && matchesType && matchesIndustry;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
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
                <h1 className="text-4xl font-bold text-gradient-primary">Partnership Directory</h1>
                <p className="text-muted-foreground">Explore our network of strategic partners and collaborators</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <Link to="/hanu-partnerships">Back to Partnerships</Link>
                </Button>
                <Button className="bg-gradient-primary" asChild>
                  <Link to="/partnerships/apply">Become a Partner</Link>
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search partners, industries, or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {partnerTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Partner Types' : type}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Partnership Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPartnerships.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 glass hover:glass-strong transition-all duration-300 group h-full">
                <div className="space-y-4">
                  {/* Partner Header */}
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={partner.logo} alt={partner.name} />
                      <AvatarFallback>
                        <Building className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground truncate">{partner.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(partner.status)}`} title={partner.status}></div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{partner.type}</Badge>
                        <Badge variant="outline">{partner.industry}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {partner.description}
                      </p>
                    </div>
                  </div>

                  {/* Partner Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{partner.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{partner.employees} employees</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" 
                           className="text-primary hover:underline flex items-center">
                          Website <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-muted-foreground">
                        <span className="font-medium">Projects:</span> {partner.projects}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">Revenue:</span> {partner.revenue}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">Since:</span> {new Date(partner.partnershipDate).getFullYear()}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium text-foreground">{partner.contactPerson}</div>
                        <div className="text-muted-foreground">{partner.contactEmail}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" className="bg-gradient-primary">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPartnerships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No partnerships found matching your criteria.</p>
          </div>
        )}

        {/* Partnership Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="p-8 glass">
            <h2 className="text-2xl font-bold text-foreground mb-6">Partnership Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{partnerships.length}</div>
                <div className="text-sm text-muted-foreground">Active Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {partnerships.reduce((sum, p) => sum + p.projects, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  ${(partnerships.reduce((sum, p) => sum + parseFloat(p.revenue.replace(/[$M]/g, '')), 0)).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Combined Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {new Set(partnerships.map(p => p.industry)).size}
                </div>
                <div className="text-sm text-muted-foreground">Industries</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnershipsDirectory;