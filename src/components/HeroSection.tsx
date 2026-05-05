export function HeroSection() {
  return (
    <section
      id="home"
      className="hero relative flex h-[75vh] w-full items-center overflow-hidden border-b border-border-soft bg-hero pt-14 mt-20"
    >
      <div className="hero-left flex h-full flex-[1.1] items-center justify-center">
        <img
          src="/images/test1.png"
          alt="Velyn portrait"
          className="hero-img max-h-full max-w-[95%] object-contain drop-shadow-portrait"
        />
      </div>

      <div className="flex h-full flex-1 flex-col items-center justify-center px-[8%] text-center">
        <div className="hero-badge mb-4 flex items-center gap-2 text-xs font-medium text-muted">
          Now available <span className="size-2 rounded-full bg-available" />
        </div>

        <div className="hero-logo-wrapper mb-3">
          <img src="/images/logo.png" alt="Velyn logo" className="h-16 w-auto drop-shadow-logo" />
        </div>

        <h1 className="hero-title text-5xl font-extrabold leading-none tracking-normal text-ink sm:text-6xl lg:text-7xl">
          Portraits,
          <br />
          reimagined.
        </h1>
        <p className="hero-subtitle mt-4 max-w-md text-base font-medium leading-7 text-muted">
          Design elegant, professional portraits with a refined set of modern templates. Minimal.
          Timeless. Effortless.
        </p>

        <div className="hero-cta mt-5">
          <button className="rounded-full bg-ink px-8 py-4 text-base font-semibold text-white shadow-lift transition duration-300 hover:scale-[1.02] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
            Get Started - Free
          </button>
        </div>
      </div>
    </section>
  );
}
