import { useEffect, useRef, type CSSProperties, type PointerEvent, type PointerEventHandler } from 'react';
import rough from 'roughjs';
import type { ImageTransform } from './imageTransform';

type RoughSvg = ReturnType<typeof rough.svg>;

type Food2PosterProps = {
  className?: string;
  compact?: boolean;
  mainTitle?: string;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  footerLabel?: string;
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
  label1Transform?: { x: number; y: number; scale: number };
  label2Transform?: { x: number; y: number; scale: number };
  label3Transform?: { x: number; y: number; scale: number };
  label4Transform?: { x: number; y: number; scale: number };
  footerLabelTransform?: { x: number; y: number; scale: number };
};

function append(parent: SVGSVGElement, node: SVGElement) {
  parent.appendChild(node);
}

function drawStar(rc: RoughSvg, svg: SVGSVGElement, cx: number, cy: number, r: number, color: string) {
  const points = [];
  const spikes = 5;
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? r : r / 2;
    const angle = (Math.PI / spikes) * i - Math.PI / 2;
    points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius] as [number, number]);
  }
  append(svg, rc.polygon(points, { stroke: color, strokeWidth: 3, roughness: 2 }));
}

function drawHeart(rc: RoughSvg, svg: SVGSVGElement, x: number, y: number, size: number, color: string) {
  const path = `M ${x} ${y} C ${x} ${y - size}, ${x - size * 1.5} ${y - size}, ${x - size * 1.5} ${y + size * 0.5} 
                C ${x - size * 1.5} ${y + size * 1.5}, ${x} ${y + size * 2.5}, ${x} ${y + size * 3}
                C ${x} ${y + size * 2.5}, ${x + size * 1.5} ${y + size * 1.5}, ${x + size * 1.5} ${y + size * 0.5}
                C ${x + size * 1.5} ${y - size}, ${x} ${y - size}, ${x} ${y}`;
  append(svg, rc.path(path, { stroke: color, strokeWidth: 3, roughness: 2 }));
}

function drawFlower(rc: RoughSvg, svg: SVGSVGElement, x: number, y: number, r: number, color: string) {
  append(svg, rc.circle(x, y, r * 0.8, { stroke: color, strokeWidth: 3, roughness: 2 }));
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 / 5) * i;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    append(svg, rc.circle(px, py, r, { stroke: color, strokeWidth: 3, roughness: 2 }));
  }
}

function drawArrow(rc: RoughSvg, svg: SVGSVGElement, startX: number, startY: number, cpX: number, cpY: number, endX: number, endY: number, color: string) {
  // Arrow curve
  append(svg, rc.path(`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`, {
    stroke: color,
    strokeWidth: 5,
    roughness: 2.5,
  }));
  
  // Arrow head calculations
  const angle = Math.atan2(endY - cpY, endX - cpX);
  const headLen = 25;
  const a1 = angle - Math.PI / 7;
  const a2 = angle + Math.PI / 7;
  
  append(svg, rc.line(endX, endY, endX - headLen * Math.cos(a1), endY - headLen * Math.sin(a1), { stroke: color, strokeWidth: 5, roughness: 2 }));
  append(svg, rc.line(endX, endY, endX - headLen * Math.cos(a2), endY - headLen * Math.sin(a2), { stroke: color, strokeWidth: 5, roughness: 2 }));
}

