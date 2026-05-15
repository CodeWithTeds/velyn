import { useEffect, useRef, type CSSProperties, type PointerEvent, type PointerEventHandler } from 'react';
import rough from 'roughjs';
import type { ImageTransform } from './imageTransform';

type RoughSvg = ReturnType<typeof rough.svg>;

type Food1PosterProps = {
  className?: string;
  compact?: boolean;
  mainTitle?: string;
  subTitle?: string;
  openHours?: string;
  price?: string;
  handle?: string;
  imageSrc?: string;
  primaryColor?: string;
  secondaryColor?: string;
  imageTransform?: ImageTransform;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  onElementPointerDown?: (id: string, event: PointerEvent<HTMLDivElement>) => void;
  // Editable positions
  mainTitleTransform?: { x: number; y: number; scale: number };
  subTitleTransform?: { x: number; y: number; scale: number };
  hoursTransform?: { x: number; y: number; scale: number };
  priceTransform?: { x: number; y: number; scale: number };
  handleTransform?: { x: number; y: number; scale: number };
};

function append(parent: SVGSVGElement, node: SVGElement) {
  parent.appendChild(node);
}

function drawSpark(rc: RoughSvg, svg: SVGSVGElement, x: number, y: number, size: number, stroke: string) {
  append(svg, rc.path(
    `M ${x} ${y - size} C ${x + size * 0.18} ${y - size * 0.26} ${x + size * 0.26} ${y - size * 0.18} ${x + size} ${y}
     C ${x + size * 0.26} ${y + size * 0.18} ${x + size * 0.18} ${y + size * 0.26} ${x} ${y + size}
     C ${x - size * 0.18} ${y + size * 0.26} ${x - size * 0.26} ${y + size * 0.18} ${x - size} ${y}
     C ${x - size * 0.26} ${y - size * 0.18} ${x - size * 0.18} ${y - size * 0.26} ${x} ${y - size} Z`,
    { fill: stroke, fillStyle: 'solid', roughness: 1.5, stroke, strokeWidth: 2 },
  ));
}

function drawArrow(rc: RoughSvg, svg: SVGSVGElement, path: string, head: [[number, number], [number, number], [number, number]], color: string) {
  append(svg, rc.path(path, {
    bowing: 2,
    roughness: 2.2,
    stroke: color,
    strokeWidth: 6,
  }));
  append(svg, rc.linearPath(head, {
    bowing: 1.5,
    roughness: 2,
    stroke: color,
    strokeWidth: 6,
  }));
}

