import type { PointerEventHandler } from 'react';
import { defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';

type Template2PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

export function Template2Poster({
  imageSrc = '/images/test1.png',
  imageTransform = { ...defaultImageTransform, scale: 96 },
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template2PosterProps) {
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-[#CCFF00] text-black ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="absolute right-[5%] top-[6%] z-30 flex flex-col items-end pointer-events-none text-right">
        <span className={`text-black font-mono uppercase font-bold leading-none opacity-60 ${compact ? 'text-[6px]' : 'text-[10px]'}`}>
          {dateStr}
        </span>
        <span className={`text-black font-mono uppercase font-bold leading-none opacity-60 ${compact ? 'text-[6px]' : 'text-[10px]'}`}>
          {timeStr} // DATA_STREAM
        </span>
      </div>
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="absolute inset-2 z-10">
        <img
          src={imageSrc}
          alt="Acid portrait poster"
          className="h-full w-full object-contain mix-blend-multiply"
          style={{
            filter: `grayscale(1) contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%)`,
            transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
            transformOrigin: 'center',
          }}
          draggable={false}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-20 shadow-[inset_0_0_120px_rgba(204,255,0,0.6)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-[#CCFF00] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 z-20 h-1/4 bg-gradient-to-b from-[#CCFF00] to-transparent pointer-events-none" />

      {/* Typography top */}
      <div className="absolute left-[5%] top-[6%] z-30 flex flex-col gap-[2px] pointer-events-none">
        <span className={`bg-black text-[#CCFF00] font-mono uppercase tracking-widest font-bold w-fit px-2 py-1 ${compact ? 'text-[5px]' : 'text-[9px]'}`}>
          SYSTEM_OVERRIDE // 0xFA
        </span>
        <span className={`bg-black text-[#CCFF00] font-mono uppercase tracking-widest font-bold w-fit px-2 py-1 ${compact ? 'text-[5px]' : 'text-[9px]'}`}>
          AESTHETIC_PROTOCOL
        </span>
      </div>

      {/* Typography bottom */}
      <div className="absolute left-0 bottom-[12%] z-30 w-full overflow-hidden pointer-events-none">
        <h3
          className={`font-black uppercase leading-[0.8] tracking-tighter text-black mix-blend-overlay ${compact ? 'text-[clamp(1.8rem,6vw,2.8rem)]' : 'text-[clamp(4.5rem,10vw,7rem)]'
            } ml-[2%]`}
        >
          NEON
          <br />
          <span className="text-white mix-blend-difference">WAVE.</span>
        </h3>
      </div>

      {/* Decals bottom right */}
      <div className={`absolute right-[5%] bottom-[5%] z-30 flex flex-col gap-1 pointer-events-none ${compact ? 'w-6' : 'w-10'}`}>
        <div className="h-1 w-full bg-black"></div>
        <div className="h-4 w-full bg-black"></div>
        <div className="h-1 w-full bg-black"></div>
        <div className="h-0.5 w-full bg-black"></div>
        <div className="h-2 w-full bg-black"></div>
      </div>
    </div>
  );
}