export function Food2Poster({
  className = '',
  compact = false,
  mainTitle = 'Wholesome\nMorning',
  label1 = 'FRESH\nGREENS',
  label2 = 'PROTEIN\nPACKED',
  label3 = 'CRISPY\nTOAST',
  label4 = 'AVO\nGOODNESS',
  footerLabel = 'MORNING\nFUEL',
  imageSrc = '/images/food/egg.png',
  primaryColor = '#aab293', // Closer to reference
  secondaryColor = '#ffffff',
  imageTransform = { brightness: 100, contrast: 100, rotate: 0, scale: 100, x: 0, y: 0 },
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onElementPointerDown,
  mainTitleTransform = { x: 0, y: 0, scale: 1 },
  label1Transform = { x: 0, y: 0, scale: 1 },
  label2Transform = { x: 0, y: 0, scale: 1 },
  label3Transform = { x: 0, y: 0, scale: 1 },
  label4Transform = { x: 0, y: 0, scale: 1 },
  footerLabelTransform = { x: 0, y: 0, scale: 1 },
}: Food2PosterProps) {

  const svgBgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Load Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Kalam:wght@700&display=swap';
    link.rel = 'stylesheet';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const svg = svgBgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);

    // Wavy aroma lines over the egg (centered around 540, 960)
    append(svg, rc.path('M 470 900 Q 440 850 470 800 T 440 700', { stroke: secondaryColor, strokeWidth: 4, roughness: 2 }));
    append(svg, rc.path('M 540 910 Q 510 860 540 810 T 510 710', { stroke: secondaryColor, strokeWidth: 4, roughness: 2 }));
    append(svg, rc.path('M 610 920 Q 580 870 610 820 T 580 720', { stroke: secondaryColor, strokeWidth: 4, roughness: 2 }));

    // Main circling lines around the plate/toast
    // Tighter organic solid shape tracing the food
    append(svg, rc.path('M 380 840 C 480 680, 720 700, 760 900 C 780 1080, 620 1180, 440 1140 C 310 1060, 300 940, 380 840', { stroke: secondaryColor, strokeWidth: 4, roughness: 1.5 }));
    
    // Tighter dashed circle tracing the food
    append(svg, rc.circle(540, 960, 620, { stroke: secondaryColor, strokeWidth: 3, roughness: 2.5, strokeLineDash: [15, 12] }));

    // Decorative Elements
    drawStar(rc, svg, 180, 850, 16, secondaryColor);
    drawStar(rc, svg, 780, 580, 16, secondaryColor);
    
    drawHeart(rc, svg, 650, 880, 12, secondaryColor);
    drawHeart(rc, svg, 360, 1150, 12, secondaryColor);

    drawFlower(rc, svg, 580, 580, 10, secondaryColor);
    drawFlower(rc, svg, 560, 1280, 10, secondaryColor);

    // Arrows pointing from text labels to food
    // Label 1 Arrow (Top Left) - Starts right/below "GREENS"
    drawArrow(rc, svg, 330, 610, 380, 680, 420, 750, secondaryColor);
    
    // Label 2 Arrow (Top Right) - Starts left/below "PACKED"
    drawArrow(rc, svg, 760, 690, 700, 720, 620, 770, secondaryColor);

    // Label 3 Arrow (Bottom Left) - Starts right/above "TOAST"
    drawArrow(rc, svg, 330, 1310, 280, 1200, 350, 1120, secondaryColor);

    // Label 4 Arrow (Bottom Right) - Starts left/above "GOODNESS"
    drawArrow(rc, svg, 750, 1260, 780, 1160, 680, 1080, secondaryColor);

    // Footer Box
    append(svg, rc.path('M 360 1560 Q 540 1540 720 1560 Q 740 1600 720 1640 Q 540 1660 360 1640 Q 340 1600 360 1560', { 
      stroke: secondaryColor, 
      strokeWidth: 4, 
      roughness: 2,
      strokeLineDash: [15, 12]
    }));

  }, [primaryColor, secondaryColor]);

  return (
    <div
      className={`@container relative isolate aspect-[9/16] overflow-hidden text-white ${className}`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        backgroundColor: primaryColor,
        '--food2-color': secondaryColor,
      } as CSSProperties}
    >
      
      {/* Main Title Layer - Static */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-col font-['Kalam'] tracking-wide">
        {/* Main Title - Top Center */}
        <div className="absolute top-[8%] w-full flex justify-center pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${mainTitleTransform.x}px, ${mainTitleTransform.y}px) scale(${mainTitleTransform.scale})`,
              transformOrigin: 'center top'
            }}
            onPointerDown={(e) => onElementPointerDown?.('mainTitle', e)}
          >
            <h1 className={`font-bold leading-[1.05] text-[var(--food2-color)] whitespace-pre-line drop-shadow-md ${compact ? 'text-[24px]' : 'text-[16cqw]'}`}>
              {mainTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Layer - Shifted Down */}
      <div className="absolute inset-0 pointer-events-none translate-y-[6%]">
        
        {/* Rough JS Overlay */}
        <svg ref={svgBgRef} viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full pointer-events-none z-30 drop-shadow-md" />

        {/* Main Image Layer (Hero Food) */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          onPointerDown={onPointerDown}
        >
          <div className="relative w-[85%] aspect-square mt-[2%]">
            <img
              src={imageSrc}
              alt="Hero Food"
              className="w-full h-full object-contain pointer-events-auto cursor-grab active:cursor-grabbing drop-shadow-[0_40px_60px_rgba(0,0,0,0.4)]"
              style={{
                filter: `brightness(${imageTransform.brightness}%) contrast(${imageTransform.contrast}%)`,
                transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
                transformOrigin: 'center center',
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* Labels Content Layer */}
        <div className="absolute inset-0 z-40 pointer-events-none flex flex-col font-['Kalam'] tracking-wide">

        {/* Label 1 - Top Left */}
        <div className="absolute top-[27%] left-[6%] pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${label1Transform.x}px, ${label1Transform.y}px) scale(${label1Transform.scale})`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('label1', e)}
          >
            <p className={`font-bold leading-[1.05] text-[var(--food2-color)] whitespace-pre-line drop-shadow-sm uppercase ${compact ? 'text-[9px]' : 'text-[5.5cqw]'}`}>
              {label1}
            </p>
          </div>
        </div>

        {/* Label 2 - Top Right */}
        <div className="absolute top-[32%] right-[6%] pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${label2Transform.x}px, ${label2Transform.y}px) scale(${label2Transform.scale})`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('label2', e)}
          >
            <p className={`font-bold leading-[1.05] text-[var(--food2-color)] whitespace-pre-line drop-shadow-sm uppercase ${compact ? 'text-[9px]' : 'text-[5.5cqw]'}`}>
              {label2}
            </p>
          </div>
        </div>

        {/* Label 3 - Bottom Left */}
        <div className="absolute bottom-[25%] left-[8%] pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${label3Transform.x}px, ${label3Transform.y}px) scale(${label3Transform.scale})`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('label3', e)}
          >
            <p className={`font-bold leading-[1.05] text-[var(--food2-color)] whitespace-pre-line drop-shadow-sm uppercase ${compact ? 'text-[10px]' : 'text-[6cqw]'}`}>
              {label3}
            </p>
          </div>
        </div>

        {/* Label 4 - Bottom Right */}
        <div className="absolute bottom-[28%] right-[10%] pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${label4Transform.x}px, ${label4Transform.y}px) scale(${label4Transform.scale})`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('label4', e)}
          >
            <p className={`font-bold leading-[1.05] text-[var(--food2-color)] whitespace-pre-line drop-shadow-sm uppercase ${compact ? 'text-[10px]' : 'text-[6cqw]'}`}>
              {label4}
            </p>
          </div>
        </div>

        {/* Footer Label */}
        <div className="absolute top-[83.33%] w-full flex justify-center pointer-events-none -translate-y-1/2">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${footerLabelTransform.x}px, ${footerLabelTransform.y}px) scale(${footerLabelTransform.scale})`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('footerLabel', e)}
          >
            <p className={`font-bold leading-[1.05] text-[var(--food2-color)] whitespace-pre-line drop-shadow-sm uppercase tracking-wide ${compact ? 'text-[9px]' : 'text-[5.5cqw]'}`}>
              {footerLabel}
            </p>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
