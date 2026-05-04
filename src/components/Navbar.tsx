import { navButtonClass } from '../constants/sectionStyles';

type NavbarProps = {
  scrolled: boolean;
  onNavigate: (id: string) => void;
};

export function Navbar({ scrolled, onNavigate }: NavbarProps) {
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between px-[5%] transition duration-300 ${
        scrolled
          ? 'border-b border-border-soft bg-white/75 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <button onClick={() => onNavigate('home')} className="flex items-center">
        <img src="/images/logo.png" alt="Velyn" className="h-7 w-auto" />
      </button>

      <div className="hidden items-center gap-8 md:flex">
        <button onClick={() => onNavigate('features')} className={navButtonClass}>
          Features
        </button>
        <button onClick={() => onNavigate('templates')} className={navButtonClass}>
          Templates
        </button>
        <button onClick={() => onNavigate('developers')} className={navButtonClass}>
          Developers
        </button>
        <button onClick={() => onNavigate('footer')} className={navButtonClass}>
          Contact
        </button>
      </div>

      <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-pink transition duration-300 hover:scale-[1.03] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        Get Started
      </button>
    </nav>
  );
}
