export function HeroSection() {
  return (
    <section
      id="home"
      className="hero relative flex h-screen w-screen shrink-0 snap-start items-center overflow-hidden border-r border-border-soft bg-hero pt-14 max-lg:flex-col"
    >
      <div className="hero-left flex h-full flex-[1.1] items-center justify-center max-lg:order-2 max-lg:h-[46vh] max-lg:w-full">
        <img
          src="/images/test1.png"
          alt="Velyn portrait"
          className="hero-img max-h-[95%] max-w-[95%] object-contain drop-shadow-portrait max-lg:max-h-[82%]"
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-[8%] text-center max-lg:order-1 max-lg:px-[5%] max-lg:py-12">
        <div className="hero-badge mb-10 flex items-center gap-2 text-sm font-medium text-muted">
          Now available <span className="size-2 rounded-full bg-available" />
        </div>

        <div className="hero-logo-wrapper mb-6">
          <img src="/images/logo.png" alt="Velyn logo" className="h-20 w-auto drop-shadow-logo" />
        </div>

        <h1 className="hero-title text-5xl font-extrabold leading-none tracking-normal text-ink sm:text-6xl lg:text-8xl">
          Portraits,
          <br />
          reimagined.
        </h1>
        <p className="hero-subtitle mt-6 max-w-lg text-base font-medium leading-7 text-muted sm:text-lg">
          Design elegant, professional portraits with a refined set of modern templates. Minimal.
          Timeless. Effortless.
        </p>

        <div className="hero-cta mt-10">
          <button className="rounded-full bg-ink px-8 py-4 text-base font-semibold text-white shadow-lift transition duration-300 hover:scale-[1.02] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
            Get Started - Free
          </button>
        </div>
      </div>
    </section>
  );
}
