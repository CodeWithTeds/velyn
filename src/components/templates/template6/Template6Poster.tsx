import type { PointerEventHandler } from 'react';
import type { ImageTransform } from './imageTransform';
import { defaultImageTransform } from './imageTransform';

type Template6PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

export function Template6Poster({
  imageSrc = '/images/test3.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template6PosterProps) {
  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-[#eeede8] text-slate-900 ${compact ? 'p-2' : 'p-4'} ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Background Texture and Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
      
      {/* Main Container */}
      <div className="relative z-10 flex h-full flex-col">
        
        {/* Top Image Frame - Person is hero here */}
        <div className={`relative w-full flex-1 overflow-hidden rounded-sm bg-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}>
          <img
            src={imageSrc}
            alt="Main subject"
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              filter: `contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%) saturate(0.9)`,
              transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
              transformOrigin: 'center center',
            }}
            draggable={false}
          />
          
          {/* Subtle Frame Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

          {/* Floating Technical Notes - Away from face */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1 opacity-60">
            <div className={`font-mono ${compact ? 'text-[5px]' : 'text-[8px]'}`}>ISO 400</div>
            <div className={`font-mono ${compact ? 'text-[5px]' : 'text-[8px]'}`}>F 2.8 / 1/250s</div>
          </div>
        </div>

        {/* Bottom Content Section - Airy and Spacious */}
        <div className={`flex flex-col justify-center px-2 ${compact ? 'py-2 min-h-0' : 'py-6 min-h-[180px]'}`}>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className={`font-serif italic text-slate-400 ${compact ? 'text-[5px]' : 'text-sm'}`}>
                Thinking About...
              </span>
              <h2 className={`font-black uppercase tracking-tighter text-slate-950 ${compact ? 'text-[10px] leading-tight' : 'text-5xl'}`}>
                Digital <span className="text-emerald-700">Stillness</span>
              </h2>
            </div>
            
            {/* Stamp Detail */}
            <div className={`flex flex-col items-center border border-slate-300 ${compact ? 'p-0.5 scale-50' : 'p-2'}`}>
              <span className="text-[8px] font-black uppercase opacity-40">Velyn</span>
              <span className="text-[10px] font-bold text-emerald-700">Studio</span>
            </div>
          </div>

          <div className={`flex gap-8 ${compact ? 'mt-1' : 'mt-4'}`}>
            <div className="flex-1">
              <p className={`leading-relaxed text-slate-500 ${compact ? 'text-[4px] leading-tight line-clamp-2' : 'text-[10px]'}`}>
                A collection of quiet moments in a fast-paced digital world. 
                Focusing on the beauty of the everyday and the serenity of being present.
              </p>
            </div>
            {!compact && (
              <div className="flex flex-col gap-2">
                <div className="h-0.5 w-12 bg-emerald-700" />
                <span className={`font-bold tracking-widest text-slate-400 text-[7px]`}>
                  PAGE 06
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Overlays - Not Blocking Subject */}
      <div className={`absolute right-8 top-12 z-20 flex flex-col items-end gap-3 pointer-events-none ${compact ? 'hidden' : ''}`}>
        <div className={`rounded-full border border-slate-900/10 bg-white/40 px-3 py-1 backdrop-blur-sm ${compact ? 'text-[6px]' : 'text-[10px] font-bold'}`}>
          Hello.
        </div>
        <div className={`rounded-full border border-slate-900/10 bg-white/40 px-3 py-1 backdrop-blur-sm ${compact ? 'text-[6px]' : 'text-[10px] font-bold'}`}>
          thinking...
        </div>
      </div>

      {/* Edge Details */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 p-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-slate-300" />
        ))}
      </div>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 z-50 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </div>
  );
}
