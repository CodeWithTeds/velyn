import type { PointerEventHandler } from 'react';

type PhotoTransform = {
  scale: number;
  x: number;
  y: number;
};

type Template9PosterProps = {
  className?: string;
  compact?: boolean;
  logoSrc?: string;
  name?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  photoTransform?: PhotoTransform;
  photoSrc?: string;
  schoolName?: string;
  title?: string;
};

export function Template9Poster({
  className = '',
  compact = false,
  logoSrc = '/images/logo.png',
  name = 'HYERI',
  onPointerDown,
  onPointerMove,
  onPointerUp,
  photoTransform = { scale: 100, x: 0, y: 0 },
  photoSrc = '/images/prof.png',
  schoolName = 'Falconridge School of Excellence',
  title = 'Secretary',
}: Template9PosterProps) {
  const nameSize = compact ? 'text-[clamp(1.55rem,8vw,2.85rem)]' : 'text-[clamp(3.05rem,8vw,5.2rem)]';
  const titleSize = compact ? 'text-[clamp(0.76rem,3.5vw,1.15rem)]' : 'text-[clamp(1.35rem,3.8vw,2.15rem)]';

  return (
    <div className={`relative isolate aspect-[9/16] overflow-hidden bg-slate-100 text-white ${className}`}>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#f5f5f2_0%,#ecebe5_22%,#06315d_22%,#062f5c_77%,#f3f2ec_77%,#e9e8e1_100%)]" />
      <div className="absolute left-[-8%] top-[22%] z-0 h-[56%] w-[116%] bg-[radial-gradient(circle_at_center,#0d68a2_0%,#063869_44%,#041b39_100%)]" />
      <div className="absolute inset-x-0 top-[22%] z-0 h-[55%] bg-[radial-gradient(circle,#0b2443_1.1px,transparent_1.4px)] bg-[size:11px_11px] opacity-35" />
      <div className="absolute right-[-14%] top-[-2%] z-0 h-[26%] w-[43%] rotate-[-15deg] rounded-full bg-[radial-gradient(circle,#052f5d_1.8px,transparent_2.9px)] bg-[size:12px_12px] opacity-95" />
      <div className="absolute left-[-14%] bottom-[-2%] z-0 h-[24%] w-[52%] rotate-[10deg] rounded-full bg-[radial-gradient(circle,#0a2d55_1.4px,transparent_2.5px)] bg-[size:11px_11px] opacity-45" />

      <div className="absolute left-0 right-0 top-[18%] z-10 h-[8%] bg-slate-100 shadow-[0_10px_12px_rgb(0_0_0_/_0.18)] [clip-path:polygon(0_0,9%_22%,21%_10%,35%_31%,48%_14%,61%_30%,75%_9%,88%_25%,100%_7%,100%_60%,88%_82%,74%_70%,59%_91%,45%_72%,30%_87%,17%_71%,0_91%)]" />
      <div className="absolute left-0 right-0 bottom-[15%] z-40 h-[12%] bg-slate-100 shadow-[0_-10px_14px_rgb(0_0_0_/_0.16)] [clip-path:polygon(0_22%,12%_7%,25%_26%,38%_9%,54%_32%,67%_12%,81%_31%,100%_11%,100%_100%,0_100%)]" />

      <header className="absolute left-[5%] top-[4.4%] z-30 flex w-[70%] items-center gap-[3%] text-[#06264a]">
        <img
          src={logoSrc}
          alt="School council logo"
          className="h-[clamp(2.25rem,7vw,4rem)] w-[clamp(2.25rem,7vw,4rem)] object-contain"
          draggable={false}
        />
        <div className="min-w-0">
          <p className="truncate text-[clamp(0.55rem,2vw,1.05rem)] font-extrabold italic leading-none tracking-normal">
            Supreme Student Council
          </p>
          <p className="mt-1 truncate text-[clamp(0.42rem,1.4vw,0.72rem)] font-bold italic leading-none">
            {schoolName}
          </p>
        </div>
      </header>

      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        className="absolute left-[10%] top-[35%] z-10 h-[34%] w-[80%] object-contain opacity-[0.08] mix-blend-screen"
        draggable={false}
      />
      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        className="absolute right-[3%] top-[47%] z-10 h-[22%] w-[36%] object-contain opacity-[0.12] mix-blend-screen"
        draggable={false}
      />

      <div
        className="absolute inset-x-[5%] bottom-[13%] z-30 h-[72%] cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img
          src={photoSrc}
          alt={`${name} portrait`}
          className="h-full w-full object-contain object-bottom [filter:drop-shadow(8px_0_0_white)_drop-shadow(-8px_0_0_white)_drop-shadow(0_8px_0_white)_drop-shadow(0_-8px_0_white)_drop-shadow(0_24px_18px_rgb(0_0_0_/_0.28))]"
          style={{
            transform: `translate3d(${photoTransform.x}%, ${photoTransform.y}%, 0) scale(${photoTransform.scale / 100})`,
            transformOrigin: 'bottom center',
          }}
          draggable={false}
        />
      </div>

      <section className="absolute left-[7%] right-[7%] top-[55%] z-50">
        <div className="w-fit max-w-full skew-x-[-10deg] bg-[#052f5d] px-[4%] py-[1.2%] shadow-[0_10px_0_rgb(2_18_38_/_0.35)]">
          <h2
            className={`${nameSize} max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-black uppercase italic leading-[0.86] tracking-normal text-white`}
          >
            {name}
          </h2>
        </div>
        <div className="mt-[3.2%] w-[66%] bg-[linear-gradient(90deg,#0b2146_0%,#163b80_48%,#071a39_100%)] px-[4%] py-[1.4%] shadow-[0_5px_12px_rgb(0_0_0_/_0.32)]">
          <p className={`${titleSize} overflow-hidden text-ellipsis whitespace-nowrap font-black uppercase italic leading-none tracking-normal text-white`}>
            {title}
          </p>
        </div>
      </section>
    </div>
  );
}
