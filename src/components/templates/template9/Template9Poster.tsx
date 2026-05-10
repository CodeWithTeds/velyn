import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { PointerEventHandler } from 'react';
import rough from 'roughjs';

type RoughSvg = ReturnType<typeof rough.svg>;

type PhotoTransform = {
  brightness: number;
  contrast: number;
  rotate: number;
  scale: number;
  x: number;
  y: number;
};

type Template9PosterProps = {
  backgroundColor?: string;
  className?: string;
  compact?: boolean;
  councilName?: string;
  logoSrc?: string;
  name?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  photoTransform?: PhotoTransform;
  photoSrc?: string;
  schoolName?: string;
  textColor?: string;
  title?: string;
};

function append(svg: SVGSVGElement, node: SVGGElement) {
  svg.appendChild(node);
}

function drawSpark(rc: RoughSvg, svg: SVGSVGElement, x: number, y: number, size: number, stroke: string) {
  append(svg, rc.path(
    `M ${x} ${y - size} L ${x + size * 0.22} ${y - size * 0.22} L ${x + size} ${y}
     L ${x + size * 0.22} ${y + size * 0.22} L ${x} ${y + size}
     L ${x - size * 0.22} ${y + size * 0.22} L ${x - size} ${y}
     L ${x - size * 0.22} ${y - size * 0.22} Z`,
    { fill: stroke, fillStyle: 'solid', roughness: 2.4, stroke, strokeWidth: 3 },
  ));
}

function drawDoodles(svg: SVGSVGElement) {
  svg.innerHTML = '';
  const rc = rough.svg(svg);
  const white = '#fffdf3';
  const gold = '#ffd463';
  const blue = '#8fd3ff';

  append(svg, rc.circle(186, 532, 112, { roughness: 2.9, stroke: white, strokeWidth: 7 }));
  append(svg, rc.circle(895, 545, 96, { roughness: 2.5, stroke: blue, strokeWidth: 6 }));
  append(svg, rc.rectangle(782, 1184, 172, 92, { roughness: 2.8, stroke: white, strokeWidth: 6 }));
  append(svg, rc.path('M 120 785 C 220 715 324 727 392 805', { roughness: 2.7, stroke: white, strokeWidth: 7 }));
  append(svg, rc.path('M 711 827 C 805 758 907 772 970 858', { roughness: 2.7, stroke: gold, strokeWidth: 7 }));
  append(svg, rc.path('M 109 1278 C 194 1225 287 1231 347 1292', { roughness: 2.7, stroke: blue, strokeWidth: 6 }));
  append(svg, rc.path('M 647 1427 C 739 1372 850 1388 930 1456', { roughness: 2.7, stroke: white, strokeWidth: 6 }));

  append(svg, rc.path('M 198 640 L 239 704 L 313 708 L 260 756 L 279 829 L 202 788 L 129 826 L 150 752 L 96 703 L 169 701 Z', {
    roughness: 2.3,
    stroke: gold,
    strokeWidth: 5,
  }));
  append(svg, rc.path('M 792 388 L 845 326 L 899 389', { roughness: 2.4, stroke: white, strokeWidth: 6 }));
  append(svg, rc.line(846, 326, 846, 446, { roughness: 2.2, stroke: white, strokeWidth: 6 }));
  append(svg, rc.path('M 766 1422 C 759 1346 826 1308 892 1336 C 958 1364 958 1456 892 1488 C 825 1519 764 1491 766 1422', {
    roughness: 2.8,
    stroke: blue,
    strokeWidth: 5,
  }));

  [
    [98, 428, 18, white],
    [348, 543, 14, gold],
    [953, 705, 18, white],
    [102, 1046, 13, gold],
    [911, 1038, 15, blue],
    [220, 1447, 18, white],
    [691, 1586, 14, gold],
    [948, 1650, 16, white],
  ].forEach(([x, y, size, stroke]) => drawSpark(rc, svg, Number(x), Number(y), Number(size), String(stroke)));

  append(svg, rc.path('M 124 1574 C 204 1532 293 1546 348 1606', { roughness: 2.5, stroke: white, strokeWidth: 7 }));
  append(svg, rc.line(152, 1654, 325, 1654, { roughness: 2.3, stroke: white, strokeWidth: 6 }));
  append(svg, rc.line(175, 1695, 292, 1695, { roughness: 2.3, stroke: gold, strokeWidth: 5 }));
}

