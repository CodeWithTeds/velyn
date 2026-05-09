import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
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
  date?: string;
  university?: string;
  scriptText?: string;
  mainText?: string;
  keyword?: string;
  archiveName?: string;
};

export function Template7Poster({
  imageSrc = '/images/developer/image.png',
  imageTransform = { ...defaultImageTransform, scale: 120, y: 10 },
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
  date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
  university = 'DESIGN FACULTY\nARTS UNIVERSITY\nVELYN DIGITAL STUDIO',
  scriptText = 'I think',
  mainText = 'WE HAVE OUR OWN',
  keyword = 'TIMELINE.',
  archiveName = 'Archive Velyn Studio',
}: Template7PosterProps) {

  useEffect(() => {
    // Load Typography
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Satisfy&display=swap';
    link.rel = 'stylesheet';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-[#ededed] text-slate-900 font-sans ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Background Huge Letters */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-30">
        <span className="text-[600px] font-black text-slate-100 tracking-tighter leading-none -translate-x-[15%]">
          S
        </span>
        <span className="text-[600px] font-black text-slate-100 tracking-tighter leading-none translate-x-[15%]">
          T
        </span>
      </div>

      {/* Main Image Layer - Studio Portrait Style */}
      <div className={`absolute inset-0 z-10 cursor-grab touch-none active:cursor-grabbing flex items-center justify-center ${compact ? 'p-[20%]' : 'p-[10%]'}`}>
        <img
          src={imageSrc}
          alt="Subject"
          className="max-h-full max-w-full object-contain"
          style={{
            filter: `grayscale(1) contrast(${imageTransform.contrast + 20}%) brightness(${imageTransform.brightness}%)`,
            transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
            transformOrigin: 'center center',
          }}
          draggable={false}
        />
      </div>

      {/* Top Left Header */}
      <div className={`absolute z-20 pointer-events-none flex flex-col ${compact ? 'left-[4%] top-[3%] gap-1' : 'left-[8%] top-[5%] gap-2'}`}>
        <div className={`bg-slate-900 w-fit flex items-center justify-center ${compact ? 'h-[10px] px-1.5 rounded-[1px]' : 'px-2 py-0.5 rounded-[2px]'}`}>
          <span className={`font-bold text-white uppercase ${compact ? 'text-[6px] leading-none' : 'text-[10px]'}`}>
            {date}
          </span>
        </div>
        <div className={`flex flex-col font-bold leading-tight uppercase text-slate-950 ${compact ? 'text-[5px]' : 'text-[9px]'}`}>
          {university.split('\n').map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>
      </div>

      {/* Bottom Right Content Section */}
      <div className="absolute right-[8%] bottom-[22%] z-20 pointer-events-none flex flex-col items-start gap-1 pl-6">
        <span
          className={`text-[#f97316] drop-shadow-sm ${compact ? 'text-[18px]' : 'text-[45px]'}`}
          style={{ fontFamily: "'Satisfy', cursive" }}
        >
          {scriptText}
        </span>
        <div className={`flex flex-col font-black uppercase leading-[0.85] tracking-tighter text-white drop-shadow-md ${compact ? 'text-[22px]' : 'text-[54px]'}`}>
          {mainText.split('\n').map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>
        <span className={`font-black uppercase text-[#f97316] leading-none tracking-tighter drop-shadow-sm ${compact ? 'text-[22px]' : 'text-[54px]'}`}>
          {keyword}
        </span>
      </div>

      {/* Vertical Archive Text */}
      <div className={`absolute right-[4%] z-20 pointer-events-none -rotate-90 ${compact ? 'bottom-[4%] origin-bottom-left translate-x-full' : 'bottom-[22%] origin-bottom-right'}`}>
        <span className={`font-medium text-slate-950 italic drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)] ${compact ? 'text-[8px]' : 'text-[15px]'}`}>
          {archiveName}
        </span>
      </div>

      {/* Subtle vignettes */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-white/20 via-transparent to-transparent" />
    </div>
  );
}