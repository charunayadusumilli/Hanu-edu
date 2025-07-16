import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export const useScrollAnimation = () => {
  useEffect(() => {
    // Initialize smooth scrolling and parallax effects
    const initSmoothScroll = () => {
      // Enhanced section reveals with staggered animations
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section, index) => {
        // Section fade-in animation
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Content animation within sections
        const content = section.querySelector('h2, .section-content');
        if (content) {
          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: 60,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              delay: 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Enhanced parallax effect for background images
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        const bgImage = element.querySelector('div');
        if (bgImage) {
          gsap.to(bgImage, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      // Smooth navigation highlight
      const navLinks = document.querySelectorAll('nav a[href^="#"]');
      navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href')?.substring(1);
          const targetElement = document.getElementById(targetId || '');
          
          if (targetElement) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: {
                y: targetElement,
                offsetY: 0,
              },
              ease: 'power2.inOut',
            });
          }
        });
      });

      // Add scroll-based scaling effect
      const scalingElements = document.querySelectorAll('.scale-on-scroll');
      scalingElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Add floating elements animation
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 3 + (index * 0.5),
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    };

    // Initialize after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSmoothScroll);
    } else {
      initSmoothScroll();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};