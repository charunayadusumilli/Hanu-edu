import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  Heart, 
  Building, 
  TrendingUp, 
  Headphones, 
  Brain, 
  Shield, 
  ChevronRight,
  Star,
  Users,
  Zap,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HanuSolutions = () => {
  const solutionCategories = [
    {
      id: 'healthcare',
      title: 'Healthcare Solutions',
      icon: <Heart className="w-8 h-8" />,
      description: 'AI-powered healthcare management and patient care optimization'
    },
    {
      id: 'government',
      title: 'Government Services',
      icon: <Building className="w-8 h-8" />,
      description: 'Digital transformation solutions for public sector efficiency'
    },
    {
      id: 'business',
      title: 'Business Improvement',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Process optimization and operational excellence tools'
    },
    {
      id: 'contact-center',
      title: 'Contact Center',
      icon: <Headphones className="w-8 h-8" />,
      description: 'Advanced customer service and communication platforms'
    },
    {
      id: 'ai-tools',
      title: 'AI Tools',
      icon: <Brain className="w-8 h-8" />,
      description: 'Cutting-edge artificial intelligence and automation solutions'
    }
  ];

  const featuredProducts = {
    healthcare: [
      {
        name: "HealthStream AI",
        description: "Intelligent patient flow management and predictive analytics for healthcare facilities",
        features: ["Real-time patient tracking", "Predictive bed management", "Staff optimization", "Clinical decision support"],
        pricing: "Starting at $999/month",
        tier: "Professional",
        rating: 4.9,
        customers: 150
      },
      {
        name: "MedInsight Pro",
        description: "Advanced medical imaging analysis powered by deep learning algorithms",
        features: ["AI-powered diagnostics", "Image analysis", "Report generation", "Integration APIs"],
        pricing: "Starting at $1,999/month",
        tier: "Enterprise",
        rating: 4.8,
        customers: 85
      }
    ],
    government: [
      {
        name: "GovFlow Digital",
        description: "Comprehensive digital transformation platform for government agencies",
        features: ["Citizen portal", "Document automation", "Workflow management", "Analytics dashboard"],
        pricing: "Starting at $2,499/month",
        tier: "Government",
        rating: 4.7,
        customers: 45
      },
      {
        name: "PublicSafe Monitor",
        description: "Real-time monitoring and response system for public safety departments",
        features: ["Incident tracking", "Resource allocation", "Emergency response", "Data analytics"],
        pricing: "Starting at $1,799/month",
        tier: "Professional",
        rating: 4.8,
        customers: 32
      }
    ],
    business: [
      {
        name: "ProcessPro Optimizer",
        description: "Business process optimization and automation platform",
        features: ["Process mapping", "Automation workflows", "Performance metrics", "ROI tracking"],
        pricing: "Starting at $799/month",
        tier: "Business",
        rating: 4.6,
        customers: 320
      },
      {
        name: "OperationSync",
        description: "Integrated operations management and efficiency tracking system",
        features: ["Real-time monitoring", "Resource planning", "Cost optimization", "Team collaboration"],
        pricing: "Starting at $1,299/month",
        tier: "Professional",
        rating: 4.7,
        customers: 210
      }
    ],
    'contact-center': [
      {
        name: "ContactFlow AI",
        description: "Intelligent contact center platform with AI-powered customer insights",
        features: ["Omnichannel support", "AI chatbots", "Sentiment analysis", "Performance analytics"],
        pricing: "Starting at $599/month",
        tier: "Professional",
        rating: 4.8,
        customers: 180
      },
      {
        name: "VoiceIntel Pro",
        description: "Advanced voice analytics and call optimization solution",
        features: ["Voice recognition", "Call routing", "Quality scoring", "Training insights"],
        pricing: "Starting at $899/month",
        tier: "Enterprise",
        rating: 4.9,
        customers: 95
      }
    ],
    'ai-tools': [
      {
        name: "AutoFlow Intelligence",
        description: "No-code AI automation platform for business processes",
        features: ["Drag-drop automation", "ML model deployment", "API integration", "Custom workflows"],
        pricing: "Starting at $399/month",
        tier: "Starter",
        rating: 4.7,
        customers: 450
      },
      {
        name: "DataMind Analytics",
        description: "Advanced data analytics and machine learning platform",
        features: ["Predictive modeling", "Data visualization", "Real-time analytics", "Custom algorithms"],
        pricing: "Starting at $1,499/month",
        tier: "Enterprise",
        rating: 4.8,
        customers: 165
      }
    ]
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Enterprise': return 'bg-primary text-primary-foreground';
      case 'Professional': return 'bg-secondary text-secondary-foreground';
      case 'Government': return 'bg-info text-white';
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
            <Cpu className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gradient-primary mb-6">HANU Solutions</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your organization with our AI-powered solutions and innovative technology platforms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary" size="lg" asChild>
                <Link to="/solutions/demo">
                  <Zap className="w-5 h-5 mr-2" />
                  Request Demo
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/solutions/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Solutions by Category */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Solutions by Industry</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover tailored solutions designed for your specific industry needs
          </p>
        </motion.div>

        <Tabs defaultValue="healthcare" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 h-auto">
            {solutionCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex flex-col items-center p-4 h-auto">
                <div className="mb-2">{category.icon}</div>
                <span className="text-sm font-medium">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {solutionCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProducts[category.id as keyof typeof featuredProducts]?.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 glass hover:glass-strong transition-all duration-300 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">{product.name}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                        </div>
                        <Badge className={getTierColor(product.tier)}>{product.tier}</Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-2">Key Features:</h5>
                          <div className="grid grid-cols-1 gap-1">
                            {product.features.map((feature) => (
                              <div key={feature} className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="text-foreground">{product.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 text-muted-foreground mr-1" />
                              <span className="text-muted-foreground">{product.customers}+ customers</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-lg font-bold text-primary">{product.pricing}</span>
                          <Button size="sm" className="bg-gradient-primary" asChild>
                            <Link to={`/solutions/${category.id}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              Learn More
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Why Choose HANU Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose HANU Solutions?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 glass text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Tailored Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Customized implementations that fit your unique business requirements and workflows
              </p>
            </Card>
            
            <Card className="p-6 glass text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Rapid Deployment</h3>
              <p className="text-sm text-muted-foreground">
                Get up and running quickly with our streamlined implementation process and expert support
              </p>
            </Card>
            
            <Card className="p-6 glass text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">
                Bank-level security with compliance certifications and data protection guarantees
              </p>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <Card className="p-12 glass text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <Cpu className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Organization?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of organizations already using HANU Solutions to drive innovation and achieve better outcomes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary" size="lg" asChild>
                <Link to="/solutions/demo">Schedule a Demo</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Speak with an Expert</Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HanuSolutions;