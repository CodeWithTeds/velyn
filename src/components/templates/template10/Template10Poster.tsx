import { useEffect, useRef } from 'react';
import type { PointerEventHandler } from 'react';
import rough from 'roughjs';
import type { ImageTransform } from './imageTransform';
import { defaultImageTransform } from './imageTransform';

type Template10PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  // Dynamic fields
  username?: string;
  handle?: string;
  count?: string;
  headline?: string;
  subheadline?: string;
  paragraph?: string;
  handwrittenText?: string;
  designCredit?: string;
  hashtag?: string;
  profileImage?: string;
};

export function Template10Poster({
  imageSrc = '/images/velyn.png',
  profileImage = '/images/velyn.png',
  imageTransform = { ...defaultImageTransform, scale: 130, y: 5 },
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
  username = 'Velyn',
  handle = '@velyn',
  count = '43/365',
  headline = 'Hello Everyone.',
  paragraph = 'A curated collection of typographic stories and creative layouts.',
  handwrittenText = 'Love this',
  designCredit = 'Velyn Design',
  hashtag = '#velyn #aesthetic',
}: Template10PosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&family=Satisfy&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Rough.js Drawing for subtle sketchy details
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, rect.width, rect.height);

        const rc = rough.canvas(canvas);
        const w = rect.width;
        const h = rect.height;
      }
    }
  }, [count, compact]);

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-[#fafaf9] text-slate-900 font-['Outfit'] ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Background Grid - User liked this */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
          backgroundSize: compact ? '20px 20px' : '40px 40px'
        }}
      />

      {/* Top Section - Minimalist */}
      <div className={`absolute ${compact ? 'top-[4%] px-[6%] text-[4px]' : 'top-[5%] px-[10%] text-[10px]'} left-0 right-0 z-20 flex justify-between font-bold text-slate-400 uppercase tracking-[0.2em]`}>
        <div className="flex items-center gap-2">
          <div className={`${compact ? 'w-1 h-1' : 'w-2 h-2'} rounded-full bg-slate-900`} />
          <span>Velyn Social</span>
        </div>
      </div>

      {/* Large Minimal Background Headline */}
      <div className={`absolute ${compact ? 'top-[12%] left-[-5%]' : 'top-[15%] left-[-2%]'} z-0 select-none pointer-events-none`}>
        <h1 className={`font-black tracking-tighter leading-none text-slate-100 uppercase ${compact ? 'text-[60px]' : 'text-[160px]'}`}>
          {headline.split(' ')[0]}
        </h1>
      </div>

      {/* Floating Meta Info - Inside card for compact, outside for full */}
      <div className={`absolute ${compact ? 'top-[13.2%] right-[11.5%] text-[5px]' : 'top-[15.5%] right-[10%] text-[14px]'} z-20 font-black text-slate-900`}>
        {count}
      </div>

      {/* Hero Instagram Card - Cleaner, Floating */}
      <div className={`absolute ${compact ? 'left-[8%] right-[8%] top-[16%] bottom-[28%]' : 'left-[10%] right-[10%] top-[18%] bottom-[25%]'} z-10`}>
        <div className={`relative h-full w-full bg-white/80 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 flex flex-col overflow-hidden`}>

          {/* Header */}
          <div className={`${compact ? 'px-3 py-2' : 'px-6 py-5'} flex items-center justify-between`}>
            <div className="flex items-center gap-2.5">
              <div className={`${compact ? 'w-5 h-5' : 'w-11 h-11'} rounded-full bg-slate-100 p-0.5`}>
                <img src={profileImage} className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold tracking-tight text-slate-900 ${compact ? 'text-[6px]' : 'text-sm'}`}>{username}</span>
                <span className={`text-slate-400 font-medium ${compact ? 'text-[4px]' : 'text-[10px]'}`}>Verified</span>
              </div>
            </div>
            <div className={`flex ${compact ? 'gap-0.5' : 'gap-1'} items-center`}>
              <div className={`${compact ? 'w-0.5 h-0.5' : 'w-1 h-1'} rounded-full bg-slate-300`} />
              <div className={`${compact ? 'w-0.5 h-0.5' : 'w-1 h-1'} rounded-full bg-slate-300`} />
              <div className={`${compact ? 'w-0.5 h-0.5' : 'w-1 h-1'} rounded-full bg-slate-300`} />
            </div>
          </div>

          {/* Image Content */}
          <div className={`flex-1 relative ${compact ? 'mx-3 mb-1' : 'mx-6 mb-2'} overflow-hidden bg-slate-50`}>
            <img
              src={imageSrc}
              alt="Subject"
              className="w-full h-full object-contain p-2"
              style={{
                filter: `drop-shadow(0 0 0 ${compact ? '2px' : '12px'} white) drop-shadow(0 ${compact ? '4px 8px' : '20px 40px'} rgba(0,0,0,0.08))`,
                transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
                transformOrigin: 'center center',
              }}
              draggable={false}
            />
          </div>

          {/* Interactions - Minimalist */}
          <div className={`${compact ? 'px-4 py-3' : 'px-8 py-6'} flex items-center justify-between`}>
            <div className={`flex items-center ${compact ? 'gap-3' : 'gap-6'}`}>
              <svg className={`${compact ? 'w-2.5 h-2.5' : 'w-6 h-6'} text-red-500 fill-current transition-colors`} viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              <svg className={`${compact ? 'w-2.5 h-2.5' : 'w-5 h-5'} text-slate-900 fill-current`} viewBox="0 0 122.97 122.88"><path d="M61.44,0a61.46,61.46,0,0,1,54.91,89l6.44,25.74a5.83,5.83,0,0,1-7.25,7L91.62,115A61.43,61.43,0,1,1,61.44,0ZM96.63,26.25a49.78,49.78,0,1,0-9,77.52A5.83,5.83,0,0,1,92.4,103L109,107.77l-4.5-18a5.86,5.86,0,0,1,.51-4.34,49.06,49.06,0,0,0,4.62-11.58,50,50,0,0,0-13-47.62Z" /></svg>
              <svg className={`${compact ? 'w-2.5 h-2.5' : 'w-6 h-6'} text-slate-900 rotate-12`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </div>
            <span className={`font-['Satisfy'] text-slate-400 ${compact ? 'text-[6px]' : 'text-lg'}`}>{handwrittenText}</span>
            <svg className={`${compact ? 'w-2.5 h-2.5' : 'w-6 h-6'} text-slate-900`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </div>
        </div>
      </div>

      {/* Bottom Section - Clean Typography */}
      <div className={`absolute ${compact ? 'bottom-[6%] left-[6%] right-[6%]' : 'bottom-[8%] left-[10%] right-[10%]'} z-20 flex flex-col gap-4 pointer-events-none`}>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="mb-2">
              <span className={`text-slate-900 font-black uppercase tracking-[0.2em] border-b ${compact ? 'text-[3px] border-slate-900/40' : 'text-[10px] border-slate-900'} pb-0.5`}>
                {designCredit}
              </span>
            </div>
            <h2 className={`font-black tracking-tighter leading-[0.85] text-slate-900 uppercase ${compact ? 'text-[11px]' : 'text-[32px]'}`}>
              {headline.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
          </div>

          <div className="flex flex-col items-end">
            <p className={`font-medium text-slate-400 leading-relaxed text-right ${compact ? 'text-[3px] max-w-[70px]' : 'text-[11px] max-w-[240px]'}`}>
              {paragraph}
            </p>
            <span className={`font-bold tracking-widest text-slate-900 uppercase mt-2 ${compact ? 'text-[3.5px]' : 'text-[10px]'}`}>
              {hashtag}
            </span>
          </div>
        </div>
      </div>

      {/* Canvas Overlay for Sketchy Elements */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />
    </div>
  );
}
