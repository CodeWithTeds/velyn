import type { PointerEventHandler } from 'react';
import type { BirthdayCollageImages } from './birthdayImages';
import { defaultBirthdayImages } from './birthdayImages';
import type { ImageTransform } from './imageTransform';
import { defaultImageTransform } from './imageTransform';

type Template8PosterProps = {
  dateText?: string;
  imageSrc?: string;
  imageSources?: BirthdayCollageImages;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

type StripPhotoProps = {
  className: string;
  imageSrc: string;
  rotation: string;
};

function StripPhoto({ className, imageSrc, rotation }: StripPhotoProps) {
  return (
    <div
      className={`absolute z-20 bg-white p-[3%] shadow-[0_10px_18px_rgb(0_0_0_/_0.16)] ${className}`}
      style={{ transform: `rotate(${rotation})` }}
    >
      <div className="h-full w-full overflow-hidden border border-black/25 bg-zinc-100">
        <img
          src={imageSrc}
          alt="Black and white birthday collage photo"
          className="h-full w-full object-cover grayscale"
          draggable={false}
        />
      </div>
    </div>
  );
}

export function Template8Poster({
  dateText = '24.09',
  imageSrc,
  imageSources,
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template8PosterProps) {
  const images: BirthdayCollageImages = {
    ...defaultBirthdayImages,
    ...imageSources,
    main: imageSources?.main ?? imageSrc ?? defaultBirthdayImages.main,
  };

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-white text-black ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,#111_0.7px,transparent_1.2px)] bg-[size:18px_18px] opacity-[0.16]" />
      <div className="absolute right-[-7%] top-[36%] z-0 h-[34%] w-[42%] rounded-full bg-[radial-gradient(circle,#111_1.7px,transparent_2.8px)] bg-[size:14px_14px] opacity-90" />
      <div className="absolute left-[-8%] bottom-[8%] z-0 h-[28%] w-[42%] rounded-full bg-[radial-gradient(circle,#111_1.5px,transparent_2.7px)] bg-[size:14px_14px] opacity-80" />

      <div className="absolute left-[8%] top-[9%] z-10 h-[71%] w-[36%] rotate-[-6deg] border-2 border-black/30 bg-white/60" />
      <StripPhoto className="left-[10%] top-[12%] h-[23%] w-[34%]" imageSrc={images.stripTop} rotation="-5deg" />
      <StripPhoto className="left-[12%] top-[36%] h-[22%] w-[33%]" imageSrc={images.stripMiddle} rotation="-3deg" />
      <StripPhoto className="left-[15%] top-[59%] h-[22%] w-[32%]" imageSrc={images.stripBottom} rotation="-5deg" />

      <div className="absolute left-[45%] top-[10%] z-30 w-[51%]">
        <div className="flex flex-wrap items-end gap-x-2">
          <h2
            className={`font-black uppercase leading-none tracking-normal ${compact ? 'text-[clamp(1.05rem,4.7vw,2.05rem)]' : 'text-[clamp(2.2rem,6.1vw,3.7rem)]'
              }`}
          >
            H<span className="inline-block translate-y-[-0.03em]">A</span>PPY
          </h2>
          <span className={`font-black uppercase leading-none ${compact ? 'text-[0.9rem]' : 'text-[2.05rem]'}`}>
            Birthday
          </span>
        </div>
        <div className={`mt-1 w-fit bg-black px-2 py-0.5 font-mono font-black lowercase text-white ${compact ? 'text-[4px]' : 'text-[9px]'}`}>
          hey, come celebrate with me
        </div>
        <div className={`font-mono font-black leading-none tracking-tight ${compact ? 'text-[1.55rem]' : 'text-[3.25rem]'}`}>
          {dateText}
        </div>
      </div>

      <img
        src={images.cakeIcon}
        alt="Birthday cake icon"
        className="absolute right-[4%] top-[19%] z-30 aspect-square w-[16%] object-contain drop-shadow-[4px_5px_0_rgb(0_0_0_/_0.16)]"
        draggable={false}
      />

      <div className={`absolute left-[3%] top-[47%] z-40 rotate-[2deg] font-serif font-black uppercase leading-[0.82] text-white [-webkit-text-stroke:2px_#111] ${compact ? 'text-[1.45rem]' : 'text-[3.3rem]'}`}>
        Cake
        <br />
        Day
      </div>

      <div className="absolute bottom-[2%] right-[-7%] z-30 h-[56%] w-[72%]">
        <img
          src={images.main}
          alt="Color birthday portrait"
          className="h-full w-full object-contain object-bottom drop-shadow-[0_0_0_#fff] [filter:drop-shadow(5px_0_0_white)_drop-shadow(-5px_0_0_white)_drop-shadow(0_5px_0_white)_drop-shadow(0_-5px_0_white)_drop-shadow(0_22px_18px_rgb(0_0_0_/_0.22))]"
          style={{
            filter: `contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%) saturate(1.08) drop-shadow(5px 0 0 white) drop-shadow(-5px 0 0 white) drop-shadow(0 5px 0 white) drop-shadow(0 -5px 0 white) drop-shadow(0 22px 18px rgb(0 0 0 / 0.22))`,
            transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
            transformOrigin: 'bottom center',
          }}
          draggable={false}
        />
      </div>

      <img
        src={images.cakeMain}
        alt="Birthday cake with candle"
        className="absolute right-[-9%] top-[48%] z-40 h-[33%] w-[34%] rotate-[4deg] object-contain drop-shadow-[0_15px_12px_rgb(0_0_0_/_0.18)]"
        draggable={false}
      />

      <div className="absolute left-[5%] top-[6%] z-40 text-[clamp(1.15rem,3vw,2rem)] leading-none">✦</div>
      <div className="absolute right-[22%] top-[40%] z-40 text-[clamp(1rem,2.4vw,1.6rem)] leading-none">✦</div>
      <div className="absolute left-[2%] bottom-[28%] z-40 text-[clamp(1rem,2.4vw,1.7rem)] leading-none">✦</div>

    </div>
  );
}
