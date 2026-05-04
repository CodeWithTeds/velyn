import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DevelopersSection } from './components/DevelopersSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { TemplatesSection } from './components/TemplatesSection';
import { TemplateModal } from './components/TemplateModal';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (template: any) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
                start: 'top 72%',
                toggleActions: 'play none none reverse',
              },
            });
          });

          ScrollTrigger.refresh();
        }, container)
      : undefined;

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx?.revert();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="app-container flex min-h-screen w-full flex-col bg-white text-ink antialiased"
    >
      <Navbar scrolled={scrolled} onNavigate={scrollToSection} />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection onOpenModal={handleOpenModal} />
      <DevelopersSection />
      <Footer />
      
      <TemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={selectedTemplate}
      />
    </div>
  );
}

export default App;
