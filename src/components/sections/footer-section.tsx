import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ExternalLink } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="container mx-auto px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img src="/logo-white.svg" alt="Hanu Edu" className="h-14 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              World-class AI education and technology training. Empowering the next generation of innovators with corporate-grade curriculums and expert-led mentorship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Academy Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">The Academy</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/academy/catalog" className="hover:text-primary transition-colors flex items-center group">
                  Course Catalog
                  <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/enroll" className="hover:text-primary transition-colors">Join Community</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Mentorship Program</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Research Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">AI Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors flex items-center">
                  Consulting Services <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary mt-0.5" />
                <span>contact@hanu-consulting.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary mt-0.5" />
                <span>+1 855-522-5499</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                <span>Executive Center, Suite 400<br />San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Global Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs">
            © {new Date().getFullYear()} Hanu Academy. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-semibold">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Internal component for arrows
const ArrowRight = ({ className }: { className: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);