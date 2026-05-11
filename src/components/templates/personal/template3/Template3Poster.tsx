import type { PointerEventHandler } from 'react';
import { defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';

type Template3PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

export function Template3Poster({
  imageSrc = '/images/developer/image.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template3PosterProps) {
  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-white text-[#0753aa] ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        className="absolute right-[-8%] top-[2%] z-10 flex select-none flex-col font-black uppercase leading-[0.72] tracking-normal text-[#0753aa]"
        style={{ fontFamily: '"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif' }}
        aria-hidden="true"
      >
        {['独', '行', '城', '市'].map((line) => (
          <span
            key={line}
            className={`relative block ${
              compact ? 'text-[clamp(4.4rem,18vw,7.4rem)]' : 'text-[clamp(8rem,22vw,13.5rem)]'
            }`}
          >
            {line}
          </span>
        ))}
      </div>

      <div className="absolute left-[4.5%] top-[35%] z-30 max-w-[34%]">
        <p
          className={`font-mono font-black uppercase leading-[1.12] tracking-normal text-[#0753aa] ${
            compact ? 'text-[5px]' : 'text-[clamp(0.45rem,1vw,0.72rem)]'
          }`}
        >
          Walking alone in the city
          <br />
          is more than movement.
          <br />
          It is self-regulation.
          <br />
          Each step syncing body and mind,
          <br />
          filtering noise, resetting rhythm.
          <br />
          <br />
          The city provides the backdrop
          <br />
          light, strangers, concrete, motion.
          <br />
          But in solitude,
          <br />
          these turn into signals
          <br />
          that shape mood and memory.
          <br />
          <br />
          Urban walking is not escape.
          <br />
          It is exposure to the pulse
          <br />
          of the streets.
        </p>
      </div>

      <img
        src={imageSrc}
        alt="Walking editorial poster subject"
        className="absolute bottom-[4%] left-[24%] z-40 h-[75%] w-[55%] object-contain object-bottom drop-shadow-[0_20px_18px_rgb(0_0_0_/_0.22)]"
        style={{
          filter: `contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%) saturate(1.06)`,
          transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
          transformOrigin: 'bottom center',
        }}
        draggable={false}
      />

      <div
        className="absolute bottom-[4.5%] left-[19%] z-30 h-[3.5%] w-[63%] rotate-[-3deg] rounded-[100%] bg-black/24 blur-[6px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-[3%] bottom-[2.5%] z-50 h-px bg-[#0753aa]/30"
        aria-hidden="true"
      />
    </div>
  );
}
