import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Factory, Fuel } from 'lucide-react';
import energyBackground from '@/assets/energy-background.jpg';

export function EnergySection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-Screen Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={energyBackground} 
          alt="Energy Infrastructure" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            {/* Minimal Badge */}
            <div className="mb-12">
              <span className="inline-block px-6 py-2 text-sm font-medium tracking-widest uppercase text-primary/80 border border-primary/20 backdrop-blur-xl">
                Hello Clients
              </span>
            </div>

            {/* Montfort-Style Heading */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-light mb-12 leading-[0.8]">
              <span className="block text-foreground tracking-[0.12em] mb-4">
                A&nbsp;&nbsp;&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;&nbsp;V&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;G
              </span>
              <span className="block text-primary/90 font-extralight tracking-[0.15em]">
                I&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;V&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;N
              </span>
              <span className="block text-muted-foreground/80 font-extralight tracking-[0.18em] text-4xl md:text-5xl lg:text-6xl mt-8">
                i&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;r&nbsp;&nbsp;&nbsp;&nbsp;g&nbsp;&nbsp;&nbsp;&nbsp;y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;s&nbsp;&nbsp;&nbsp;&nbsp;t&nbsp;&nbsp;&nbsp;&nbsp;m&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;t&nbsp;&nbsp;&nbsp;&nbsp;s
              </span>
            </h2>

            {/* Minimal Description */}
            <p className="text-lg md:text-xl text-muted-foreground/60 mb-12 max-w-2xl leading-relaxed tracking-wide">
              Strategic consulting for energy infrastructure and oil trading success through midstream and downstream sector expansions.
            </p>

            {/* Action Button */}
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-base font-light tracking-wider transition-all duration-300"
              asChild
            >
              <Link to="/clients-hub">
                Submit Challenge
                <ArrowRight className="w-5 h-5 ml-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="text-2xl md:text-3xl font-space-grotesk font-light tracking-[0.1em] text-foreground/90 mb-16">
              T&nbsp;&nbsp;&nbsp;&nbsp;h&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;r&nbsp;&nbsp;&nbsp;&nbsp;g&nbsp;&nbsp;&nbsp;&nbsp;y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;d&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;a&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;t&nbsp;&nbsp;&nbsp;&nbsp;a&nbsp;&nbsp;&nbsp;&nbsp;g&nbsp;&nbsp;&nbsp;&nbsp;e
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-xl font-medium tracking-wide mb-4">Strategic Investments</h3>
                <p className="text-muted-foreground/70 leading-relaxed">
                  Portfolio management across refining, storage, and distribution sectors.
                </p>
              </div>

              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-xl font-medium tracking-wide mb-4">Leadership Excellence</h3>
                <p className="text-muted-foreground/70 leading-relaxed">
                  Driving growth and innovation through robust operating platforms.
                </p>
              </div>

              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-xl font-medium tracking-wide mb-4">Market Access</h3>
                <p className="text-muted-foreground/70 leading-relaxed">
                  Dynamic market positioning with competitive trading advantages.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}