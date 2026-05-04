import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DevelopersSection } from './components/DevelopersSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { TemplatesSection } from './components/TemplatesSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollLeft > 20);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.22;
        ScrollTrigger.update();
      }
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = !prefersReducedMotion
      ? gsap.context(() => {
          gsap.from('.hero-left', {
            opacity: 0,
            x: -72,
            duration: 1.15,
            ease: 'power3.out',
          });

          gsap.from('.hero-badge, .hero-logo-wrapper, .hero-title, .hero-subtitle, .hero-cta', {
            opacity: 0,
            y: 34,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            delay: 0.15,
          });

          gsap.utils.toArray<HTMLElement>('.section, .footer').forEach((panel) => {
            const revealTargets = panel.querySelectorAll(
              '.section-header, .bento-card, .preview-card, .footer-brand, .footer-col, .footer-bottom',
            );

            if (!revealTargets.length) return;

            gsap.from(revealTargets, {
              opacity: 0,
              y: 42,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: {
                trigger: panel,
                scroller: container,
                horizontal: true,
                start: 'left 72%',
                toggleActions: 'play none none reverse',
              },
            });
          });

          ScrollTrigger.refresh();
        }, container)
      : undefined;

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      ctx?.revert();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    const container = containerRef.current;
    if (section && container) {
      gsap.killTweensOf(container);
      gsap.to(container, {
        scrollLeft: section.offsetLeft,
        duration: 1.25,
        ease: 'power4.inOut',
        onUpdate: () => ScrollTrigger.update(),
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="app-container no-scrollbar flex h-screen w-screen snap-x snap-mandatory flex-row overflow-x-auto overflow-y-hidden scroll-smooth bg-white text-ink antialiased"
    >
      <Navbar scrolled={scrolled} onNavigate={scrollToSection} />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <DevelopersSection />
      <Footer />
    </div>
  );
}

export default App;
