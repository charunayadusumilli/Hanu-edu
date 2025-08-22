import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-space-grotesk font-bold text-gradient-primary">
              Hanu Consulting
            </h3>
            <p className="text-muted-foreground text-sm">
              AI-powered business transformation through expert consulting services.
              Connect with top-tier consultants and unlock your company's potential.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <div className="space-y-2 text-sm">
              <Link to="/solutions" className="block text-muted-foreground hover:text-primary transition-colors">
                Solutions & Cases
              </Link>
              <Link to="/experts" className="block text-muted-foreground hover:text-primary transition-colors">
                Expert Directory
              </Link>
              <div className="text-muted-foreground">AI Strategy</div>
              <div className="text-muted-foreground">Digital Transformation</div>
              <div className="text-muted-foreground">Process Optimization</div>
            </div>
          </div>

          {/* For Clients */}
          <div className="space-y-4">
            <h4 className="font-semibold">For Clients</h4>
            <div className="space-y-2 text-sm">
              <Link to="/clients" className="block text-muted-foreground hover:text-primary transition-colors">
                Submit Challenge
              </Link>
              <Link to="/projects" className="block text-muted-foreground hover:text-primary transition-colors">
                Track Projects
              </Link>
              <div className="text-muted-foreground">Case Studies</div>
              <div className="text-muted-foreground">Success Stories</div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                hello@hanuconsulting.com
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div>© 2024 Hanu Consulting. All rights reserved.</div>
            <div className="text-xs opacity-70">
              Build: {new Date().toISOString().split('T')[0]}-{Math.floor(Date.now() / 1000).toString(36)}
            </div>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
            <Link to="/domain-diagnostics" className="hover:text-primary transition-colors">Domain Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}