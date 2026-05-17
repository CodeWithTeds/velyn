import { type CSSProperties, type PointerEvent, type PointerEventHandler } from 'react';

type Food5PosterProps = {
  className?: string;
  compact?: boolean;
  scriptTitle?: string;
  mainTitle?: string;
  badgeText?: string;
  phone?: string;
  website?: string;
  imageRightSrc?: string;
  imageLeftSrc?: string;
  primaryColor?: string;
  secondaryColor?: string;
  footerColor?: string;
  imageTransform?: { brightness: number; contrast: number; rotate: number; scale: number; x: number; y: number };
  imageLeftTransform?: { brightness: number; contrast: number; rotate: number; scale: number; x: number; y: number };
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  onElementPointerDown?: (id: string, event: PointerEvent<HTMLDivElement>) => void;
  // Transforms
  scriptTitleTransform?: { x: number; y: number; scale: number };
  mainTitleTransform?: { x: number; y: number; scale: number };
  badgeTransform?: { x: number; y: number; scale: number };
  companyName?: string;
  menuLeft?: Array<{ title: string; desc: string; price: string }>;
  menuSpecial?: Array<{ title: string; desc: string; price: string }>;
  menuRight?: Array<{ title: string; desc: string; price: string }>;
};

export function Food5Poster({
  className = '',
  compact = false,
  scriptTitle = 'Delicious',
  mainTitle = 'MENU',
  badgeText = '25%\nOFF',
  phone = '+123 4567 890',
  website = 'www.velyn.com',
  imageRightSrc = '/images/food/pizza.png',
  imageLeftSrc = '/images/food/burger.png',
  primaryColor = '#e62429', // Vibrant red
  secondaryColor = '#ff6b00', // Orange gradient stop
  footerColor = '#111111', // Black
  imageTransform = { brightness: 100, contrast: 100, rotate: 0, scale: 100, x: 0, y: 0 },
  imageLeftTransform = { brightness: 100, contrast: 100, rotate: 0, scale: 100, x: 0, y: 0 },
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onElementPointerDown,
  scriptTitleTransform = { x: 0, y: 0, scale: 1 },
  mainTitleTransform = { x: 0, y: 0, scale: 1 },
  badgeTransform = { x: 0, y: 0, scale: 1 },
  companyName = 'VELYN',
  menuLeft = [
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱150' },
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱120' },
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱150' },
  ],
  menuSpecial = [
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱180' },
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱180' },
  ],
  menuRight = [
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱199' },
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱149' },
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱199' },
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱199' },
  ],
}: Food5PosterProps) {

  return (
    <div
      className={`@container relative isolate aspect-[9/16] overflow-hidden bg-white ${className}`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        '--f5-primary': primaryColor,
        '--f5-secondary': secondaryColor,
        '--f5-footer': footerColor,
      } as CSSProperties}
    >
      {/* Background Image Header */}
      <div className="absolute top-0 inset-x-0 h-[38%] overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1080"
          alt="Rustic Table"
          className="w-full h-full object-cover opacity-40 blur-sm scale-110"
        />

        {/* Logo */}
        <div className="absolute top-[6%] right-[5%] flex items-center gap-2">
          <div className="w-[1.2em] h-[1.2em] border-2 border-[var(--f5-primary)] rounded-full flex items-center justify-center p-0.5" style={{ fontSize: compact ? '7px' : '4cqw' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--f5-primary)" strokeWidth="2.5" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
          </div>
          <span className={`font-['Inter'] font-black text-white uppercase tracking-widest ${compact ? 'text-[3px]' : 'text-[1.8cqw]'}`}>
            {companyName}
          </span>
        </div>

        {/* Title Group */}
        <div className="absolute top-[12%] left-[6%] pointer-events-none z-20">
          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto origin-bottom-left"
            style={{
              transform: `translate(${scriptTitleTransform.x}px, ${scriptTitleTransform.y}px) scale(${scriptTitleTransform.scale})`,
            }}
            onPointerDown={(e) => onElementPointerDown?.('scriptTitle', e)}
          >
            <h1 className={`font-['Dancing_Script'] text-[var(--f5-primary)] leading-none drop-shadow-md ${compact ? 'text-[18px]' : 'text-[11cqw]'}`}>
              {scriptTitle}
            </h1>
          </div>

          <div
            className="cursor-grab active:cursor-grabbing pointer-events-auto origin-top-left -mt-2"
            style={{
              transform: `translate(${mainTitleTransform.x}px, ${mainTitleTransform.y}px) scale(${mainTitleTransform.scale})`,
            }}
            onPointerDown={(e) => onElementPointerDown?.('mainTitle', e)}
          >
            <h2 className={`font-['Permanent_Marker'] text-white leading-none tracking-tight drop-shadow-[4px_4px_0_var(--f5-primary)] ${compact ? 'text-[26px]' : 'text-[17cqw]'}`}>
              {mainTitle}
            </h2>
          </div>
        </div>
      </div>

      {/* Body Gradient Section */}
      <div
        className="absolute top-[38%] inset-x-0 h-[46%] z-10 px-[6%] pb-[6%] flex gap-6"
        style={{ background: 'linear-gradient(145deg, var(--f5-primary) 0%, var(--f5-secondary) 100%)' }}
      >
        {/* Left Column shifted down to avoid overlapping the small burger image */}
        <div className="w-1/2 flex flex-col gap-[3cqw] pt-[11cqw]">
          <div>
            <h3 className={`font-['Oswald'] text-[#ffd800] uppercase font-bold tracking-widest ${compact ? 'text-[7px] mb-1' : 'text-[4cqw] mb-[2cqw]'}`}>FOOD</h3>
            <div className="flex flex-col gap-[2cqw]">
              {menuLeft.map((item, i) => (
                <div key={i} className="flex flex-col leading-tight">
                  <div className="flex justify-between items-center text-white">
                    <h4 className={`font-['Oswald'] font-medium uppercase ${compact ? 'text-[5px]' : 'text-[3cqw]'}`}>{item.title}</h4>
                    <span className={`font-['Oswald'] font-bold text-[#ffd800] ${compact ? 'text-[6px]' : 'text-[3.5cqw]'}`}>{item.price}</span>
                  </div>
                  <p className={`font-['Inter'] text-white/80 ${compact ? 'text-[3px]' : 'text-[1.8cqw]'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <h3 className={`font-['Oswald'] text-white uppercase font-bold tracking-widest ${compact ? 'text-[6px] mb-1' : 'text-[3.5cqw] mb-[2cqw]'}`}>SPECIAL MENU</h3>
            <div className="flex flex-col gap-[2cqw]">
              {menuSpecial.map((item, i) => (
                <div key={i} className="flex flex-col leading-tight">
                  <div className="flex justify-between items-center text-white">
                    <h4 className={`font-['Oswald'] font-medium uppercase ${compact ? 'text-[5px]' : 'text-[3cqw]'}`}>{item.title}</h4>
                    <span className={`font-['Oswald'] font-bold text-[#ffd800] ${compact ? 'text-[6px]' : 'text-[3.5cqw]'}`}>{item.price}</span>
                  </div>
                  <p className={`font-['Inter'] text-white/80 ${compact ? 'text-[3px]' : 'text-[1.8cqw]'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column shifted down further to avoid the large pizza image */}
        <div className="w-1/2 flex flex-col pt-[20cqw] gap-[3cqw]">
          <h3 className={`font-['Oswald'] text-white uppercase font-bold tracking-widest ${compact ? 'text-[7px] mb-1' : 'text-[4cqw] mb-[2cqw]'}`}>FAST FOOD</h3>
          <div className="flex flex-col gap-[3.5cqw]">
            {menuRight.map((item, i) => (
              <div key={i} className="flex flex-col leading-tight">
                <div className="flex justify-between items-center text-white">
                  <h4 className={`font-['Oswald'] font-medium uppercase ${compact ? 'text-[5px]' : 'text-[3cqw]'}`}>{item.title}</h4>
                  <span className={`font-['Oswald'] font-bold text-[#ffd800] ${compact ? 'text-[6px]' : 'text-[3.5cqw]'}`}>{item.price}</span>
                </div>
                <p className={`font-['Inter'] text-white/80 ${compact ? 'text-[3px]' : 'text-[1.8cqw]'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Torn Paper Edge */}
      <div className={`absolute inset-x-0 z-20 pointer-events-none drop-shadow-md ${compact ? 'top-[84.5%] h-[5px]' : 'top-[83.5%] h-[6cqw]'}`}>
        <svg viewBox="0 0 1080 40" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 L1080,0 L1080,20 L1020,40 L960,10 L900,35 L840,15 L780,40 L720,20 L660,35 L600,10 L540,40 L480,15 L420,35 L360,10 L300,40 L240,20 L180,35 L120,10 L60,40 L0,20 Z" fill="var(--f5-footer)" />
        </svg>
      </div>

      {/* Footer Section */}
      <div
        className="absolute top-[84%] bottom-0 inset-x-0 z-10 flex flex-col justify-end pb-[6%]"
        style={{ backgroundColor: 'var(--f5-footer)' }}
      >
        <div className="flex justify-between items-end px-[6%] text-white">
          <div className="flex flex-col">
            <span className={`font-['Inter'] text-white/60 tracking-wider uppercase ${compact ? 'text-[4.5px]' : 'text-[2.2cqw]'}`}>For Home Delivery</span>
            <span className={`font-['Oswald'] font-bold ${compact ? 'text-[9px]' : 'text-[5.5cqw]'}`}>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-['Oswald'] uppercase font-medium tracking-wide translate-y-[0.8cqw] ${compact ? 'text-[6px] translate-y-[2px]' : 'text-[3.5cqw]'}`}>{website}</span>
          </div>
        </div>
      </div>

      {/* Overlapping Images (Header to Body) */}
      <div className="absolute top-[17%] right-[4%] w-[48%] aspect-square z-30 pointer-events-none">
        <div className={`relative w-full h-full rounded-full border-white shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing bg-[#1a1a1a] ${compact ? 'border-2' : 'border-[8px]'}`} onPointerDown={(e) => onElementPointerDown?.('imageRight', e)}>
          <img
            src={imageRightSrc}
            alt="Large Food"
            className="w-full h-full object-cover scale-110"
            style={{
              filter: `brightness(${imageTransform.brightness}%) contrast(${imageTransform.contrast}%)`,
              transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale / 100}) rotate(${imageTransform.rotate}deg)`,
            }}
            draggable={false}
          />
        </div>
      </div>

      <div className="absolute top-[29%] right-[36%] w-[30%] aspect-square z-30 pointer-events-none">
        <div className={`relative w-full h-full rounded-full border-white shadow-[0_15px_30px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing bg-[#1a1a1a] ${compact ? 'border-[1.5px]' : 'border-[6px]'}`} onPointerDown={(e) => onElementPointerDown?.('imageLeft', e)}>
          <img
            src={imageLeftSrc}
            alt="Small Food"
            className="w-full h-full object-cover scale-125"
            style={{
              filter: `brightness(${imageLeftTransform.brightness}%) contrast(${imageLeftTransform.contrast}%)`,
              transform: `translate(${imageLeftTransform.x}px, ${imageLeftTransform.y}px) scale(${imageLeftTransform.scale / 100}) rotate(${imageLeftTransform.rotate}deg)`,
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-[78.5%] right-[10%] w-[25%] aspect-square z-40 pointer-events-none flex items-center justify-center">
        <div
          className={`relative w-full h-full rounded-full bg-[#f4e4c1] shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center border-dashed border-stone-800/20 cursor-grab active:cursor-grabbing pointer-events-auto ${compact ? 'border-[1px]' : 'border-4'}`}
          style={{
            transform: `translate(${badgeTransform.x}px, ${badgeTransform.y}px) scale(${badgeTransform.scale}) rotate(-10deg)`,
          }}
          onPointerDown={(e) => onElementPointerDown?.('badge', e)}
        >
          <span className={`font-['Oswald'] font-black text-stone-900 leading-none text-center whitespace-pre-line ${compact ? 'text-[9px]' : 'text-[6cqw]'}`}>
            {badgeText}
          </span>
        </div>
      </div>

    </div>
  );
}
