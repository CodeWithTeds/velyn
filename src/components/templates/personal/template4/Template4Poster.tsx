import { useEffect, useRef } from 'react';
import type { PointerEventHandler } from 'react';
import rough from 'roughjs';
import { defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';

type RoughSvg = ReturnType<typeof rough.svg>;

type Template4PosterProps = {
  imageSrc?: string;
  imageTransform?: ImageTransform;
  compact?: boolean;
  className?: string;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
};

function append(parent: SVGSVGElement, node: SVGGElement) {
  parent.appendChild(node);
}

function drawSpark(rc: RoughSvg, svg: SVGSVGElement, x: number, y: number, size: number, stroke = '#fffdf3') {
  append(svg, rc.path(
    `M ${x} ${y - size} C ${x + size * 0.18} ${y - size * 0.26} ${x + size * 0.26} ${y - size * 0.18} ${x + size} ${y}
     C ${x + size * 0.26} ${y + size * 0.18} ${x + size * 0.18} ${y + size * 0.26} ${x} ${y + size}
     C ${x - size * 0.18} ${y + size * 0.26} ${x - size * 0.26} ${y + size * 0.18} ${x - size} ${y}
     C ${x - size * 0.26} ${y - size * 0.18} ${x - size * 0.18} ${y - size * 0.26} ${x} ${y - size} Z`,
    { fill: stroke, fillStyle: 'solid', roughness: 1.9, stroke, strokeWidth: 3 },
  ));
}

function drawArrow(rc: RoughSvg, svg: SVGSVGElement, path: string, head: [[number, number], [number, number], [number, number]]) {
  append(svg, rc.path(path, {
    bowing: 2,
    roughness: 2.5,
    stroke: '#fffdf3',
    strokeWidth: 6,
  }));
  append(svg, rc.linearPath(head, {
    bowing: 1.5,
    roughness: 2,
    stroke: '#fffdf3',
    strokeWidth: 6,
  }));
}

function drawFitCheckDoodles(rc: RoughSvg, svg: SVGSVGElement) {
  const white = '#fffdf3';
  const yellow = '#ffd463';

  append(svg, rc.rectangle(42, 370, 55, 72, {
    roughness: 2.5,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.path('M 54 398 L 75 421 L 118 358', {
    roughness: 2.5,
    stroke: white,
    strokeWidth: 7,
  }));

  append(svg, rc.path('M 915 332 C 952 290 1002 310 1017 361 C 1031 410 990 446 947 426 C 932 410 920 388 918 365', {
    roughness: 2.1,
    stroke: white,
    strokeWidth: 7,
  }));
  append(svg, rc.line(972, 350, 972, 420, { roughness: 2, stroke: white, strokeWidth: 6 }));
  append(svg, rc.line(940, 390, 1012, 390, { roughness: 2, stroke: white, strokeWidth: 6 }));

  [
    [97, 522, 16],
    [185, 464, 12],
    [383, 394, 12],
    [834, 362, 14],
    [962, 789, 13],
    [138, 1472, 12],
    [742, 1504, 16],
  ].forEach(([x, y, size]) => drawSpark(rc, svg, x, y, size, white));

  [
    [474, 404, 13],
    [672, 905, 11],
    [789, 1078, 12],
    [962, 1330, 15],
    [597, 1524, 10],
  ].forEach(([x, y, size]) => drawSpark(rc, svg, x, y, size, yellow));

  drawArrow(rc, svg, 'M 152 1047 C 234 1015 315 1016 396 1048', [[376, 1020], [405, 1051], [366, 1062]]);
  drawArrow(rc, svg, 'M 293 1188 C 348 1258 452 1239 504 1170', [[493, 1208], [507, 1168], [466, 1182]]);
  drawArrow(rc, svg, 'M 622 1074 C 704 1034 784 1041 855 1098', [[828, 1064], [860, 1101], [811, 1108]]);
  drawArrow(rc, svg, 'M 873 1262 C 807 1280 746 1299 693 1338', [[722, 1345], [690, 1339], [712, 1308]]);
  drawArrow(rc, svg, 'M 548 1518 C 609 1461 675 1443 750 1466', [[720, 1439], [754, 1467], [707, 1482]]);
  drawArrow(rc, svg, 'M 824 1640 C 887 1609 944 1614 997 1666', [[969, 1630], [1000, 1667], [951, 1672]]);

  append(svg, rc.path('M 276 578 C 315 636 390 625 414 563', {
    roughness: 2.1,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.path('M 450 543 C 486 609 548 601 578 546', {
    roughness: 2.1,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.path('M 710 302 C 727 260 762 244 803 254', {
    roughness: 2.4,
    stroke: yellow,
    strokeWidth: 6,
  }));
  append(svg, rc.path('M 743 324 C 782 302 822 300 861 322', {
    roughness: 2.4,
    stroke: yellow,
    strokeWidth: 6,
  }));
  append(svg, rc.line(812, 254, 832, 216, { roughness: 2.1, stroke: yellow, strokeWidth: 5 }));
  append(svg, rc.line(863, 282, 899, 258, { roughness: 2.1, stroke: yellow, strokeWidth: 5 }));
  append(svg, rc.line(885, 334, 927, 329, { roughness: 2.1, stroke: yellow, strokeWidth: 5 }));

  append(svg, rc.ellipse(929, 472, 36, 48, {
    roughness: 1.8,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.ellipse(994, 481, 36, 48, {
    roughness: 1.8,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.circle(930, 472, 8, { fill: white, fillStyle: 'solid', roughness: 1.4, stroke: white }));
  append(svg, rc.circle(994, 481, 8, { fill: white, fillStyle: 'solid', roughness: 1.4, stroke: white }));

  append(svg, rc.rectangle(879, 696, 134, 71, {
    roughness: 2.3,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.path('M 892 726 C 934 695 981 693 1016 721', {
    roughness: 2,
    stroke: white,
    strokeWidth: 5,
  }));

  append(svg, rc.circle(607, 1542, 57, {
    roughness: 2,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.circle(589, 1531, 12, {
    fill: white,
    fillStyle: 'solid',
    roughness: 1.3,
    stroke: white,
  }));
  append(svg, rc.circle(625, 1531, 12, {
    fill: white,
    fillStyle: 'solid',
    roughness: 1.3,
    stroke: white,
  }));
  append(svg, rc.path('M 582 1563 C 602 1581 628 1580 646 1560', {
    roughness: 2,
    stroke: white,
    strokeWidth: 5,
  }));

  append(svg, rc.path('M 64 1630 L 91 1672 L 139 1680 L 103 1715 L 114 1765 L 64 1740 L 20 1764 L 28 1714 L -8 1680 L 41 1673 Z', {
    fill: 'transparent',
    roughness: 2.1,
    stroke: white,
    strokeWidth: 6,
  }));
  append(svg, rc.path('M 973 1768 L 1007 1787 L 1041 1768 L 1022 1802 L 1041 1837 L 1007 1818 L 973 1837 L 992 1802 Z', {
    fill: white,
    fillStyle: 'solid',
    roughness: 1.8,
    stroke: white,
    strokeWidth: 4,
  }));
}

export function Template4Poster({
  imageSrc = '/images/developer/image.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template4PosterProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = '';
    const rc = rough.svg(svg);
    drawFitCheckDoodles(rc, svg);
  }, []);

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-[#d8d7d1] text-white ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_62%_6%,rgb(255_255_255_/_0.8),transparent_30%),linear-gradient(180deg,#dfe2df_0%,#bfc3bf_45%,#c98144_46%,#b9692f_86%,#5f5c56_100%)]" />
      <div className="absolute left-[-12%] top-[42%] z-0 h-[64%] w-[58%] rotate-[-13deg] bg-[#d88743]" />
      <div className="absolute bottom-[8%] left-[-10%] z-0 h-[12%] w-[120%] rotate-[-3deg] bg-[#e7dfd2]/70" />
      <div className="absolute left-[4%] top-[2%] z-0 h-[34%] w-[42%] rotate-[-14deg] border-[10px] border-slate-900/60 bg-white/20 shadow-[0_10px_30px_rgb(0_0_0_/_0.18)]" />
      <div className="absolute right-[0] top-0 z-0 h-full w-[13%] bg-[#c69c80] shadow-[-18px_0_26px_rgb(0_0_0_/_0.18)]" />
      <div className="absolute right-[5%] top-0 z-0 h-full w-[2.2%] bg-slate-900/70" />
      <div className="absolute inset-x-0 top-[27%] z-0 h-px bg-white/30" />
      <div className="absolute inset-x-0 top-[46%] z-0 h-px bg-black/10" />

      <div className="absolute left-[6%] top-[4%] z-10">
        <div
          className={`relative font-black italic uppercase leading-[0.78] tracking-normal text-[#ff8844] drop-shadow-[0_2px_0_rgb(255_255_255_/_0.96)] ${
            compact ? 'text-[clamp(1.85rem,8vw,3.4rem)]' : 'text-[clamp(3.7rem,9.4vw,6.1rem)]'
          }`}
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          <span className="relative block w-fit px-4 before:absolute before:inset-x-[-4%] before:bottom-[14%] before:-z-10 before:h-[42%] before:-skew-x-12 before:bg-white">
            FIT
          </span>
          <span className="relative block w-fit px-4 before:absolute before:inset-x-[-4%] before:bottom-[14%] before:-z-10 before:h-[42%] before:-skew-x-12 before:bg-white">
            CHECK
          </span>
        </div>
        <div className={`ml-[18%] mt-1 w-fit bg-black px-3 py-1 font-mono font-black uppercase tracking-widest text-[#ff8844] ${compact ? 'text-[6px]' : 'text-xs'}`}>
          GHIBLI VERSION
        </div>
      </div>

      <img
        src={imageSrc}
        alt="Fit check poster subject"
        className="absolute bottom-[-1%] left-[25%] z-20 h-[76%] w-[65%] object-contain object-bottom drop-shadow-[0_32px_22px_rgb(0_0_0_/_0.24)]"
        style={{
          filter: `contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%) saturate(0.96)`,
          transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
          transformOrigin: 'bottom center',
        }}
        draggable={false}
      />

      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1080 1920"
      />

      <div className={`absolute left-[7%] top-[25%] z-50 rotate-[-15deg] font-mono font-black text-white ${compact ? 'text-[8px]' : 'text-lg'}`}>
        DRIP?
      </div>
      <div className={`absolute left-[33%] top-[22%] z-50 rotate-[-18deg] font-mono font-black text-white ${compact ? 'text-[6px]' : 'text-sm'}`}>
        Cool Tee!
      </div>
      <div className={`absolute left-[24%] top-[57%] z-50 rotate-[-7deg] font-mono font-black text-white ${compact ? 'text-[9px]' : 'text-2xl'}`}>
        BANG!!!
      </div>
      <div className={`absolute right-[9%] top-[51%] z-50 rotate-[-4deg] rounded-full bg-white px-3 py-1 font-mono font-black text-slate-900 ${compact ? 'text-[6px]' : 'text-xs'}`}>
        RATE MY STYLE!
      </div>
      <div className={`absolute right-[14%] top-[61%] z-50 rotate-[5deg] font-mono font-black text-white ${compact ? 'text-[8px]' : 'text-lg'}`}>
        OOTD!
      </div>
      <div className={`absolute right-[5%] top-[80%] z-50 rotate-[-12deg] font-mono font-black leading-none text-white ${compact ? 'text-[8px]' : 'text-lg'}`}>
        game
        <br />
        strong
      </div>
      <div className={`absolute left-[54%] top-[83%] z-50 rotate-[-12deg] font-mono font-black text-white ${compact ? 'text-[7px]' : 'text-base'}`}>
        kicks!
      </div>
    </div>
  );
}
