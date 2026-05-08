import type { PointerEventHandler } from 'react';
import type { ImageTransform } from './imageTransform';
import { defaultImageTransform } from './imageTransform';

type Template5PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

export function Template5Poster({
  imageSrc = '/images/test2.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template5PosterProps) {
  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-[#2d342d] text-white ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Background/Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#3a443a]/40 to-[#1a1f1a]/60" />
      
      {/* Background Big Number */}
      <div 
        className={`absolute right-[-10%] top-[25%] z-0 select-none font-black leading-none opacity-10 blur-[2px] ${
          compact ? 'text-[120px]' : 'text-[280px]'
        }`}
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        05
        <br />
        39
      </div>

      {/* Main Image */}
      <img
        src={imageSrc}
        alt="Self portrait subject"
        className="absolute inset-0 z-10 h-full w-full object-cover grayscale-[0.2] sepia-[0.1]"
        style={{
          filter: `contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%) saturate(0.85) blur(0.5px)`,
          transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
          transformOrigin: 'center center',
        }}
        draggable={false}
      />

      {/* Vignette */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Top Text */}
      <div className="absolute inset-x-0 top-[8%] z-30 flex justify-between px-[10%]">
        <span className={`font-medium tracking-[0.3em] ${compact ? 'text-[6px]' : 'text-xs'}`}>MOMENTS</span>
        <span className={`font-medium tracking-[0.3em] ${compact ? 'text-[6px]' : 'text-xs'}`}>FOR</span>
        <span className={`font-medium tracking-[0.3em] ${compact ? 'text-[6px]' : 'text-xs'}`}>MEMORY</span>
      </div>

      {/* Center Left Text */}
      <div className="absolute left-[8%] top-[62%] z-30">
        <div className={`relative font-black leading-[0.85] tracking-tighter ${compact ? 'text-3xl' : 'text-7xl'}`}>
          self
          <br />
          portrait<span className="text-[#ffd463]">.</span>
        </div>
        
        {/* Connector Line */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px w-16 bg-white/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
          <div className={`italic font-medium ${compact ? 'text-[5px]' : 'text-[10px]'}`}>
            lightroom
            <br />
            color grading
          </div>
        </div>
      </div>

      {/* Right Side Info */}
      <div className="absolute right-[8%] top-[65%] z-30 flex flex-col items-end gap-6">
        {/* Soft Green Badge */}
        <div className={`rounded-full border border-white/40 bg-black/20 px-4 py-1.5 backdrop-blur-md ${compact ? 'text-[6px]' : 'text-[10px] font-bold tracking-widest'}`}>
          #SOFTGREEN
        </div>

        {/* Archived By */}
        <div className="flex flex-col items-end">
          <span className={`opacity-60 ${compact ? 'text-[5px]' : 'text-[10px] font-medium'}`}>archived by</span>
          <div className={`font-black ${compact ? 'text-lg' : 'text-3xl'}`}>
            velyn<span className="text-[#ffd463]">.</span>
          </div>
          <div className="mt-1 h-0.5 w-8 bg-[#ffd463]" />
        </div>
      </div>

      {/* Looking Around Label */}
      <div className="absolute right-[15%] top-[36%] z-30 flex items-center gap-3">
        <div className="h-px w-12 bg-white/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
        <span className={`font-bold italic ${compact ? 'text-[6px]' : 'text-[10px]'}`}>looking around</span>
      </div>

      {/* Dust/Grain Texture Overlay */}
      <div className="absolute inset-0 z-40 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}
