import { useEffect, useRef, type CSSProperties, type PointerEvent, type PointerEventHandler } from 'react';
import rough from 'roughjs';
import type { ImageTransform } from './imageTransform';

type RoughSvg = ReturnType<typeof rough.svg>;

type Food4PosterProps = {
  className?: string;
  compact?: boolean;
  mainTitle?: string;
  subtitle?: string;
  badgeText?: string;
  price?: string;
  footerText?: string;
  imageSrc?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  imageTransform?: ImageTransform;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  onElementPointerDown?: (id: string, event: PointerEvent<HTMLDivElement>) => void;
  // Editable positions
  mainTitleTransform?: { x: number; y: number; scale: number };
  subtitleTransform?: { x: number; y: number; scale: number };
  badgeTextTransform?: { x: number; y: number; scale: number };
  priceTransform?: { x: number; y: number; scale: number };
  footerTextTransform?: { x: number; y: number; scale: number };
};

function append(parent: SVGSVGElement, node: SVGElement) {
  parent.appendChild(node);
}

// Function to draw a sketchy starburst
function drawStarburst(rc: RoughSvg, svg: SVGSVGElement, cx: number, cy: number, radius: number, points: number, color: string, strokeColor: string) {
  let path = '';
  const outerRadius = radius;
  const innerRadius = radius * 0.85;
  
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / points;
    const x = cx + r * Math.sin(angle);
    const y = cy + r * Math.cos(angle);
    if (i === 0) path += `M ${x} ${y}`;
    else path += ` L ${x} ${y}`;
  }
  path += ' Z';
  
  append(svg, rc.path(path, {
    fill: color,
    fillStyle: 'zigzag',
    stroke: strokeColor,
    strokeWidth: 4,
    roughness: 2.5,
  }));
}

