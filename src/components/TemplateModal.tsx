import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { Template } from '../types/template';
import { Template1Editor } from './templates/template1';

type TemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
};

export function TemplateModal({ isOpen, onClose, template }: TemplateModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;

        const tl = gsap.timeline();
        tl.to(backdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(contentRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.1');
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !template) return null;

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });
    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })
    .to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    }, '-=0.1');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className={`relative w-full overflow-hidden rounded-2xl bg-white opacity-0 shadow-2xl transition-opacity duration-300 ${
          template.kind === 'portrait-poster' ? 'max-w-6xl md:h-[82vh]' : 'max-w-5xl md:h-[600px]'
        }`}
      >
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-ink backdrop-blur-md transition-all hover:bg-ink hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {template.kind === 'portrait-poster' ? (
          <Template1Editor defaultImage={template.image} />
        ) : (
        <div className="flex h-full flex-col md:flex-row">
          {/* Image Side */}
          <div className="h-64 md:h-full md:w-3/5">
            <img 
              src={template.image} 
              alt={template.title} 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Info Side */}
          <div className="flex flex-1 flex-col p-8 md:w-2/5">
            <div 
              ref={scrollRef}
              className="flex flex-1 flex-col"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Template Preview</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{template.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {template.description}
                <br /><br />
                This layout is optimized for high-end creative portfolios, ensuring your work remains the center of attention.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-ink">Fully Responsive</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-ink">GSAP Animations Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-ink">Ready to Export</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-border-soft">
              <button className="w-full rounded-xl bg-ink py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-black hover:shadow-xl active:scale-[0.98]">
                Apply this layout
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
