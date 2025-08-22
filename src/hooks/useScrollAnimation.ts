import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useScrollAnimation = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll with enhanced performance
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Montfort-style easing
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const initImmersiveScroll = () => {
      const sections = document.querySelectorAll('section');
      
      // Enhanced Globe-to-Map Transition with 3D morphing
      const initGlobeTransition = () => {
        const globeElement = document.getElementById('transition-globe');
        const heroSection = document.querySelector('section:first-child');
        const clientsSection = document.getElementById('clients');
        const clientsBg = document.getElementById('clients-bg');
        const clientsOverlay = document.getElementById('clients-overlay');
        const globeReceiver = document.getElementById('globe-receiver');
        
        if (globeElement && heroSection && clientsSection && clientsBg && clientsOverlay && globeReceiver) {
          // Create complex timeline for immersive transition
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: clientsSection,
              start: "top 100%",
              end: "top 0%",
              scrub: 1.5,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;
                
                // Complex globe morphing with 3D perspective
                gsap.set(globeElement, {
                  scale: 1 + (progress * 12), // More dramatic scaling
                  rotationY: progress * 180,
                  rotationX: progress * 90,
                  z: progress * 300,
                  opacity: Math.max(0, 1 - (progress * 1.2)),
                  filter: `blur(${progress * 20}px) brightness(${1 + progress * 0.5})`
                });
                
                // Hero section morphing
                gsap.set(heroSection, {
                  scale: 1 + (progress * 0.3),
                  rotationX: progress * -15,
                  z: progress * -200,
                  opacity: 1 - (progress * 0.8)
                });
                
                // Globe receiver with advanced morphing
                gsap.set(globeReceiver, {
                  opacity: progress * 0.9,
                  scale: 0.5 + (progress * 0.8),
                  rotationZ: progress * 360,
                  filter: `blur(${(1 - progress) * 10}px)`
                });
                
                // Clients background with cinematic reveal
                gsap.set(clientsBg, {
                  opacity: Math.min(1, progress * 1.3),
                  scale: 1.2 - (progress * 0.1),
                  rotationY: (1 - progress) * 20,
                  z: (1 - progress) * -100,
                  filter: `blur(${(1 - progress) * 5}px) saturate(${0.8 + progress * 0.4})`
                });
                
                // Dynamic overlay with color transition
                gsap.set(clientsOverlay, {
                  opacity: 0.4 + (progress * 0.4),
                  background: `linear-gradient(45deg, 
                    rgba(0,0,0,${0.7 + progress * 0.2}) 0%, 
                    rgba(59,130,246,${progress * 0.1}) 50%, 
                    rgba(0,0,0,${0.7 + progress * 0.2}) 100%)`
                });
              }
            }
          });
        }
      };
      
      // Section-to-Section Visual Bridges (Subtle)
      const initSectionBridges = () => {
        const sectionPairs = [
          { from: 'clients', to: 'talent' },
          { from: 'talent', to: 'academy' },
          { from: 'academy', to: 'partnerships' },
          { from: 'partnerships', to: 'solutions' }
        ];
        
        sectionPairs.forEach(({ from, to }) => {
          const fromSection = document.getElementById(from);
          const toSection = document.getElementById(to);
          
          if (fromSection && toSection) {
            ScrollTrigger.create({
              trigger: toSection,
              start: "top 80%",
              end: "top 20%",
              scrub: 2,
              onUpdate: (self) => {
                const progress = self.progress;
                
                // Subtle background transitions only
                const fromBg = fromSection.querySelector('[style*="backgroundImage"]');
                const toBg = toSection.querySelector('[style*="backgroundImage"]');
                
                if (fromBg && toBg) {
                  gsap.set(fromBg, {
                    opacity: 1 - (progress * 0.2),
                    scale: 1 + (progress * 0.02)
                  });
                  
                  gsap.set(toBg, {
                    opacity: 0.8 + (progress * 0.2),
                    scale: 1.02 - (progress * 0.02)
                  });
                }
              }
            });
          }
        });
      };
      
      // Multi-Layer Parallax System (Subtle)
      const initAdvancedParallax = () => {
        // Only apply to sections with parallax-bg class
        const parallaxSections = document.querySelectorAll('.parallax-bg');
        
        parallaxSections.forEach((section, index) => {
          const bgElement = section.querySelector('[style*="backgroundImage"]');
          const overlay = section.querySelector('.absolute.inset-0:nth-child(2)');
          
          if (bgElement) {
            // Subtle background parallax only
            gsap.fromTo(bgElement, {
              yPercent: -5,
              scale: 1.05
            }, {
              yPercent: 5,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
              }
            });
          }
          
          if (overlay) {
            // Subtle overlay changes
            gsap.fromTo(overlay, {
              opacity: 0.6
            }, {
              opacity: 0.8,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            });
          }
        });
      };
      
      // Cinematic Section Reveals (Calmer)
      const initCinematicReveals = () => {
        sections.forEach((section, index) => {
          const heading = section.querySelector('h1, h2');
          const subtext = section.querySelector('p');
          
          // Simple reveal animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          });
          
          // Heading reveal - simpler
          if (heading) {
            tl.fromTo(heading, {
              opacity: 0,
              y: 30
            }, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            });
          }
          
          // Subtext reveal - simpler
          if (subtext) {
            tl.fromTo(subtext, {
              opacity: 0,
              y: 20
            }, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            }, "-=0.5");
          }
        });
      };
      
      // Atmospheric Effects System (Minimal)
      const initAtmosphericEffects = () => {
        // Reduce particle count and intensity
        const parallaxSections = document.querySelectorAll('.parallax-bg');
        
        parallaxSections.forEach((section, index) => {
          const particleCount = 5; // Reduced from 20
          const particles = [];
          
          for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-0.5 h-0.5 bg-primary/10 rounded-full pointer-events-none';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            section.appendChild(particle);
            particles.push(particle);
            
            // Gentle particle animation
            gsap.to(particle, {
              x: `${Math.random() * 50 - 25}px`,
              y: `${Math.random() * 50 - 25}px`,
              opacity: Math.random() * 0.3,
              scale: Math.random() * 1.5 + 0.5,
              duration: Math.random() * 20 + 10,
              ease: "none",
              repeat: -1,
              yoyo: true,
              delay: Math.random() * 5
            });
          }
        });
      };
      
      // Enhanced Navigation with Smooth Scrolling
      const initSmoothNavigation = () => {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href')?.slice(1);
            
            if (targetId) {
              const target = document.getElementById(targetId);
              if (target) {
                // Smooth scroll with easing
                lenis.scrollTo(target, {
                  duration: 2.5,
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  onComplete: () => {
                    // Add arrival animation
                    gsap.fromTo(target, {
                      scale: 1.02,
                      opacity: 0.8
                    }, {
                      scale: 1,
                      opacity: 1,
                      duration: 0.8,
                      ease: "power2.out"
                    });
                  }
                });
              }
            }
          });
        });
      };
      
      // Initialize all systems
      setTimeout(() => {
        initGlobeTransition();
        initSectionBridges();
        initAdvancedParallax();
        initCinematicReveals();
        initAtmosphericEffects();
        initSmoothNavigation();
      }, 100);
    };

    // Initialize immersive scroll system
    initImmersiveScroll();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, []);
};