import type { PointerEventHandler } from 'react';
import type { ImageTransform } from './imageTransform';
import { defaultImageTransform } from './imageTransform';

type Template7PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

export function Template7Poster({
  imageSrc = '/images/velyn.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template7PosterProps) {
  // Set box dimensions
  const boxWidth = compact ? 70 : 80;
  const boxHeight = compact ? 12 : 15;
  const boxTop = 32;

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-zinc-950 text-white ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Sharp base image */}
      <img
        src={imageSrc}
        alt="Sharp Subject"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{
          filter: `contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%) grayscale(0.2) saturate(1.2)`,
          transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
          transformOrigin: 'center center',
        }}
        draggable={false}
      />

      {/* Blurred overlay image with mask hole */}
      <div
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
        style={{
          clipPath: `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${50 - boxWidth / 2}% ${boxTop - boxHeight / 2}%, ${50 + boxWidth / 2}% ${boxTop - boxHeight / 2}%, ${50 + boxWidth / 2}% ${boxTop + boxHeight / 2}%, ${50 - boxWidth / 2}% ${boxTop + boxHeight / 2}%, ${50 - boxWidth / 2}% ${boxTop - boxHeight / 2}%)`
        }}
      >
        <img
          src={imageSrc}
          alt="Blurred Subject"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: `blur(12px) contrast(90%) brightness(80%) grayscale(0.3)`,
            transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
            transformOrigin: 'center center',
            opacity: 0.9,
          }}
          draggable={false}
        />
        {/* Grain texture on the blurred part */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Selection box UI */}
      <div
        className="absolute left-1/2 z-20 pointer-events-none"
        style={{
          top: `${boxTop}%`,
          width: `${boxWidth}%`,
          height: `${boxHeight}%`,
          transform: `translate(-50%, -50%)`, // ✅ single transform — centers both axes correctly
        }}
      >
        {/* Main border */}
        <div className="relative h-full w-full border border-white/40">
          {/* Focus corner marks — inset from border */}
          <div className="absolute left-2 top-2 h-4 w-4 border-l border-t border-white" />
          <div className="absolute right-2 top-2 h-4 w-4 border-r border-t border-white" />
          <div className="absolute left-2 bottom-2 h-4 w-4 border-l border-b border-white" />
          <div className="absolute right-2 bottom-2 h-4 w-4 border-r border-b border-white" />
        </div>
      </div>

      {/* Typography and content */}

      {/* Top header */}
      <div className="absolute left-8 top-12 z-30">
        <h2 className={`font-black tracking-tight ${compact ? 'text-2xl' : 'text-5xl'}`}>
          Pro<span className="font-light italic opacity-80">file</span>
        </h2>
      </div>

      {/* Sidebar text */}
      <div className={`absolute right-8 top-[45%] z-30 max-w-[120px] text-right font-medium uppercase leading-tight tracking-widest opacity-80 ${compact ? 'text-[5px]' : 'text-[9px]'}`}>
        This is the<br />first member of<br />the velyn studio
      </div>

      {/* Bottom identity */}
      <div className="absolute bottom-16 left-8 z-30 flex flex-col gap-1">
        <span className={`font-bold tracking-widest opacity-60 ${compact ? 'text-[6px]' : 'text-[10px]'}`}>
          VOCAL - RAP
        </span>
        <h1 className={`font-black uppercase leading-none tracking-tighter ${compact ? 'text-4xl' : 'text-7xl lg:text-8xl'}`}>
          VELYN
        </h1>
        <div className={`mt-2 max-w-[200px] font-medium uppercase leading-relaxed tracking-wider opacity-60 ${compact ? 'text-[5px]' : 'text-[8px]'}`}>
          The 1st member of<br />velyn studio<br />cover team
        </div>
      </div>

      {/* Footer detail */}
      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-[6px] font-bold uppercase tracking-[0.4em] opacity-40">
        Design by Velyn
      </div>

      {/* Subtle vignettes */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}