export function Template9Poster({
  backgroundColor = '#062c58',
  className = '',
  compact = false,
  councilName = 'Supreme Student Council',
  logoSrc = '/images/logo.png',
  name = 'HYERI',
  onPointerDown,
  onPointerMove,
  onPointerUp,
  photoTransform = { brightness: 100, contrast: 100, rotate: 0, scale: 96, x: 0, y: 0 },
  photoSrc = '/images/image copy.png',
  schoolName = 'Falconridge School of Excellence',
  textColor = '#ffffff',
  title = 'Secretary',
}: Template9PosterProps) {
  const doodleRef = useRef<SVGSVGElement>(null);
  const nameSize = compact ? 'text-[clamp(0.9rem,4.5vw,1.6rem)]' : 'text-[clamp(1.8rem,5.5vw,3.2rem)]';
  const titleSize = compact ? 'text-[clamp(0.65rem,3vw,0.95rem)]' : 'text-[clamp(1.1rem,3.5vw,1.8rem)]';

  useEffect(() => {
    if (doodleRef.current) {
      drawDoodles(doodleRef.current);
    }
  }, []);

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-slate-100 text-white ${className}`}
      style={{
        '--template9-bg': backgroundColor,
        '--template9-text': textColor,
      } as CSSProperties}
    >
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'var(--template9-bg)' }} />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 76% 16%, color-mix(in srgb, var(--template9-bg) 62%, white) 0%, transparent 34%), radial-gradient(circle at 50% 55%, color-mix(in srgb, var(--template9-bg) 70%, white) 0%, var(--template9-bg) 42%, color-mix(in srgb, var(--template9-bg) 72%, black) 100%)',
        }}
      />
      <div className="absolute inset-x-[-3%] top-[-2%] z-0 h-[26%] rotate-[-1deg] bg-[#eee9dd] shadow-[0_12px_24px_rgb(0_0_0_/_0.18)] [clip-path:polygon(0_0,100%_0,100%_78%,88%_86%,74%_77%,60%_89%,45%_80%,31%_91%,16%_79%,0_88%)]" />
      <div className="absolute inset-x-[-4%] bottom-[-2%] z-0 h-[21%] rotate-[1deg] bg-[#eee9dd] shadow-[0_-12px_24px_rgb(0_0_0_/_0.18)] [clip-path:polygon(0_18%,13%_8%,27%_20%,43%_6%,58%_22%,73%_10%,88%_21%,100%_9%,100%_100%,0_100%)]" />
      <div className="absolute inset-x-0 top-0 z-0 h-[24%] bg-[radial-gradient(circle,#a79f90_0.8px,transparent_1.3px)] bg-[size:10px_10px] opacity-18" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-[19%] bg-[radial-gradient(circle,#a79f90_0.8px,transparent_1.3px)] bg-[size:10px_10px] opacity-16" />
      <div className="absolute inset-[-8%] z-0 rotate-[-4deg] bg-[linear-gradient(115deg,transparent_0%,rgb(255_255_255_/_0.12)_12%,transparent_24%,rgb(255_255_255_/_0.08)_48%,transparent_63%,rgb(0_0_0_/_0.18)_100%)]" />
      <div className="absolute left-[-12%] top-[8%] z-0 h-[42%] w-[124%] rotate-[-6deg] opacity-55 [clip-path:polygon(0_12%,12%_3%,24%_18%,39%_5%,54%_20%,68%_7%,83%_18%,100%_9%,100%_83%,87%_94%,73%_82%,58%_96%,42%_80%,26%_93%,12%_82%,0_91%)]" style={{ backgroundColor: 'color-mix(in srgb, var(--template9-bg) 82%, white)' }} />
      <div className="absolute left-[-16%] top-[44%] z-0 h-[40%] w-[130%] rotate-[5deg] opacity-55 [clip-path:polygon(0_4%,15%_14%,31%_3%,46%_18%,62%_7%,78%_22%,100%_10%,100%_92%,84%_84%,70%_96%,54%_82%,38%_94%,20%_83%,0_96%)]" style={{ backgroundColor: 'color-mix(in srgb, var(--template9-bg) 70%, black)' }} />
      <div className="absolute inset-0 z-0 bg-[size:12px_12px] opacity-35" style={{ backgroundImage: 'radial-gradient(circle, color-mix(in srgb, var(--template9-bg) 60%, black) 1.1px, transparent 1.55px)' }} />
      <div className="absolute right-[-14%] top-[-2%] z-0 h-[26%] w-[43%] rotate-[-15deg] rounded-full bg-[size:12px_12px] opacity-90" style={{ backgroundImage: 'radial-gradient(circle, color-mix(in srgb, var(--template9-bg) 66%, black) 1.8px, transparent 2.9px)' }} />
      <div className="absolute left-[-14%] bottom-[-2%] z-0 h-[24%] w-[52%] rotate-[10deg] rounded-full bg-[size:11px_11px] opacity-30" style={{ backgroundImage: 'radial-gradient(circle, color-mix(in srgb, var(--template9-bg) 45%, white) 1.4px, transparent 2.5px)' }} />
      <svg
        ref={doodleRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-80 mix-blend-screen"
        preserveAspectRatio="none"
        viewBox="0 0 1080 1920"
      />

      <header className={`absolute ${compact ? 'left-[2%] top-[5%] gap-[2%]' : 'left-[5%] top-[4.4%] gap-[3%]'} z-30 flex w-fit ${compact ? 'max-w-[96%]' : 'max-w-[82%]'} items-center text-[#06264a]`}>
        <img
          src={logoSrc}
          alt="School council logo"
          className={`${compact ? 'h-[clamp(0.7rem,3vw,1.4rem)] w-[clamp(0.7rem,3vw,1.4rem)]' : 'h-[clamp(2.25rem,7vw,4rem)] w-[clamp(2.25rem,7vw,4rem)]'} object-contain`}
          draggable={false}
        />
        <div>
          <p className={`whitespace-nowrap ${compact ? 'text-[clamp(0.28rem,1.2vw,0.55rem)]' : 'text-[clamp(0.5rem,1.9vw,0.95rem)]'} font-extrabold italic leading-none tracking-normal`}>
            {councilName}
          </p>
          <p className={`mt-0.5 whitespace-nowrap ${compact ? 'text-[clamp(0.22rem,0.9vw,0.4rem)]' : 'text-[clamp(0.38rem,1.3vw,0.65rem)]'} font-bold italic leading-none`}>
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
        className="absolute inset-x-0 bottom-[13%] z-30 h-[72%] flex items-end justify-center cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img
          src={photoSrc}
          alt={`${name} portrait`}
          className="w-full h-auto"
          style={{
            filter: `brightness(${photoTransform.brightness}%) contrast(${photoTransform.contrast}%) drop-shadow(8px 0 0 white) drop-shadow(-8px 0 0 white) drop-shadow(0 8px 0 white) drop-shadow(0 -8px 0 white) drop-shadow(0 24px 18px rgb(0 0 0 / 0.28))`,
            transform: `translate3d(${photoTransform.x}%, ${photoTransform.y}%, 0) scale(${photoTransform.scale / 100}) rotate(${photoTransform.rotate}deg)`,
            transformOrigin: 'bottom center',
          }}
          draggable={false}
        />
      </div>

      <section className="absolute left-[7%] right-[7%] top-[55%] z-50">
        <div
          className="w-fit max-w-[95%] skew-x-[-10deg] px-[5%] py-[1.5%] shadow-[0_10px_0_rgb(2_18_38_/_0.35)]"
          style={{ backgroundColor: 'color-mix(in srgb, var(--template9-bg) 82%, black)' }}
        >
          <h2
            className={`${nameSize} max-w-full overflow-hidden text-ellipsis whitespace-nowrap pr-2 font-black uppercase italic leading-[1.1] tracking-normal text-white`}
            style={{ color: 'var(--template9-text)' }}
          >
            {name}
          </h2>
        </div>
        <div
          className="mt-[3.2%] w-fit max-w-[85%] px-[5%] py-[1.8%] shadow-[0_5px_12px_rgb(0_0_0_/_0.32)]"
          style={{
            backgroundImage:
              'linear-gradient(90deg, color-mix(in srgb, var(--template9-bg) 82%, black) 0%, color-mix(in srgb, var(--template9-bg) 78%, white) 48%, color-mix(in srgb, var(--template9-bg) 84%, black) 100%)',
          }}
        >
          <p
            className={`${titleSize} overflow-hidden text-ellipsis whitespace-nowrap pr-2 font-black uppercase italic leading-[1.1] tracking-normal text-white`}
            style={{ color: 'var(--template9-text)' }}
          >
            {title}
          </p>
        </div>
      </section>

    </div>
  );
}
