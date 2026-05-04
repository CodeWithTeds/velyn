import { useEffect, useState } from 'react';
import gsap from 'gsap';

type NavbarProps = {
  scrolled: boolean;
  onNavigate: (id: string) => void;
};

export function Navbar({ scrolled, onNavigate }: NavbarProps) {
  const [downloads, setDownloads] = useState(1284);
  const [layouts, setLayouts] = useState(42);

  useEffect(() => {
    // Initial counting animation
    const tl = gsap.timeline();
    tl.to({}, {
      duration: 2,
      onUpdate: function() {
        const progress = this.progress();
        setDownloads(Math.floor(progress * 1284));
        setLayouts(Math.floor(progress * 42));
      }
    });

    // Simulate "realtime" updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setDownloads(prev => prev + Math.floor(Math.random() * 3));
      }
      if (Math.random() > 0.9) {
        setLayouts(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b px-[5%] transition duration-300 ${
        scrolled
          ? 'border-border-soft bg-white/75 shadow-sm backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <button onClick={() => onNavigate('home')} className="flex items-center gap-3.5 text-left">
        <img src="/images/logo.png" alt="Velyn" className="h-9 w-auto" />
        <span className="hidden leading-none sm:block">
          <span className="block text-base font-extrabold tracking-normal text-ink">Velyn</span>
          <span className="mt-1 block text-[11px] font-semibold uppercase text-muted">
            Portrait Studio
          </span>
        </span>
      </button>

      <div className="hidden items-center gap-6 text-center md:flex">
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-ink">{downloads.toLocaleString()}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">Downloads</span>
        </div>
        <div className="h-4 w-[1px] bg-border-soft" />
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-ink">{layouts}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">Layouts</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="hidden text-[13px] font-medium tracking-tight text-muted lg:block">
          Join the professional creators.
        </span>
        <button className="rounded-full bg-ink px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
          Download App
        </button>
      </div>
    </nav>
  );
}
