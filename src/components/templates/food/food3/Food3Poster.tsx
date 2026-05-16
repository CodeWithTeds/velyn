import { useEffect, type CSSProperties, type PointerEvent, type PointerEventHandler } from 'react';
import type { ImageTransform } from './imageTransform';

type Food3PosterProps = {
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

export function Food3Poster({
  className = '',
  compact = false,
  mainTitle = 'SUPER\nSPICY',
  subtitle = 'NEW ARRIVAL',
  badgeText = 'ONLY',
  price = '₱199',
  footerText = 'ORDER NOW AT \nWWW.TASTYEATS.COM',
  imageSrc = '/images/food/burger.png', // Fallback, editor will use burger or default
  primaryColor = '#E63946', // Vibrant Red
  secondaryColor = '#1D3557', // Dark Navy
  accentColor = '#FFB703', // Bold Yellow
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
}: Food3PosterProps) {

  useEffect(() => {
    // Load Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,800;1,900&display=swap';
    link.rel = 'stylesheet';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className={`@container relative isolate aspect-[9/16] overflow-hidden ${className}`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        backgroundColor: primaryColor,
        '--food3-secondary': secondaryColor,
        '--food3-accent': accentColor,
      } as CSSProperties}
    >
      
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main dramatic angled split */}
        <div 
          className="absolute -top-[15%] -left-[20%] w-[150%] h-[75%] -rotate-6 origin-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ backgroundColor: 'var(--food3-secondary)' }}
        />
        
        {/* Halftone dot pattern overlay for premium texture */}
        <div 
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay" 
          style={{ 
            backgroundImage: 'radial-gradient(#fff 2.5px, transparent 2.5px)', 
            backgroundSize: '24px 24px' 
          }}
        />
        
        {/* Abstract light bursts */}
        <div 
          className="absolute top-[0%] right-[0%] w-[60%] aspect-square rounded-full mix-blend-overlay opacity-30 blur-[60px]"
          style={{ backgroundColor: 'var(--food3-accent)' }}
        />
        <div 
          className="absolute bottom-[0%] -left-[20%] w-[80%] aspect-square rounded-full mix-blend-overlay opacity-40 blur-[90px]"
          style={{ backgroundColor: 'var(--food3-accent)' }}
        />
        
        {/* Repeating text background element for modern street-style vibe */}
        <div className="absolute top-[35%] left-[-20%] -rotate-6 opacity-[0.04] text-white font-['Bebas_Neue'] text-[24cqw] leading-none whitespace-nowrap overflow-hidden select-none tracking-widest">
           FRESH • DELICIOUS • CRAVING • HOT • TASTY • FRESH • DELICIOUS
        </div>
      </div>

      {/* Main Title Layer - Behind Food */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col font-['Bebas_Neue'] tracking-wider">
        <div className="absolute top-[13%] w-full flex justify-center pointer-events-none">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto text-center"
            style={{
              transform: `translate(${mainTitleTransform.x}px, ${mainTitleTransform.y}px) scale(${mainTitleTransform.scale})`,
              transformOrigin: 'center center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('mainTitle', e)}
          >
            <h1 className={`font-normal leading-[0.85] text-[var(--food3-accent)] whitespace-pre-line ${compact ? 'text-[42px]' : 'text-[28cqw]'}`}
                style={{
                  // Sharp, thick outline and deep drop shadow for a punchy, premium look
                  textShadow: compact 
                    ? '0 4px 8px rgba(0,0,0,0.5), -1px -1px 0 #1A1A1A, 1px -1px 0 #1A1A1A, -1px 1px 0 #1A1A1A, 1px 1px 0 #1A1A1A'
                    : '0 12px 24px rgba(0,0,0,0.6), -3px -3px 0 #1A1A1A, 3px -3px 0 #1A1A1A, -3px 3px 0 #1A1A1A, 3px 3px 0 #1A1A1A'
                }}>
              {mainTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Image Layer (Hero Food) */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        onPointerDown={onPointerDown}
      >
        {/* Increased margin-top for better spacing from the top */}
        <div className={`relative aspect-square mt-[28%] ${compact ? 'w-[90%]' : 'w-[115%]'}`}>
          <img
            src={imageSrc}
            alt="Hero Food"
            className="w-full h-full object-contain pointer-events-auto cursor-grab active:cursor-grabbing drop-shadow-[0_50px_70px_rgba(0,0,0,0.7)]"
            style={{
              filter: `brightness(${imageTransform.brightness}%) contrast(${imageTransform.contrast}%) drop-shadow(0 0 30px rgba(255,255,255,0.1))`,
              transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
              transformOrigin: 'center center',
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Foreground Text & Badges Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col">
        
        {/* Subtitle - Top Left/Centerish with bold sticker effect */}
        <div className="absolute top-[4%] left-[4%] pointer-events-none font-['Montserrat']">
          <div
            className={`cursor-grab active:cursor-grabbing pointer-events-auto inline-block rounded-sm shadow-[4px_4px_0_rgba(0,0,0,0.9)] border-2 border-slate-950 ${compact ? 'px-3 py-1' : 'px-5 py-2'}`}
            style={{
              backgroundColor: 'var(--food3-accent)',
              color: 'var(--food3-secondary)',
              transform: `translate(${subtitleTransform.x}px, ${subtitleTransform.y}px) scale(${subtitleTransform.scale}) rotate(-4deg)`,
              transformOrigin: 'left center'
            }}
            onPointerDown={(e) => onElementPointerDown?.('subtitle', e)}
          >
            <p className={`font-black italic uppercase whitespace-pre-line tracking-wider ${compact ? 'text-[5px]' : 'text-[3cqw]'}`}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Price Badge Group */}
        <div className="absolute top-[48%] right-[4%] pointer-events-none">
          <div className="relative">
            {/* Price Transform handles the whole badge */}
            <div
              className="cursor-grab active:cursor-grabbing pointer-events-auto rounded-full flex flex-col items-center justify-center shadow-[10px_10px_0_rgba(0,0,0,0.3)] border-[5px] border-white"
              style={{
                backgroundColor: 'var(--food3-accent)',
                color: 'var(--food3-secondary)',
                width: compact ? '45px' : '28cqw',
                height: compact ? '45px' : '28cqw',
                transform: `translate(${priceTransform.x}px, ${priceTransform.y}px) scale(${priceTransform.scale}) rotate(10deg)`,
                transformOrigin: 'center center'
              }}
              onPointerDown={(e) => onElementPointerDown?.('price', e)}
            >
              {/* Inner dashed border for premium look */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-slate-900/20" />
              
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
                 <p className={`font-['Montserrat'] font-black uppercase leading-none tracking-widest ${compact ? 'text-[4px]' : 'text-[2.5cqw]'}`}>
                   {badgeText}
                 </p>
              </div>
              <p className={`font-['Bebas_Neue'] font-normal leading-none mt-1 z-10 ${compact ? 'text-[14px]' : 'text-[10cqw]'}`}
                 style={{ textShadow: compact ? '1px 1px 0 rgba(255,255,255,0.5)' : '2px 2px 0 rgba(255,255,255,0.5)' }}>
                {price}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-[6%] w-full flex justify-center pointer-events-none font-['Montserrat']">
          <div
            className={`cursor-grab active:cursor-grabbing pointer-events-auto text-center rounded-full bg-slate-950/40 backdrop-blur-md border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${compact ? 'px-3 py-1.5' : 'px-6 py-3'}`}
            style={{
              transform: `translate(${footerTextTransform.x}px, ${footerTextTransform.y}px) scale(${footerTextTransform.scale})`,
              transformOrigin: 'center bottom'
            }}
            onPointerDown={(e) => onElementPointerDown?.('footerText', e)}
          >
            <p className={`font-extrabold uppercase text-white whitespace-pre-line tracking-[0.3em] ${compact ? 'text-[5px]' : 'text-[2.5cqw]'}`}>
              {footerText}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
