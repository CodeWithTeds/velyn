import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navButtonClass =
  'text-xs font-medium text-ink/70 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

const sectionClass =
  'section flex h-screen w-screen shrink-0 snap-start flex-col justify-center border-r border-border-soft bg-white px-[8%] py-24';

const sectionHeaderClass = 'section-header mx-auto mb-12 max-w-2xl text-center lg:mb-16';

const sectionTitleClass =
  'text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl lg:text-6xl';

const sectionSubtitleClass = 'mt-5 text-base font-medium leading-7 text-muted sm:text-lg';

const bentoCardClass =
  'bento-card flex min-h-64 flex-col justify-between rounded-lg border border-border-soft bg-surface p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift';

const developerCardClass =
  'developer-card group rounded-lg border border-border-soft bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lift';

const developers = [
  {
    name: 'Prof Alex',
    role: 'Software Engineer | Content Creator',
    image: '/images/developer/conan.png',
  },
  {
    name: 'Ryan',
    role: 'Software Developer',
    image: '/images/developer/ryan.png',
  },
  {
    name: 'Christina',
    role: 'UI/UX Developer',
    image: '/images/developer/christina.png',
  },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollLeft > 20);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.8;
        ScrollTrigger.update();
      }
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = !prefersReducedMotion
      ? gsap.context(() => {
          gsap.from('.hero-left', {
            opacity: 0,
            x: -72,
            duration: 1.15,
            ease: 'power3.out',
          });

          gsap.from('.hero-badge, .hero-logo-wrapper, .hero-title, .hero-subtitle, .hero-cta', {
            opacity: 0,
            y: 34,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            delay: 0.15,
          });

          gsap.to('.hero-img', {
            yPercent: -7,
            scale: 1.035,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              scroller: container,
              horizontal: true,
              start: 'left left',
              end: 'right left',
              scrub: true,
            },
          });

          gsap.utils.toArray<HTMLElement>('.section, .footer').forEach((panel) => {
            const revealTargets = panel.querySelectorAll(
              '.section-header, .bento-card, .preview-card, .footer-brand, .footer-col, .footer-bottom',
            );

            if (!revealTargets.length) return;

            gsap.from(revealTargets, {
              opacity: 0,
              y: 42,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: {
                trigger: panel,
                scroller: container,
                horizontal: true,
                start: 'left 72%',
                toggleActions: 'play none none reverse',
              },
            });
          });

          ScrollTrigger.refresh();
        }, container)
      : undefined;

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      ctx?.revert();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    const container = containerRef.current;
    if (section && container) {
      gsap.killTweensOf(container);
      gsap.to(container, {
        scrollLeft: section.offsetLeft,
        duration: 1.25,
        ease: 'power4.inOut',
        onUpdate: () => ScrollTrigger.update(),
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="app-container no-scrollbar flex h-screen w-screen snap-x snap-mandatory flex-row overflow-x-auto overflow-y-hidden scroll-smooth bg-white text-ink antialiased"
    >
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between px-[5%] transition duration-300 ${
          scrolled
            ? 'border-b border-border-soft bg-white/75 shadow-sm backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <button onClick={() => scrollToSection('home')} className="flex items-center">
          <img src="/images/logo.png" alt="Velyn" className="h-7 w-auto" />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <button onClick={() => scrollToSection('features')} className={navButtonClass}>
            Features
          </button>
          <button onClick={() => scrollToSection('templates')} className={navButtonClass}>
            Templates
          </button>
          <button onClick={() => scrollToSection('developers')} className={navButtonClass}>
            Developers
          </button>
          <button onClick={() => scrollToSection('footer')} className={navButtonClass}>
            Contact
          </button>
        </div>

        <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-pink transition duration-300 hover:scale-[1.03] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          Get Started
        </button>
      </nav>

      <section
        id="home"
        className="hero relative flex h-screen w-screen shrink-0 snap-start items-center overflow-hidden border-r border-border-soft bg-hero pt-14 max-lg:flex-col"
      >
        <div className="hero-left flex h-full flex-[1.1] items-center justify-center max-lg:order-2 max-lg:h-[46vh] max-lg:w-full">
          <img
            src="/images/test1.png"
            alt="Velyn portrait"
            className="hero-img max-h-[95%] max-w-[95%] object-contain drop-shadow-portrait transition duration-500 hover:scale-[1.02] max-lg:max-h-[82%]"
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
            Design elegant, professional portraits with a refined set of modern templates.
            Minimal. Timeless. Effortless.
          </p>

          <div className="hero-cta mt-10">
            <button className="rounded-full bg-ink px-8 py-4 text-base font-semibold text-white shadow-lift transition duration-300 hover:scale-[1.02] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
              Get Started - Free
            </button>
          </div>
        </div>
      </section>

      <section id="features" className={sectionClass}>
        <div className={sectionHeaderClass}>
          <h2 className={sectionTitleClass}>Designed for Perfection.</h2>
          <p className={sectionSubtitleClass}>
            Every element is crafted to showcase portraits with clarity, polish, and restraint.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:auto-rows-[18rem]">
          <div className={`${bentoCardClass} items-start text-left lg:col-span-2 lg:row-span-2`}>
            <span className="mb-6 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
              01
            </span>
            <div>
              <h3 className="text-3xl font-bold tracking-normal text-ink lg:text-4xl">
                Smooth Interactions.
              </h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted lg:text-lg">
                Subtle motion and horizontal storytelling give the portfolio a premium,
                app-like feel without getting in the way of the portraits.
              </p>
            </div>
          </div>

          <div className={bentoCardClass}>
            <span className="mx-auto rounded-full bg-ink/5 px-3 py-1 text-xs font-bold uppercase text-ink">
              02
            </span>
            <div>
              <h3 className="text-2xl font-bold tracking-normal text-ink">Responsive.</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Carefully constrained layouts keep every section composed across display sizes.
              </p>
            </div>
          </div>

          <div className={bentoCardClass}>
            <span className="mx-auto rounded-full bg-ink/5 px-3 py-1 text-xs font-bold uppercase text-ink">
              03
            </span>
            <div>
              <h3 className="text-2xl font-bold tracking-normal text-ink">Minimalist.</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Clean spacing, quiet surfaces, and focused type keep the work at the center.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className={sectionClass}>
        <div className={sectionHeaderClass}>
          <h2 className={sectionTitleClass}>Curated Templates.</h2>
          <p className={sectionSubtitleClass}>
            A compact set of high-end layouts tailored for modern creatives.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="preview-card overflow-hidden rounded-lg border border-border-soft bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <img src="/images/test.png" alt="Gallery template preview" className="h-72 w-full object-cover" />
            <div className="p-7 text-center">
              <h3 className="text-2xl font-bold tracking-normal text-ink">The Gallery.</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                A spacious grid-based layout for polished portrait collections.
              </p>
            </div>
          </article>

          <article className="preview-card overflow-hidden rounded-lg border border-border-soft bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift">
            <img
              src="/images/test2.png"
              alt="Editorial template preview"
              className="h-72 w-full object-cover"
            />
            <div className="p-7 text-center">
              <h3 className="text-2xl font-bold tracking-normal text-ink">The Editorial.</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                A magazine-style presentation designed for visual storytelling.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="developers" className={sectionClass}>
        <div className={sectionHeaderClass}>
          <h2 className={sectionTitleClass}>The Developers.</h2>
          <p className={sectionSubtitleClass}>The creative minds behind the Velyn experience.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {developers.map((developer) => (
            <article key={developer.name} className={developerCardClass}>
              <img
                src={developer.image}
                alt={developer.name}
                className="mx-auto size-40 rounded-full border-4 border-white object-cover shadow-lift transition duration-300 group-hover:scale-[1.03]"
              />
              <h3 className="mt-6 text-2xl font-bold tracking-normal text-ink">{developer.name}</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-muted">{developer.role}</p>
            </article>
          ))}
        </div>
      </section>

      <footer
        id="footer"
        className="footer flex h-screen w-screen shrink-0 snap-start flex-col justify-between bg-surface px-[8%] pb-10 pt-24"
      >
        <div className="mx-auto flex w-full max-w-6xl justify-between gap-12 border-b border-border-soft pb-14 max-lg:flex-col">
          <div className="footer-brand">
            <h3 className="text-3xl font-bold tracking-normal text-ink">Velyn</h3>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              Premium portrait templates for modern creatives. Elegance in every pixel.
            </p>
          </div>

          <div className="flex gap-16 max-sm:flex-col max-sm:gap-8">
            <div className="footer-col">
              <h4 className="text-sm font-bold text-ink">Product</h4>
              <ul className="mt-6 space-y-4 text-sm text-muted">
                <li>
                  <a className="transition hover:text-ink" href="#">
                    Templates
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-ink" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-ink" href="#">
                    Showcase
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="text-sm font-bold text-ink">Company</h4>
              <ul className="mt-6 space-y-4 text-sm text-muted">
                <li>
                  <a className="transition hover:text-ink" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-ink" href="#">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-ink" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} Velyn. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
