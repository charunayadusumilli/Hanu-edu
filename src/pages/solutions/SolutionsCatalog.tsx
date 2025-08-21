import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Zap, Shield, TrendingUp, Users, Heart, Building, Phone, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Solution categories with icons
  const categoryIcons = {
    'Healthcare': Heart,
    'Government': Building,
    'Contact Center': Phone,
    'Business Intelligence': TrendingUp,
    'AI Tools': Brain
  };

  // Mock solutions data
  const solutions = [
    {
      id: '1',
      title: 'HealthCare AI Analytics',
      description: 'Advanced AI-powered analytics platform for healthcare providers to optimize patient care and operational efficiency.',
      category: 'Healthcare',
      pricing: 'Starting at $299/month',
      features: ['Patient Analytics', 'Predictive Modeling', 'HIPAA Compliant', 'Real-time Dashboards'],
      icon: Heart,
      isPopular: true,
      thumbnail: '/api/placeholder/400/250'
    },
    {
      id: '2',
      title: 'GovTech Citizen Portal',
      description: 'Comprehensive digital platform for government agencies to streamline citizen services and improve engagement.',
      category: 'Government',
      pricing: 'Custom pricing',
      features: ['Citizen Dashboard', 'Service Automation', 'Multi-language Support', 'Accessibility Compliant'],
      icon: Building,
      isPopular: false,
      thumbnail: '/api/placeholder/400/250'
    },
    {
      id: '3',
      title: 'Smart Contact Center',
      description: 'AI-enhanced contact center solution with intelligent routing, sentiment analysis, and performance optimization.',
      category: 'Contact Center',
      pricing: 'Starting at $149/agent/month',
      features: ['AI Routing', 'Sentiment Analysis', 'Performance Analytics', 'Omnichannel Support'],
      icon: Phone,
      isPopular: true,
      thumbnail: '/api/placeholder/400/250'
    },
    {
      id: '4',
      title: 'Business Intelligence Suite',
      description: 'Comprehensive BI platform with advanced analytics, reporting, and data visualization capabilities.',
      category: 'Business Intelligence',
      pricing: 'Starting at $199/month',
      features: ['Advanced Analytics', 'Custom Dashboards', 'Real-time Reports', 'Data Integration'],
      icon: TrendingUp,
      isPopular: false,
      thumbnail: '/api/placeholder/400/250'
    },
    {
      id: '5',
      title: 'AI Process Automation',
      description: 'Intelligent automation tools to streamline business processes and reduce manual workload.',
      category: 'AI Tools',
      pricing: 'Starting at $99/month',
      features: ['Process Mining', 'Workflow Automation', 'ML Integration', 'Custom Workflows'],
      icon: Brain,
      isPopular: true,
      thumbnail: '/api/placeholder/400/250'
    }
  ];

  const categories = ['all', 'Healthcare', 'Government', 'Contact Center', 'Business Intelligence', 'AI Tools'];

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solution.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solution.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || solution.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
                <h1 className="text-4xl font-bold text-gradient-primary">Solutions Marketplace</h1>
                <p className="text-muted-foreground">Discover enterprise solutions tailored for your industry</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/hanu-solutions">Back to Solutions</Link>
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search solutions, features, or industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="container mx-auto px-6 py-12">
        {/* Category Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <Card key={category} className="p-4 glass hover:glass-strong transition-all duration-300 cursor-pointer group">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{category}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Featured Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredSolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden glass hover:glass-strong transition-all duration-300 group h-full">
                {/* Solution Header */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                  <img 
                    src={solution.thumbnail} 
                    alt={solution.title}
                    className="w-full h-full object-cover"
                  />
                  {solution.isPopular && (
                    <Badge className="absolute top-3 right-3 bg-gradient-primary">
                      <Zap className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary">{solution.category}</Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex flex-col h-full">
                  {/* Solution Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <solution.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {solution.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {solution.description}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {solution.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-1">
                            <Shield className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-primary">
                        {solution.pricing}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Enterprise Ready</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Learn More
                      </Button>
                      <Button className="bg-gradient-primary flex-1" asChild>
                        <Link to={`/solutions/product/${solution.id}`}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredSolutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No solutions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionsCatalog;