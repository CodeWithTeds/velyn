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
  title?: string;
  subtitle?: string;
  author?: string;
  quote?: string;
  brand?: string;
};

export function Template5Poster({
  imageSrc = '/images/test2.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
  title = 'FOCUS',
  subtitle = 'ON ME',
  author = 'ARTIST',
  quote = 'I CANNOT FOCUS ON ANYTHING BUT YOU',
  brand = 'VELYN',
}: Template5PosterProps) {
  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-black text-white ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Layer 1: Pixelated/Blurred Background */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        <img
          src={imageSrc}
          alt="Background"
          className="h-full w-full object-cover blur-md opacity-50 scale-110"
          style={{
            transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
            transformOrigin: 'center center',
            imageRendering: 'pixelated',
          }}
          draggable={false}
        />
        {/* Pixel Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Layer 2: Clear Subject Window */}
      <div className="absolute inset-[22%_8%] bottom-[22%] z-10 overflow-hidden border-2 border-dashed border-white/80">
        <img
          src={imageSrc}
          alt="Subject clear"
          className="h-full w-full object-contain"
          style={{
            transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
            transformOrigin: 'center center',
          }}
          draggable={false}
        />
      </div>

      {/* Frame Corners */}
      <div className="absolute inset-[22%_8%] bottom-[22%] z-20 pointer-events-none">
        <div className={`absolute -left-2.5 -top-2.5 bg-white shadow-xl ${compact ? 'h-3 w-3 -left-1.5 -top-1.5' : 'h-5 w-5'}`} />
        <div className={`absolute -right-2.5 -top-2.5 bg-white shadow-xl ${compact ? 'h-3 w-3 -right-1.5 -top-1.5' : 'h-5 w-5'}`} />
        <div className={`absolute -bottom-2.5 -left-2.5 bg-white shadow-xl ${compact ? 'h-3 w-3 -left-1.5 -bottom-1.5' : 'h-5 w-5'}`} />
        <div className={`absolute -bottom-2.5 -right-2.5 bg-white shadow-xl ${compact ? 'h-3 w-3 -right-1.5 -bottom-1.5' : 'h-5 w-5'}`} />
      </div>

      {/* Overlay Typography */}
      <div className="absolute inset-0 z-30 pointer-events-none p-[8%] flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex flex-col">
          <div className="flex justify-end">
            <span className={`font-bold tracking-widest text-white/90 ${compact ? 'text-[7px]' : 'text-[12px]'}`}>{brand}</span>
          </div>
          <h1
            className={`mt-4 text-center font-black uppercase leading-[0.8] tracking-tight text-white drop-shadow-2xl ${compact ? 'text-[42px]' : 'text-[140px]'}`}
            style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' }}
          >
            {title}
          </h1>
        </div>

        {/* Side Info */}
        <div className={`absolute left-[8%] top-[24%] flex flex-col gap-6 max-w-[25%] ${compact ? 'top-[22%] gap-2' : ''}`}>
          <div className="flex flex-col">
            <div className={`h-[2px] bg-white mb-2 shadow-sm ${compact ? 'w-4' : 'w-8'}`} />
            <span className={`font-black uppercase tracking-tight text-white drop-shadow-md ${compact ? 'text-[7px]' : 'text-[16px]'}`}>{author}</span>
          </div>
          <p className={`font-bold uppercase leading-[1.1] text-white/80 drop-shadow-sm ${compact ? 'text-[5px]' : 'text-[10px]'}`}>
            {quote}
          </p>
        </div>

        {/* Bottom Header */}
        <div className="flex flex-col gap-8">
          <h2
            className={`text-center font-black uppercase leading-[0.8] tracking-tight text-white drop-shadow-2xl ${compact ? 'text-[42px]' : 'text-[140px]'}`}
            style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' }}
          >
            {subtitle}
          </h2>

          <div className="flex justify-end pr-2">
            <div className={`flex flex-col items-end text-right font-black leading-[1.1] text-white ${compact ? 'text-[6px]' : 'text-[13px]'}`}>
              <span>KEEP</span>
              <span>YOUR</span>
              <span>EYES</span>
              <span>ON ME</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
