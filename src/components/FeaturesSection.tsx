import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function FeaturesSection() {
  const triggerWrapRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  const processTitleRef = useRef<HTMLParagraphElement>(null);
  const processDescRef = useRef<HTMLParagraphElement>(null);

  const curationTitleRef = useRef<HTMLParagraphElement>(null);
  const curationDescRef = useRef<HTMLParagraphElement>(null);

  const layoutsTitleRef = useRef<HTMLParagraphElement>(null);
  const layoutsDescRef = useRef<HTMLParagraphElement>(null);

  const socialTitleRef = useRef<HTMLParagraphElement>(null);
  const socialDescRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize all texts to be empty for the typing effect
      gsap.set([
        processTitleRef.current, processDescRef.current,
        curationTitleRef.current, curationDescRef.current,
        layoutsTitleRef.current, layoutsDescRef.current,
        socialTitleRef.current, socialDescRef.current
      ], { text: "" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=8000", // Long scroll for the 4-step sequence
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      // 1. Zoom into the top-left corner (Process)
      tl.to(zoomContainerRef.current, {
        scale: 3,
        xPercent: 100,
        yPercent: 100,
        ease: "power2.inOut",
        duration: 4
      });

      // 2. Fade out the rest of the center content while zooming
      tl.to(".dim-on-zoom", {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut"
      }, "<"); // start at the same time as zoom

      // 3. Type out the Process text
      tl.to(processTitleRef.current, { text: "Turn one portrait into a bold poster.", duration: 2, ease: "none" });
      tl.to(processDescRef.current, { text: "Advanced AI edge detection & stylization", duration: 2, ease: "none" });

      tl.to({}, { duration: 1 }); // hold

      // 4. Pan DOWN to Bottom-Left (Layouts)
      tl.to(zoomContainerRef.current, {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 4
      });

      // 5. Type Layouts text
      tl.to(layoutsTitleRef.current, { text: "9:16 Vertical Story formats.", duration: 2, ease: "none" });
      tl.to(layoutsDescRef.current, { text: "Optimized for TikTok, Reels, & Stories", duration: 2, ease: "none" });

      tl.to({}, { duration: 1 }); // hold

      // 6. Pan RIGHT to Bottom-Right (Social)
      tl.to(zoomContainerRef.current, {
        xPercent: -100,
        ease: "power2.inOut",
        duration: 4
      });

      // 7. Type Social text
      tl.to(socialTitleRef.current, { text: "Ready to share anywhere.", duration: 2, ease: "none" });
      tl.to(socialDescRef.current, { text: "Instant export in high-fidelity formats", duration: 2, ease: "none" });

      tl.to({}, { duration: 1 }); // hold

      // 8. Pan UP to Top-Right (Curation)
      tl.to(zoomContainerRef.current, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 4
      });

      // 9. Type Curation text
      tl.to(curationTitleRef.current, { text: "Templates made for creators.", duration: 2, ease: "none" });
      tl.to(curationDescRef.current, { text: "Hand-picked layouts for maximum impact", duration: 2, ease: "none" });

      tl.to({}, { duration: 2 }); // final hold


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerWrapRef} id="features" className="section relative w-full bg-[#fbfaf7]">
      <div ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
        <div
          ref={zoomContainerRef}
          className="relative flex min-h-screen w-full items-center justify-center px-[6%] py-24"
        >
          {/* Side Labels */}
          <div className="dim-on-zoom absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black uppercase tracking-[0.5em] text-black/20">
            Professional Poster Kit
          </div>
          <div className="dim-on-zoom absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-black uppercase tracking-[0.5em] text-black/20">
            Digital Content Creator
          </div>

          {/* Decorative Scattered Words */}
          <div className="dim-on-zoom absolute left-[18%] top-[22%] -rotate-12 text-sm font-black uppercase tracking-widest text-black/5">Crop</div>
          <div className="dim-on-zoom absolute right-[22%] top-[18%] rotate-12 text-sm font-black uppercase tracking-widest text-black/5">9:16</div>
          <div className="dim-on-zoom absolute left-[12%] bottom-[28%] rotate-6 text-sm font-black uppercase tracking-widest text-black/5">Poster</div>
          <div className="dim-on-zoom absolute right-[28%] bottom-[15%] -rotate-6 text-sm font-black uppercase tracking-widest text-black/5">Edit</div>
          <div className="dim-on-zoom absolute left-[40%] top-[12%] text-[10px] font-black uppercase tracking-[0.3em] text-black/10">Version 1.0</div>

          {/* Corner Information */}
          <div className="absolute left-8 top-12 max-w-[240px] text-left z-30">
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Process</p>
            <p ref={processTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
            <p ref={processDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
          </div>

          <div className="absolute right-8 top-12 max-w-[240px] text-right z-30">
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Curation</p>
            <p ref={curationTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
            <p ref={curationDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
          </div>

          <div className="absolute left-8 bottom-12 max-w-[240px] text-left z-30">
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Layouts</p>
            <p ref={layoutsTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
            <p ref={layoutsDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
          </div>

          <div className="absolute right-8 bottom-12 max-w-[240px] text-right z-30">
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Social<span className="text-primary">!</span></p>
            <p ref={socialTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
            <p ref={socialDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
          </div>

          <div className="dim-on-zoom relative z-20 mx-auto max-w-4xl text-center">
            <p className="font-serif text-4xl italic leading-none text-black/75 sm:text-5xl">meet</p>
            <h2
              className="mt-1 text-[clamp(5rem,15vw,12rem)] font-black uppercase leading-[0.78] tracking-normal text-primary"
              style={{
                textShadow:
                  '3px 3px 0 #111, 7px 7px 0 rgba(17,17,17,0.18), 12px 12px 24px rgba(255,51,153,0.22)',
              }}
            >
              Velyn
            </h2>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.5em] text-black/40">
              The Future of Portrait Editing
            </p>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs font-black uppercase tracking-[0.4em] text-black">
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Upload
              </span>
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Resize
              </span>
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Style
              </span>
              <span className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Post
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
