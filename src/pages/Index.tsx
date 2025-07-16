import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { EnergySection } from '@/components/sections/energy-section';
import { MaritimeSection } from '@/components/sections/maritime-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FooterSection } from '@/components/sections/footer-section';
import { AIAssistant } from '@/components/ai/ai-assistant';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <EnergySection />
        <MaritimeSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <FooterSection />
      <AIAssistant variant="floating" />
    </div>
  );
};

export default Index;
