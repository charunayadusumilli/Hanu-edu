import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Handshake, Building2, Globe, Users, TrendingUp, Award, Target, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const HanuPartnerships = () => {
  const partnershipTypes = [
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Technology Partners",
      description: "Collaborate with leading tech companies to innovate and deliver cutting-edge solutions",
      count: "25+ Partners",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global Alliances",
      description: "Strategic partnerships with international organizations for global reach",
      count: "12 Countries",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Consulting Networks",
      description: "Professional service partnerships to expand our consulting capabilities",
      count: "40+ Consultants",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Academic Partners",
      description: "Collaborate with universities and research institutions for innovation",
      count: "15 Universities",
      color: "from-orange-500/20 to-red-500/20"
    }
  ];

  const featuredPartners = [
    {
      name: "TechCorp Solutions",
      type: "Technology",
      level: "Strategic",
      description: "AI and machine learning technology partnership for advanced analytics solutions",
      services: ["AI Development", "Cloud Infrastructure", "Data Analytics"],
      status: "Active",
      since: "2022"
    },
    {
      name: "Global Consulting Group",
      type: "Consulting",
      level: "Preferred",
      description: "Management consulting partnership for enterprise transformation projects",
      services: ["Strategy Consulting", "Digital Transformation", "Change Management"],
      status: "Active",
      since: "2021"
    },
    {
      name: "Innovation University",
      type: "Academic",
      level: "Strategic",
      description: "Research collaboration for next-generation AI and automation technologies",
      services: ["Research & Development", "Talent Pipeline", "Innovation Labs"],
      status: "Active",
      since: "2020"
    }
  ];

  const partnershipBenefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      title: "Revenue Growth",
      description: "Joint go-to-market strategies and revenue sharing opportunities"
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Market Expansion",
      description: "Access to new markets and customer segments through partner networks"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "Capability Enhancement",
      description: "Expand service offerings and technical capabilities through collaboration"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Talent Exchange",
      description: "Knowledge sharing and talent development across partner organizations"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Strategic': return 'bg-primary text-primary-foreground';
      case 'Preferred': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/20 text-success border-success/30';
      case 'Pending': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Handshake className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gradient-primary mb-6">HANU Partnerships</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Building strategic alliances to deliver exceptional value and drive innovation together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary" size="lg" asChild>
                <Link to="/partnerships/apply">
                  <Handshake className="w-5 h-5 mr-2" />
                  Become a Partner
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/partnerships/directory">View Partner Directory</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Partnership Types */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Partnership Opportunities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore different ways to collaborate with HANU and create mutual value
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {partnershipTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 glass h-full group hover:glass-strong transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-lg`} />
                <div className="relative z-10">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      {type.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <Badge variant="secondary">{type.count}</Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Partners</h2>
            <Button variant="outline" asChild>
              <Link to="/partnerships/directory">View All Partners</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className="p-6 glass hover:glass-strong transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">Partner since {partner.since}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getLevelColor(partner.level)}>{partner.level}</Badge>
                      <Badge variant="outline" className={getStatusColor(partner.status)}>
                        {partner.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{partner.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-foreground">Services:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {partner.services.map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Partnership Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <Card className="p-6 glass text-center h-full">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <Card className="p-12 glass text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <Handshake className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Partner with HANU?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our ecosystem of innovative partners and unlock new opportunities for growth and collaboration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary" size="lg" asChild>
                <Link to="/partnerships/apply">Start Partnership Application</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HanuPartnerships;