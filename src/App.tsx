'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DevelopersSection } from '@/components/DevelopersSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { MemorySection } from '@/components/MemorySection';
import { Navbar } from '@/components/Navbar';
import { TemplatesSection } from '@/components/TemplatesSection';
import { TemplateModal } from '@/components/TemplateModal';
import {
  Template1EditorPage,
  Template2EditorPage,
  Template3EditorPage,
  Template4EditorPage,
  Template5EditorPage,
  Template6EditorPage,
  Template7EditorPage,
  Template8EditorPage,
  Template9EditorPage,
  Template10EditorPage,
  template10
} from '@/components/templates/personal';
import { food1, Food1EditorPage, food2, Food2EditorPage, food3, Food3EditorPage, food4, Food4EditorPage, food5, Food5EditorPage } from '@/components/templates/food';
import type { Template } from '@/types/template';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setIsModalOpen(false);
    window.scrollTo({ top: 0 });
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

  if (editingTemplate?.kind === 'portrait-poster') {
    if (editingTemplate.id === 0) return <Template1EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 1) return <Template2EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 2) return <Template3EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 3) return <Template4EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 4) return <Template5EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 5) return <Template6EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 6) return <Template7EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 7) return <Template8EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 8) return <Template9EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 10) return <Template10EditorPage onBack={() => setEditingTemplate(null)} />;
  }

  if (editingTemplate?.kind === 'food-poster') {
    if (editingTemplate.id === 11) return <Food1EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 12) return <Food2EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 13) return <Food3EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 14) return <Food4EditorPage onBack={() => setEditingTemplate(null)} />;
    if (editingTemplate.id === 15) return <Food5EditorPage onBack={() => setEditingTemplate(null)} />;
  }

  return (
    <div
      ref={containerRef}
      className="app-container flex min-h-screen w-full flex-col bg-white text-ink antialiased"
    >
      <Navbar scrolled={scrolled} onNavigate={scrollToSection} />
      <HeroSection />
      <FeaturesSection />
      <MemorySection />
      <TemplatesSection onOpenModal={handleOpenModal} />
      <DevelopersSection />
      <Footer />

      <TemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEditTemplate={handleEditTemplate}
        template={selectedTemplate}
      />
    </div>
  );
}

export default App;
