import type { PointerEventHandler } from 'react';
import { defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';

type Template1PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

export function Template1Poster({
  imageSrc = '/images/test3.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template1PosterProps) {
  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-neutral-950 text-white ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <img
        src={imageSrc}
        alt="Black and white portrait poster"
        className="absolute inset-0 z-10 h-full w-full object-cover object-[72%_center]"
        style={{
          filter: `grayscale(1) contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%)`,
          transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
          transformOrigin: 'center',
        }}
        draggable={false}
      />

      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/70 via-black/20 to-black/5" />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_76%_42%,transparent_0%,rgb(0_0_0_/_0.08)_42%,rgb(0_0_0_/_0.45)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-20 h-1/3 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />

      <div className="absolute left-[4%] top-[5%] z-30 max-w-[70%]">
        <p
          className={`font-extrabold uppercase leading-[0.92] tracking-normal text-white drop-shadow-[0_2px_1px_rgb(0_0_0_/_0.75)] ${
            compact ? 'text-[6px] sm:text-[7px]' : 'text-[10px] sm:text-xs'
          }`}
        >
          In a world that never stops.
          <br />
          He stood still not lost,
          <br />
          just quietly searching for something
          <br />
          more.
        </p>
      </div>

      <h3
        className={`absolute left-[4%] top-[16%] z-30 max-w-[38%] font-black uppercase leading-[0.86] tracking-normal text-red-600 drop-shadow-[3px_3px_0_rgb(0_0_0_/_0.7)] ${
          compact ? 'text-[clamp(1rem,5vw,2rem)]' : 'text-[clamp(1.55rem,4.5vw,3rem)]'
        }`}
      >
        Than the
        <br />
        Rush
      </h3>
    </div>
  );
}
