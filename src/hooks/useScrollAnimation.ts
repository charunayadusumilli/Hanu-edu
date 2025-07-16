import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useScrollAnimation = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const initSmoothScroll = () => {
      // Initialize smooth scroll with enhanced performance
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        // Enhanced section fade in animation with better timing
        gsap.fromTo(section, 
          {
            opacity: 0,
            y: 100,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              markers: false
            }
          }
        );

        // Enhanced content animation with stagger
        const content = section.querySelector('.max-w-6xl, .max-w-4xl');
        if (content) {
          gsap.fromTo(content.children,
            {
              opacity: 0,
              y: 80,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: content,
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Enhanced parallax effect for background images
        const bgElement = section.querySelector('[style*="backgroundImage"]');
        if (bgElement) {
          gsap.fromTo(bgElement,
            {
              scale: 1.15,
              yPercent: -15
            },
            {
              scale: 1.05,
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
              }
            }
          );
        }
      });

      // Enhanced navigation smooth scroll with Lenis
      const navLinks = document.querySelectorAll('a[href^="#"]');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href')?.slice(1);
          if (targetId) {
            const target = document.getElementById(targetId);
            if (target) {
              lenis.scrollTo(target, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
              });
            }
          }
        });
      });

      // Enhanced scroll-based scaling effect
      gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
        gsap.fromTo(element,
          {
            scale: 1
          },
          {
            scale: 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8
            }
          }
        );
      });

      // Enhanced floating elements animation
      const floatingElements = document.querySelectorAll('.animate-pulse');
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -30,
          x: Math.sin(index) * 10,
          duration: 4 + index * 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });
      });

      // Add section transition effects
      sections.forEach((section, index) => {
        gsap.fromTo(section.querySelector('.absolute.inset-0:nth-child(2)'),
          {
            opacity: 0.5
          },
          {
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: 1
            }
          }
        );
      });
    };

    // Initialize animations
    initSmoothScroll();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, []);
};