export function Food4Poster({
  className = '',
  compact = false,
  mainTitle = 'CRISPY\nSLICE',
  subtitle = 'HANDCRAFTED',
  badgeText = 'NOW ONLY',
  price = '₱249',
  footerText = 'VISIT US AT\n@SKETCHY_BITES',
  imageSrc = '/images/food/pizza.png', 
  primaryColor = '#E9C46A', // Mustard Yellow
  secondaryColor = '#2A9D8F', // Teal
  accentColor = '#E76F51', // Coral Red
  imageTransform = { brightness: 100, contrast: 100, rotate: 0, scale: 100, x: 0, y: 0 },
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onElementPointerDown,
  mainTitleTransform = { x: 0, y: 0, scale: 1 },
  subtitleTransform = { x: 0, y: 0, scale: 1 },
  badgeTextTransform = { x: 0, y: 0, scale: 1 },
  priceTransform = { x: 0, y: 0, scale: 1 },
  footerTextTransform = { x: 0, y: 0, scale: 1 },
}: Food4PosterProps) {

  const svgBgRef = useRef<SVGSVGElement>(null);
  const svgFgRef = useRef<SVGSVGElement>(null);
  const priceSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Load Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Caveat:wght@700&display=swap';
    link.rel = 'stylesheet';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const svg = svgBgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);

    // Background Base color
    append(svg, rc.rectangle(0, 0, 1080, 1920, { 
      fill: secondaryColor, 
      fillStyle: 'solid', 
      stroke: 'none' 
    }));

    // Sketchy grid background
    for (let i = 0; i < 1080; i += 80) {
      append(svg, rc.line(i, 0, i, 1920, { stroke: '#000000', strokeWidth: 1, roughness: 3, strokeLineDash: [10, 10], opacity: 0.1 }));
    }
    for (let i = 0; i < 1920; i += 80) {
      append(svg, rc.line(0, i, 1080, i, { stroke: '#000000', strokeWidth: 1, roughness: 3, strokeLineDash: [10, 10], opacity: 0.1 }));
    }

    // Huge wavy blob behind everything
    append(svg, rc.circle(540, 960, 1100, {
      fill: primaryColor,
      fillStyle: 'hachure',
      hachureAngle: 60,
      hachureGap: 15,
      stroke: 'none',
      roughness: 3
    }));

    // Outer sketchy border
    append(svg, rc.rectangle(30, 30, 1020, 1860, {
      stroke: '#1A1A1A',
      strokeWidth: 8,
      roughness: 2.5,
      bowing: 2
    }));

    // Arrow pointing down to food
    append(svg, rc.path('M 650 400 Q 750 480 680 620', { stroke: accentColor, strokeWidth: 6, roughness: 2 }));
    append(svg, rc.linearPath([[720, 560], [680, 620], [640, 580]], { stroke: accentColor, strokeWidth: 6, roughness: 2 }));

    // Sparkles & Stars to fill empty space
    append(svg, rc.path('M 150 300 L 200 400 L 100 400 Z', { stroke: accentColor, strokeWidth: 4, fill: accentColor, fillStyle: 'solid', roughness: 2 }));
    append(svg, rc.path('M 900 1600 L 950 1700 L 850 1700 Z', { stroke: primaryColor, strokeWidth: 4, fill: primaryColor, fillStyle: 'solid', roughness: 2 }));
    
    // Redesigned center doodles - smaller and less bloated
    
    // Small sparkle top-right near "SUPER TASTY"
    append(svg, rc.path('M 850 700 L 860 730 L 890 740 L 860 750 L 850 780 L 840 750 L 810 740 L 840 730 Z', { 
      stroke: accentColor, 
      strokeWidth: 3, 
      fill: primaryColor, 
      fillStyle: 'solid', 
      roughness: 2 
    }));

    // Small sparkle middle-left
    append(svg, rc.path('M 250 850 L 255 870 L 275 875 L 255 880 L 250 900 L 245 880 L 225 875 L 245 870 Z', { 
      stroke: '#1A1A1A', 
      strokeWidth: 3, 
      fill: accentColor, 
      fillStyle: 'solid', 
      roughness: 2 
    }));

    // Three tiny ink dots near "100% FRESH"
    append(svg, rc.circle(180, 1150, 8, { fill: '#1A1A1A', fillStyle: 'solid', stroke: 'none' }));
    append(svg, rc.circle(210, 1170, 5, { fill: accentColor, fillStyle: 'solid', stroke: 'none' }));
    append(svg, rc.circle(160, 1180, 10, { fill: primaryColor, fillStyle: 'solid', stroke: 'none' }));
    
  }, [primaryColor, secondaryColor, accentColor]);

  useEffect(() => {
    const svg = svgFgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);

    // Title Background Block (rough rectangle)
    append(svg, rc.rectangle(80, 150, 920, 250, {
      fill: '#1A1A1A',
      fillStyle: 'solid',
      stroke: accentColor,
      strokeWidth: 5,
      roughness: 3,
      bowing: 1.5
    }));

    // Subtitle background (sketchy pill)
    append(svg, rc.rectangle(340, 80, 400, 80, {
      fill: accentColor,
      fillStyle: 'solid',
      stroke: '#1A1A1A',
      strokeWidth: 4,
      roughness: 2.5
    }));

    // Footer banner
    append(svg, rc.path('M 50 1700 L 1030 1680 L 1010 1800 L 80 1820 Z', {
      fill: '#1A1A1A',
      fillStyle: 'zigzag',
      hachureGap: 8,
      stroke: '#1A1A1A',
      strokeWidth: 6,
      roughness: 2.5
    }));
    
  }, [primaryColor, secondaryColor, accentColor]);

  useEffect(() => {
    const svg = priceSvgRef.current;
    if (!svg) return;
    svg.innerHTML = '';
    const rc = rough.svg(svg);
    // Draw starburst centered in a 200x200 viewBox
    drawStarburst(rc, svg, 100, 100, 90, 12, primaryColor, '#1A1A1A');
  }, [primaryColor]);

  return (
    <div
      className={`@container relative isolate aspect-[9/16] overflow-hidden ${className}`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ backgroundColor: secondaryColor }}
    >
      
      {/* Rough JS Background Accents */}
      <svg ref={svgBgRef} viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Rough JS Foreground Elements */}
      <svg ref={svgFgRef} viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Typography Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col font-['Permanent_Marker'] tracking-widest text-[#1A1A1A]">
        
        {/* Subtitle */}
        <div className="absolute top-[4.5%] w-full flex justify-center pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${subtitleTransform.x}px, ${subtitleTransform.y}px) scale(${subtitleTransform.scale}) rotate(-2deg)`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('subtitle', e)}
          >
            <p className={`font-['Caveat'] font-bold text-white whitespace-pre-line tracking-wider ${compact ? 'text-[9px]' : 'text-[3.5cqw]'}`}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Main Title */}
        <div className="absolute top-[8.5%] w-full flex justify-center pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${mainTitleTransform.x}px, ${mainTitleTransform.y}px) scale(${mainTitleTransform.scale}) rotate(-1deg)`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('mainTitle', e)}
          >
            <h1 className={`font-normal leading-[0.9] text-[var(--food4-primary)] whitespace-pre-line ${compact ? 'text-[22px]' : 'text-[12cqw]'}`}
                style={{ color: primaryColor }}>
              {mainTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Image Layer (Hero Food) */}
      <div
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        onPointerDown={onPointerDown}
      >
        <div className={`relative aspect-square mt-[8%] ${compact ? 'w-[75%]' : 'w-[85%]'}`}>
          <img
            src={imageSrc}
            alt="Hero Food"
            className="w-full h-full object-contain pointer-events-auto cursor-grab active:cursor-grabbing drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
            style={{
              filter: `brightness(${imageTransform.brightness}%) contrast(${imageTransform.contrast}%)`,
              transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
              transformOrigin: 'center center',
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Overlay Badges & Footer */}
      <div className="absolute inset-0 z-40 pointer-events-none flex flex-col font-['Permanent_Marker'] text-[#1A1A1A]">
        
        {/* Decorative text to fill space (Moved to z-40) */}
        <div className="absolute top-[62%] left-[8%] -rotate-12 pointer-events-none opacity-90 drop-shadow-md">
          <p className={`font-['Caveat'] font-bold text-[var(--food4-accent)] ${compact ? 'text-[16px]' : 'text-[6cqw]'}`} style={{ color: accentColor }}>
            100% FRESH!
          </p>
        </div>
        <div className="absolute top-[32%] right-[5%] rotate-12 pointer-events-none opacity-90 drop-shadow-md">
          <p className={`font-['Caveat'] font-bold text-white ${compact ? 'text-[14px]' : 'text-[5cqw]'}`}>
            SUPER TASTY
          </p>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-[14%] right-[5%] pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto flex flex-col items-center justify-center text-center relative"
            style={{
              width: compact ? '85px' : '36cqw',
              height: compact ? '85px' : '36cqw',
              transform: `translate(${priceTransform.x}px, ${priceTransform.y}px) scale(${priceTransform.scale}) rotate(12deg)`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('price', e)}
          >
             <svg ref={priceSvgRef} viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-0 drop-shadow-xl" />
             <div 
               className="cursor-grab active:cursor-grabbing pointer-events-auto text-center z-10"
               style={{
                 transform: `translate(${badgeTextTransform.x}px, ${badgeTextTransform.y}px) scale(${badgeTextTransform.scale})`,
               }}
               onPointerDown={(e) => {
                 e.stopPropagation();
                 onElementPointerDown?.('badgeText', e);
               }}
             >
                <p className={`font-['Caveat'] text-white whitespace-pre-line tracking-widest ${compact ? 'text-[9px]' : 'text-[4cqw]'}`}>
                  {badgeText}
                </p>
             </div>
             <p className={`font-normal leading-none z-10 ${compact ? 'text-[20px]' : 'text-[10cqw]'}`}>
               {price}
             </p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-[5.5%] w-full flex justify-center pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${footerTextTransform.x}px, ${footerTextTransform.y}px) scale(${footerTextTransform.scale}) rotate(1deg)`,
              transformOrigin: 'center bottom'
            }}
            onPointerDown={(e) => onElementPointerDown?.('footerText', e)}
          >
            <p className={`font-normal text-white whitespace-pre-line tracking-widest ${compact ? 'text-[7px]' : 'text-[4cqw]'}`}>
              {footerText}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
