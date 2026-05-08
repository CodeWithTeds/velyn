import { useEffect, useRef } from 'react';
import type { PointerEventHandler } from 'react';
import rough from 'roughjs';
import type { ImageTransform } from './imageTransform';
import { defaultImageTransform } from './imageTransform';

type RoughSvg = ReturnType<typeof rough.svg>;

type Template8PosterProps = {
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

function drawPartyPopper(rc: RoughSvg, svg: SVGSVGElement, x: number, y: number, angle: number) {
  // Popper cone
  append(svg, rc.polygon([[x, y], [x + 40, y - 60], [x - 40, y - 60]], {
    fill: '#ff4d4d',
    fillStyle: 'hachure',
    roughness: 1.5,
    stroke: '#fff',
    strokeWidth: 3
  }));
  // Streamers
  for (let i = 0; i < 5; i++) {
    const tx = x + (Math.random() - 0.5) * 100;
    const ty = y - 100 - Math.random() * 100;
    append(svg, rc.path(`M ${x} ${y - 60} Q ${x + (tx - x) / 2} ${y - 80} ${tx} ${ty}`, {
      roughness: 2,
      stroke: ['#ffd700', '#00ced1', '#ff1493'][i % 3],
      strokeWidth: 2
    }));
  }
}

function drawBirthdayDoodles(rc: RoughSvg, svg: SVGSVGElement) {
  const black = '#000000';
  const gold = '#ffd700';
  const pink = '#ff1493';
  const cyan = '#00ced1';

  // Hand-drawn frame around the image area - Changed to pink for visibility
  append(svg, rc.rectangle(80, 530, 920, 800, {
    roughness: 2.5,
    stroke: pink,
    strokeWidth: 4,
    bowing: 2
  }));

  // Scattered Stars
  [
    [100, 100, 40], [980, 150, 35], [150, 1800, 45], [930, 1750, 40], [540, 50, 30]
  ].forEach(([x, y, size]) => {
    append(svg, rc.path(`M ${x} ${y - size} L ${x + size * 0.2} ${y - size * 0.2} L ${x + size} ${y} L ${x + size * 0.2} ${y + size * 0.2} L ${x} ${y + size} L ${x - size * 0.2} ${y + size * 0.2} L ${x - size} ${y} L ${x - size * 0.2} ${y - size * 0.2} Z`, {
      fill: gold,
      fillStyle: 'solid',
      roughness: 2,
      stroke: black,
      strokeWidth: 2
    }));
  });

  // Confetti dots - More vibrant colors, no white
  const colors = [gold, pink, cyan, '#ff4500', '#32cd32'];
  for (let i = 0; i < 60; i++) {
    const cx = Math.random() * 1080;
    const cy = Math.random() * 1920;
    append(svg, rc.circle(cx, cy, 6 + Math.random() * 12, {
      fill: colors[i % colors.length],
      fillStyle: 'solid',
      roughness: 1.5,
      stroke: 'none'
    }));
  }

  // Large hand-drawn "HBD" scribble
  append(svg, rc.path('M 350 1480 Q 540 1380 730 1480', {
    roughness: 4,
    stroke: pink,
    strokeWidth: 8,
    opacity: 0.4
  }));
}

export function Template8Poster({
  imageSrc = '/images/velyn.png',
  imageTransform = defaultImageTransform,
  compact = false,
  className = '',
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: Template8PosterProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);
    drawBirthdayDoodles(rc, svg);
  }, []);

  return (
    <div
      className={`relative isolate aspect-[9/16] overflow-hidden bg-[#fffdfa] ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Background Gradient - Light & Festive */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#fff5f7_0%,#fffdfa_100%)]" />

      {/* Decorative colored blobs */}
      <div className="absolute -top-[5%] -left-[10%] w-[50%] h-[30%] bg-pink-100 rounded-full blur-[60px] opacity-40" />
      <div className="absolute top-[30%] -right-[5%] w-[40%] h-[40%] bg-yellow-100 rounded-full blur-[80px] opacity-30" />

      {/* Rough.js Layer - Moved down in z-index to be behind text/stickers but above image */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1080 1920"
      />

      {/* Top Title - Slightly moved up and scaled to avoid covering face */}
      <div className="absolute top-[8%] left-0 w-full px-12 z-30">
        <h2 className={`font-black uppercase italic text-[#ff1493] leading-none ${compact ? 'text-2xl' : 'text-6xl'}`}>
          HAPPY
        </h2>
        <h2 className={`font-black uppercase italic text-black leading-none mt-1 ${compact ? 'text-3xl' : 'text-7xl'}`} style={{ textShadow: '4px 4px 0px #ffd700' }}>
          BDAY
        </h2>
      </div>

      {/* Main Image - Pushed down slightly to clear the title */}
      <div className="absolute left-[15%] top-[32%] h-[38%] w-[70%] z-20 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        <div
          className="relative h-full w-full bg-white border-[3px] border-black"
        >
          <img
            src={imageSrc}
            alt="Birthday Subject"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: `contrast(${imageTransform.contrast}%) brightness(${imageTransform.brightness}%) saturate(1.1)`,
              transform: `translate3d(${imageTransform.x}%, ${imageTransform.y}%, 0) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
              transformOrigin: 'center center',
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Stickers - Repositioned to avoid covering the title */}
      <div className={`absolute right-[8%] top-[26%] z-50 rotate-12 bg-yellow-300 text-black font-black px-3 py-1 border-2 border-black ${compact ? 'text-[8px]' : 'text-lg'}`}>
        LIT!
      </div>
      <div className={`absolute left-[1%] top-[26%] z-50 -rotate-12 bg-[#00ced1] text-white font-black px-3 py-1 border-2 border-black shadow-[3px_3px_0px_black] ${compact ? 'text-[8px]' : 'text-lg'}`}>
        WOW!
      </div>

      {/* Bottom Message - Dynamic Year */}
      <div className="absolute bottom-[14%] left-0 w-full px-12 z-30">
        <div className="space-y-4">
          <p className={`font-mono font-bold text-black uppercase tracking-tighter ${compact ? 'text-[9px]' : 'text-xl'}`}>
            <span className="bg-[#ff1493] text-white px-3 py-1 inline-block">ANOTHER YEAR</span>
            <br />
            <div className="h-2" />
            <span className="bg-black text-white px-2 py-1 inline-block">OLDER & BOLDER</span>
          </p>
        </div>
        <div className={`mt-12 flex items-center gap-4 ${compact ? 'opacity-0' : 'opacity-30'}`}>
          <div className="h-[1px] flex-1 bg-black" />
          <span className="text-black text-[9px] font-black italic tracking-[0.3em]">EST. {new Date().getFullYear()}</span>
          <div className="h-[1px] flex-1 bg-black" />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full text-center z-50">
        <span className="text-[7px] font-black uppercase tracking-[0.8em] text-zinc-400">
          VELYN STUDIO
        </span>
      </div>
    </div>
  );
}