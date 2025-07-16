import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Anchor, Ship, Compass } from 'lucide-react';
import maritimeBackground from '@/assets/maritime-background.jpg';

export function MaritimeSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-Screen Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={maritimeBackground} 
          alt="Maritime Operations" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="text-2xl md:text-3xl font-space-grotesk font-light tracking-[0.1em] text-foreground/90 mb-16">
              S&nbsp;&nbsp;&nbsp;&nbsp;h&nbsp;&nbsp;&nbsp;&nbsp;i&nbsp;&nbsp;&nbsp;&nbsp;p&nbsp;&nbsp;&nbsp;&nbsp;p&nbsp;&nbsp;&nbsp;&nbsp;i&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;g&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;c&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;l&nbsp;&nbsp;&nbsp;&nbsp;l&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;c&nbsp;&nbsp;&nbsp;&nbsp;e
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-xl font-medium tracking-wide mb-4">Infrastructure Investments</h3>
                <p className="text-muted-foreground/70 leading-relaxed">
                  Strategic assets across maritime operations with ESG compliance.
                </p>
              </div>

              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-xl font-medium tracking-wide mb-4">Shipping Services</h3>
                <p className="text-muted-foreground/70 leading-relaxed">
                  Third-party access to specialized freight trading capabilities.
                </p>
              </div>

              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-xl font-medium tracking-wide mb-4">Risk Management</h3>
                <p className="text-muted-foreground/70 leading-relaxed">
                  Advanced instruments and forward freight agreements.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-right"
          >
            {/* Minimal Badge */}
            <div className="mb-12 flex justify-end">
              <span className="inline-block px-6 py-2 text-sm font-medium tracking-widest uppercase text-primary/80 border border-primary/20 backdrop-blur-xl">
                For Talent
              </span>
            </div>

            {/* Montfort-Style Heading */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-light mb-12 leading-[0.8]">
              <span className="block text-foreground tracking-[0.12em] mb-4">
                P&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;W&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;R&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;&nbsp;G
              </span>
              <span className="block text-primary/90 font-extralight tracking-[0.15em]">
                P&nbsp;&nbsp;&nbsp;&nbsp;R&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;G&nbsp;&nbsp;&nbsp;&nbsp;R&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;S
              </span>
              <span className="block text-muted-foreground/80 font-extralight tracking-[0.18em] text-4xl md:text-5xl lg:text-6xl mt-8">
                D&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;l&nbsp;&nbsp;&nbsp;&nbsp;i&nbsp;&nbsp;&nbsp;&nbsp;v&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;r&nbsp;&nbsp;&nbsp;&nbsp;i&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;g&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;&nbsp;&nbsp;&nbsp;r&nbsp;&nbsp;&nbsp;&nbsp;g&nbsp;&nbsp;&nbsp;&nbsp;y
              </span>
            </h2>

            {/* Minimal Description */}
            <p className="text-lg md:text-xl text-muted-foreground/60 mb-12 max-w-2xl ml-auto leading-relaxed tracking-wide">
              Diversified maritime investments from dry to wet shipping, leveraging trading expertise for significant value generation.
            </p>

            {/* Action Button */}
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-base font-light tracking-wider transition-all duration-300"
              asChild
            >
              <Link to="/talent-hub">
                Join Network
                <ArrowRight className="w-5 h-5 ml-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}