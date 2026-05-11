import type { Template } from '../types/template';
import {
  Template1Poster,
  Template2Poster,
  Template3Poster,
  Template4Poster,
  Template5Poster,
  Template6Poster,
  Template7Poster,
  Template8Poster,
  Template9Poster,
  Template10Poster
} from './templates/personal';

type TemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onEditTemplate: (template: Template) => void;
  template: Template | null;
};

export function TemplateModal({ isOpen, onClose, onEditTemplate, template }: TemplateModalProps) {
  if (!isOpen || !template) return null;

  const handleEdit = () => {
    onEditTemplate(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${
          template.kind === 'portrait-poster' ? 'max-w-4xl bg-slate-100 md:h-[86vh]' : 'max-w-5xl md:h-[600px]'
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-ink backdrop-blur-md transition-all hover:bg-ink hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {template.kind === 'portrait-poster' ? (
          <div className="flex h-full flex-col items-center justify-center bg-slate-100 p-5">
            <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 shadow-inner sm:p-4">
              {template.id === 0 ? (
                <Template1Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 1 ? (
                <Template2Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 2 ? (
                <Template3Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 3 ? (
                <Template4Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 4 ? (
                <Template5Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 5 ? (
                <Template6Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 6 ? (
                <Template7Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 7 ? (
                <Template8Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 8 ? (
                <Template9Poster photoSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : template.id === 10 ? (
                <Template10Poster imageSrc={template.image} className="h-full w-auto max-w-full aspect-[9/16]" />
              ) : null}
            </div>
            <div className="flex w-full items-center justify-between gap-3 pt-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                1080 x 1920 Preview
              </span>
              <button
                onClick={handleEdit}
                className="rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-600"
              >
                Edit
              </button>
            </div>
          </div>
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
            <div className="flex flex-1 flex-col">
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
