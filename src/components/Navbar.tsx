type NavbarProps = {
  scrolled: boolean;
  onNavigate: (id: string) => void;
};

export function Navbar({ scrolled, onNavigate }: NavbarProps) {
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

      <div className="hidden items-center gap-3 text-center md:flex">
        <span className="text-sm font-semibold text-ink">Elegant portraits</span>
        <span className="h-1 w-1 rounded-full bg-primary" />
        <span className="text-sm font-medium text-muted">Creative profiles</span>
        <span className="h-1 w-1 rounded-full bg-primary" />
        <span className="text-sm font-medium text-muted">Premium templates</span>
      </div>

      <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-pink transition duration-300 hover:scale-[1.03] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        Get Started
      </button>
    </nav>
  );
}