export function Food1Poster({
  className = '',
  compact = false,
  mainTitle = 'CUP\nCAKE',
  subTitle = 'Strawberry + Vanilla',
  openHours = 'Open Daily\n9 AM - 10 PM',
  price = 'Get Now\nIDR 10K',
  handle = '@bakery_delight',
  imageSrc = '/images/food/cupcake.png',
  primaryColor = '#b53d5a',
  secondaryColor = '#f9f5f0',
  imageTransform = { brightness: 100, contrast: 100, rotate: 0, scale: 100, x: 0, y: 0 },
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onElementPointerDown,
  mainTitleTransform = { x: 0, y: 0, scale: 1 },
  subTitleTransform = { x: 0, y: 0, scale: 1 },
  hoursTransform = { x: 0, y: 0, scale: 1 },
  priceTransform = { x: 0, y: 0, scale: 1 },
  handleTransform = { x: 0, y: 0, scale: 1 },
}: Food1PosterProps) {

  const svgBgRef = useRef<SVGSVGElement>(null);
  const priceSvgRef = useRef<SVGSVGElement>(null);
  const subTitleSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgBgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);

    // Dynamic looping background elements
    append(svg, rc.path('M -50 700 C 300 500, 600 900, 1200 600', {
      stroke: primaryColor,
      strokeWidth: 4,
      strokeLineDash: [15, 15],
      roughness: 2
    }));

    // Tape mark doodles
    append(svg, rc.path('M 90 120 L 250 100 L 240 160 L 80 180 Z', { fill: primaryColor, fillStyle: 'hachure', hachureAngle: -45, hachureGap: 5, stroke: 'none', roughness: 2 }));

    // Decorative sketchy ellipses & scribbles
    append(svg, rc.ellipse(880, 150, 60, 80, { roughness: 2.5, stroke: primaryColor, strokeWidth: 5 }));
    append(svg, rc.circle(880, 150, 15, { fill: primaryColor, fillStyle: 'solid', stroke: primaryColor }));
    append(svg, rc.rectangle(850, 1650, 100, 100, { stroke: secondaryColor, strokeWidth: 4, roughness: 2.5 }));
    append(svg, rc.line(850, 1650, 950, 1750, { stroke: secondaryColor, strokeWidth: 4, roughness: 2.5 }));

    // A fun zigzag doodle
    append(svg, rc.path('M 120 1650 L 160 1600 L 200 1650 L 240 1600 L 280 1650', { stroke: secondaryColor, strokeWidth: 6, roughness: 2 }));

    // Sparkles / Stars using Template4 logic
    drawSpark(rc, svg, 220, 1300, 35, secondaryColor);
    drawSpark(rc, svg, 900, 1550, 45, secondaryColor);
    drawSpark(rc, svg, 920, 450, 50, primaryColor);
    drawSpark(rc, svg, 150, 850, 25, secondaryColor);

    // Hand-drawn arrows pointing to the hero food
    drawArrow(rc, svg, 'M 980 850 C 920 900 860 920 780 960', [[810, 940], [775, 965], [800, 980]], secondaryColor);
    drawArrow(rc, svg, 'M 150 1450 C 200 1300 400 1250 480 1200', [[450, 1225], [485, 1195], [440, 1190]], secondaryColor);

  }, [primaryColor, secondaryColor]);

  useEffect(() => {
    const svg = priceSvgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);

    // Double sketchy box for the price tag
    svg.appendChild(rc.rectangle(10, 10, 280, 100, { fill: secondaryColor, fillStyle: 'solid', stroke: primaryColor, strokeWidth: 4, roughness: 2 }));
    svg.appendChild(rc.rectangle(0, 0, 290, 110, { stroke: primaryColor, strokeWidth: 3, roughness: 3, strokeLineDash: [8, 8] }));
  }, [secondaryColor, primaryColor]);

  useEffect(() => {
    const svg = subTitleSvgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);

    // Solid sketchy highlight box to guarantee text visibility regardless of background
    svg.appendChild(rc.rectangle(8, 8, 384, 64, { fill: primaryColor, fillStyle: 'solid', stroke: primaryColor, strokeWidth: 3, roughness: 2.5 }));
    // Decorative squiggle below the box
    svg.appendChild(rc.path('M 20 75 Q 200 95 380 70', { stroke: secondaryColor, strokeWidth: 4, roughness: 2 }));
  }, [primaryColor, secondaryColor]);

  return (
    <div
      className={`@container relative isolate aspect-[9/16] overflow-hidden text-ink ${className}`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        '--food1-pink': primaryColor,
        '--food1-cream': secondaryColor,
      } as CSSProperties}
    >
      {/* Background Split - Sharp diagonal geometry */}
      <svg viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <rect width="1080" height="1920" fill="var(--food1-cream)" />
        <path d="M 0 950 L 1080 500 L 1080 1920 L 0 1920 Z" fill="var(--food1-pink)" />
      </svg>

      {/* Rough JS Background Accents */}
      <svg ref={svgBgRef} viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Main Content Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col">

        {/* Typography - Top Left */}
        <div className="absolute top-[6%] left-[6%] z-30 flex flex-col pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              transform: `translate(${mainTitleTransform.x}px, ${mainTitleTransform.y}px) scale(${mainTitleTransform.scale})`,
              transformOrigin: 'left top'
            }}
            onPointerDown={(e) => onElementPointerDown?.('mainTitle', e)}
          >
            <h1 className={`font-['Anton'] leading-[0.85] text-[var(--food1-pink)] uppercase whitespace-pre-line tracking-tight drop-shadow-md ${compact ? 'text-[38px]' : 'text-[24cqw]'}`}>
              {mainTitle}
            </h1>
          </div>

          {/* Subtitle with guaranteed visibility via roughJS background block */}
          <div
            className={`relative cursor-grab active:cursor-grabbing pointer-events-auto self-start ${compact ? 'mt-[6px]' : 'mt-[3cqw]'}`}
            style={{
              transform: `translate(${subTitleTransform.x}px, ${subTitleTransform.y}px) scale(${subTitleTransform.scale})`,
              transformOrigin: 'left top'
            }}
            onPointerDown={(e) => onElementPointerDown?.('subTitle', e)}
          >
            <svg ref={subTitleSvgRef} viewBox="0 0 400 80" className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none z-0" preserveAspectRatio="none" />
            <h2 className={`relative z-10 font-['Dancing_Script'] text-[var(--food1-cream)] leading-none px-4 py-2 drop-shadow-sm ${compact ? 'text-[13px]' : 'text-[8cqw]'}`}>
              {subTitle}
            </h2>
          </div>
        </div>

        {/* Operating Hours - Bottom Left */}
        <div className="absolute bottom-[22%] left-[6%] z-30 flex flex-col pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              transform: `translate(${hoursTransform.x}px, ${hoursTransform.y}px) scale(${hoursTransform.scale})`,
              transformOrigin: 'left bottom'
            }}
            onPointerDown={(e) => onElementPointerDown?.('hours', e)}
          >
            <div className={`bg-[var(--food1-cream)] shadow-xl border-4 border-[var(--food1-pink)] -rotate-3 ${compact ? 'px-2 py-1.5 rounded-br-[6px] rounded-tl-[6px]' : 'px-[5cqw] py-[4cqw] rounded-br-[6cqw] rounded-tl-[6cqw]'}`}>
              <p className={`font-['Anton'] leading-snug text-[var(--food1-pink)] uppercase whitespace-pre-line text-center tracking-wider ${compact ? 'text-[7px]' : 'text-[4.5cqw]'}`}>
                {openHours}
              </p>
            </div>
          </div>
        </div>

        {/* Price Badge - Middle Right */}
        <div className="absolute bottom-[35%] right-[6%] z-30 flex flex-col pointer-events-none">
          <div
            className={`relative cursor-grab active:cursor-grabbing pointer-events-auto flex items-center justify-center aspect-[300/120] rotate-6 ${compact ? 'w-[70px]' : 'w-[35cqw]'}`}
            style={{
              transform: `translate(${priceTransform.x}px, ${priceTransform.y}px) scale(${priceTransform.scale})`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('price', e)}
          >
            <svg ref={priceSvgRef} viewBox="0 0 300 120" className="absolute inset-0 w-full h-full pointer-events-none z-0 drop-shadow-xl" preserveAspectRatio="none" />
            <p className={`relative z-10 font-['Anton'] leading-tight text-[var(--food1-pink)] uppercase whitespace-pre-line text-center px-4 ${compact ? 'text-[8px]' : 'text-[5cqw]'}`}>
              {price}
            </p>
          </div>
        </div>

        {/* Social Handle - Footer */}
        <div className="absolute bottom-[4%] w-full flex justify-center z-30 pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              transform: `translate(${handleTransform.x}px, ${handleTransform.y}px) scale(${handleTransform.scale})`,
              transformOrigin: 'center bottom'
            }}
            onPointerDown={(e) => onElementPointerDown?.('handle', e)}
          >
            <p className={`font-['Inter'] font-bold tracking-[0.2em] text-[var(--food1-cream)] uppercase bg-[var(--food1-pink)] rounded-full border-[3px] border-[var(--food1-cream)] shadow-lg ${compact ? 'text-[5px] px-3 py-1' : 'text-[3cqw] px-[6cqw] py-[2cqw]'}`}>
              {handle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Image Layer (Hero Food) */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        onPointerDown={onPointerDown}
      >
        <div className="relative w-[85%] aspect-square mt-[18%]">
          <img
            src={imageSrc}
            alt="Hero Food"
            className="w-full h-full object-contain pointer-events-auto cursor-grab active:cursor-grabbing drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
            style={{
              filter: `brightness(${imageTransform.brightness}%) contrast(${imageTransform.contrast}%)`,
              transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
              transformOrigin: 'center center',
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
