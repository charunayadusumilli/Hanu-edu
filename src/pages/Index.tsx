import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { ClientsSection } from '@/components/sections/clients-section';
import { TalentSection } from '@/components/sections/talent-section';
import { AcademySection } from '@/components/sections/academy-section';
import { PartnershipsSection } from '@/components/sections/partnerships-section';
import { SolutionsSection } from '@/components/sections/solutions-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CtaSection } from '@/components/sections/cta-section';
import { FooterSection } from '@/components/sections/footer-section';
import { AIAssistant } from '@/components/ai/ai-assistant';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ClientsSection />
        <TalentSection />
        <AcademySection />
        <PartnershipsSection />
        <SolutionsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <FooterSection />
      <AIAssistant variant="floating" />
    </div>
  );
};

export default Index;
