import React from 'react';
import { Navigation } from '@/components/ui/navigation';
import { EduHeroSection } from '@/components/sections/edu-hero-section';
import { EduCoursesSection } from '@/components/sections/edu-courses-section';
import { FooterSection } from '@/components/sections/footer-section';
import { AIAssistant } from '@/components/ai/ai-assistant';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HanuEdu = () => {
    // Initialize scroll animations
    useScrollAnimation();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main>
                <EduHeroSection />
                <EduCoursesSection />
                {/* Additional sections can be added here like Testimonials, FAQ, etc. */}
            </main>
            <FooterSection />
            <AIAssistant variant="floating" />
        </div>
    );
};

export default HanuEdu;
