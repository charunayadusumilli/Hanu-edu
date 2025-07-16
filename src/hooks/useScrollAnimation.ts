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
      
      // Globe-to-Map Transition Animation
      const initGlobeTransition = () => {
        const globeElement = document.getElementById('transition-globe');
        const clientsSection = document.getElementById('clients');
        const clientsBg = document.getElementById('clients-bg');
        const clientsOverlay = document.getElementById('clients-overlay');
        const globeReceiver = document.getElementById('globe-receiver');
        
        if (globeElement && clientsSection && clientsBg && clientsOverlay && globeReceiver) {
          // Create ScrollTrigger for globe transition
          ScrollTrigger.create({
            trigger: clientsSection,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              
              // Globe scaling and positioning
              gsap.set(globeElement, {
                scale: 1 + (progress * 8),
                opacity: 1 - (progress * 0.3)
              });
              
              // Globe receiver animation
              gsap.set(globeReceiver, {
                opacity: progress * 0.8
              });
              
              // Clients background fade-in
              gsap.set(clientsBg, {
                opacity: progress,
                scale: 1.1 - (progress * 0.05)
              });
              
              // Overlay transition
              gsap.set(clientsOverlay, {
                opacity: 0.7 + (progress * 0.3)
              });
            },
            onToggle: (self) => {
              if (self.isActive && self.progress === 1) {
                // Clean up globe element after transition
                gsap.to(globeElement, {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.out"
                });
                
                // Ensure clients section is fully visible
                gsap.to(clientsBg, {
                  opacity: 1,
                  scale: 1.1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            }
          });
        }
      };
      
      // Initialize globe transition
      setTimeout(initGlobeTransition, 100);
      
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