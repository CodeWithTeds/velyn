import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import rough from 'roughjs';

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

  const processSvgRef = useRef<SVGSVGElement>(null);
  const curationSvgRef = useRef<SVGSVGElement>(null);
  const layoutsSvgRef = useRef<SVGSVGElement>(null);
  const socialSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const drawSvg = (svg: SVGSVGElement | null, drawFn: (rc: any, svgEl: SVGSVGElement) => void) => {
      if (!svg) return;
      svg.innerHTML = '';
      const rc = rough.svg(svg);
      drawFn(rc, svg);
    };

    drawSvg(processSvgRef.current, (rc, svg) => {
      // Frame
      svg.appendChild(rc.rectangle(5, 5, 90, 110, { stroke: '#111', strokeWidth: 2, roughness: 2 }));
      // Background raw area
      svg.appendChild(rc.rectangle(10, 10, 80, 50, { fill: 'rgba(0,0,0,0.05)', fillStyle: 'zigzag', stroke: 'none' }));
      // Background processed area
      svg.appendChild(rc.rectangle(10, 60, 80, 50, { fill: 'rgba(255,51,153,0.1)', fillStyle: 'solid', stroke: 'none' }));
      
      // Portrait Head (Top - raw photo)
      svg.appendChild(rc.arc(50, 50, 40, 40, Math.PI, 0, true, { stroke: '#111', strokeWidth: 1.5, fill: 'rgba(0,0,0,0.1)', fillStyle: 'hachure' }));
      // Portrait Shoulders (Top - raw)
      svg.appendChild(rc.path("M 20 60 Q 50 30 80 60", { stroke: '#111', strokeWidth: 1.5, roughness: 2 }));
      
      // Portrait Head (Bottom - processed/geometric)
      svg.appendChild(rc.polygon([[30, 60], [50, 85], [70, 60]], { stroke: '#111', strokeWidth: 2, fill: 'rgba(255,51,153,0.2)', fillStyle: 'solid' }));
      // Shoulders (Bottom - bold shapes)
      svg.appendChild(rc.path("M 20 60 L 20 100 L 80 100 L 80 60", { stroke: '#111', strokeWidth: 2.5, roughness: 1 }));
      
      // AI Scanner Beam
      svg.appendChild(rc.line(5, 60, 95, 60, { stroke: '#ff3399', strokeWidth: 3, roughness: 0 }));
      svg.appendChild(rc.circle(5, 60, 4, { fill: '#ff3399', fillStyle: 'solid', stroke: 'none' }));
      svg.appendChild(rc.circle(95, 60, 4, { fill: '#ff3399', fillStyle: 'solid', stroke: 'none' }));
    });

    drawSvg(curationSvgRef.current, (rc, svg) => {
      // Outer boundary
      svg.appendChild(rc.rectangle(2, 2, 96, 116, { stroke: '#111', strokeWidth: 1, roughness: 2, strokeLineDash: [4, 4] }));
      
      // Masonry Layout Cards
      // Featured Top Left
      svg.appendChild(rc.rectangle(8, 8, 48, 60, { fill: 'rgba(255,51,153,0.15)', stroke: '#ff3399', strokeWidth: 2, fillStyle: 'zigzag' }));
      // Top Right
      svg.appendChild(rc.rectangle(60, 8, 32, 35, { fill: 'rgba(0,0,0,0.08)', stroke: '#111', strokeWidth: 1.5, fillStyle: 'hachure' }));
      // Right Middle
      svg.appendChild(rc.rectangle(60, 48, 32, 40, { fill: 'rgba(0,0,0,0.04)', stroke: '#111', strokeWidth: 1.5, fillStyle: 'solid' }));
      // Bottom Left
      svg.appendChild(rc.rectangle(8, 73, 22, 39, { fill: 'rgba(0,0,0,0.1)', stroke: '#111', strokeWidth: 1.5, fillStyle: 'hachure' }));
      // Bottom Middle
      svg.appendChild(rc.rectangle(35, 73, 21, 39, { fill: 'rgba(255,51,153,0.1)', stroke: '#ff3399', strokeWidth: 1.5, fillStyle: 'solid' }));
      // Bottom Right
      svg.appendChild(rc.rectangle(60, 93, 32, 19, { fill: 'rgba(0,0,0,0.06)', stroke: '#111', strokeWidth: 1.5, fillStyle: 'zigzag' }));
      
      // Hand-picked star/sparkle overlay
      svg.appendChild(rc.path("M 45 60 L 50 50 L 55 60 L 65 65 L 55 70 L 50 80 L 45 70 L 35 65 Z", { fill: '#ff3399', stroke: '#ff3399', strokeWidth: 1, fillStyle: 'solid' }));
    });

    drawSvg(layoutsSvgRef.current, (rc, svg) => {
      // Phone Body
      svg.appendChild(rc.rectangle(15, 5, 70, 110, { stroke: '#111', strokeWidth: 2.5, roughness: 1.5, fill: 'rgba(0,0,0,0.02)', fillStyle: 'solid' }));
      
      // Story Progress Dashes at top
      svg.appendChild(rc.line(20, 12, 40, 12, { stroke: '#111', strokeWidth: 2 }));
      svg.appendChild(rc.line(43, 12, 60, 12, { stroke: '#111', strokeWidth: 2 }));
      svg.appendChild(rc.line(63, 12, 80, 12, { stroke: '#ff3399', strokeWidth: 2 }));
      
      // Main Content Box
      svg.appendChild(rc.rectangle(20, 18, 60, 92, { fill: 'rgba(255,51,153,0.05)', stroke: 'none', fillStyle: 'solid' }));
      
      // Play Button center
      svg.appendChild(rc.circle(50, 55, 20, { stroke: '#111', strokeWidth: 1.5, fill: 'rgba(255,51,153,0.2)', fillStyle: 'solid' }));
      svg.appendChild(rc.polygon([[46, 48], [58, 55], [46, 62]], { fill: '#ff3399', stroke: '#ff3399', fillStyle: 'solid' }));
      
      // Right Side Action Buttons (Like, Comment, Share)
      svg.appendChild(rc.circle(72, 70, 4, { fill: '#111', stroke: 'none', fillStyle: 'solid' }));
      svg.appendChild(rc.circle(72, 82, 4, { fill: '#111', stroke: 'none', fillStyle: 'solid' }));
      svg.appendChild(rc.circle(72, 94, 4, { fill: '#ff3399', stroke: 'none', fillStyle: 'solid' }));
      
      // Bottom Left Profile & Text Info
      svg.appendChild(rc.circle(28, 90, 6, { stroke: '#111', strokeWidth: 1.5, fill: 'rgba(0,0,0,0.1)', fillStyle: 'hachure' }));
      svg.appendChild(rc.line(38, 88, 55, 88, { stroke: '#111', strokeWidth: 2 }));
      svg.appendChild(rc.line(38, 94, 50, 94, { stroke: '#111', strokeWidth: 1.5 }));
    });

    drawSvg(socialSvgRef.current, (rc, svg) => {
      // Background burst
      svg.appendChild(rc.circle(50, 60, 40, { fill: 'rgba(255,51,153,0.05)', stroke: 'none', fillStyle: 'zigzag', roughness: 3 }));
      
      // Large Paper Plane for "Share/Export"
      svg.appendChild(rc.polygon([
        [20, 70], // left wing tip
        [85, 15], // nose
        [65, 95], // right wing tip
        [45, 65]  // tail center
      ], { fill: 'rgba(255,51,153,0.15)', stroke: '#ff3399', strokeWidth: 2.5, fillStyle: 'solid', roughness: 1.5 }));
      
      // Paper plane center crease
      svg.appendChild(rc.line(85, 15, 45, 65, { stroke: '#ff3399', strokeWidth: 2 }));
      
      // Trailing speed lines
      svg.appendChild(rc.line(10, 95, 30, 80, { stroke: '#111', strokeWidth: 2, strokeLineDash: [4, 4] }));
      svg.appendChild(rc.line(20, 105, 40, 90, { stroke: '#111', strokeWidth: 2, strokeLineDash: [4, 4] }));
      
      // Format Export Tag
      svg.appendChild(rc.rectangle(55, 85, 35, 16, { fill: 'rgba(0,0,0,0.1)', stroke: '#111', strokeWidth: 1.5 }));
      svg.appendChild(rc.line(60, 93, 85, 93, { stroke: '#111', strokeWidth: 2 })); 
    });

    const ctx = gsap.context(() => {
      // Initialize all texts to be empty for the typing effect
      gsap.set([
        processTitleRef.current, processDescRef.current,
        curationTitleRef.current, curationDescRef.current,
        layoutsTitleRef.current, layoutsDescRef.current,
        socialTitleRef.current, socialDescRef.current
      ], { text: "" });

      // Initialize canvases hidden
      gsap.set([
        processSvgRef.current, curationSvgRef.current,
        layoutsSvgRef.current, socialSvgRef.current
      ], { opacity: 0, scale: 0.8 });

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

      // 3. Type out the Process text and pop up image while panning
      tl.to(processSvgRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, "-=1.5");
      tl.to(processTitleRef.current, { text: "Turn one portrait into a bold poster.", duration: 1.5, ease: "none" }, "<");
      tl.to(processDescRef.current, { text: "Advanced AI edge detection & stylization", duration: 1.5, ease: "none" }, "<0.5");

      tl.to({}, { duration: 1 }); // hold

      // 4. Pan DOWN to Bottom-Left (Layouts)
      tl.to(zoomContainerRef.current, {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 4
      });

      // 5. Type Layouts text and pop up image while panning
      tl.to(layoutsSvgRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, "-=1.5");
      tl.to(layoutsTitleRef.current, { text: "9:16 Vertical Story formats.", duration: 1.5, ease: "none" }, "<");
      tl.to(layoutsDescRef.current, { text: "Optimized for TikTok, Reels, & Stories", duration: 1.5, ease: "none" }, "<0.5");

      tl.to({}, { duration: 1 }); // hold

      // 6. Pan RIGHT to Bottom-Right (Social)
      tl.to(zoomContainerRef.current, {
        xPercent: -100,
        ease: "power2.inOut",
        duration: 4
      });

      // 7. Type Social text and pop up image while panning
      tl.to(socialSvgRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, "-=1.5");
      tl.to(socialTitleRef.current, { text: "Ready to share anywhere.", duration: 1.5, ease: "none" }, "<");
      tl.to(socialDescRef.current, { text: "Instant export in high-fidelity formats", duration: 1.5, ease: "none" }, "<0.5");

      tl.to({}, { duration: 1 }); // hold

      // 8. Pan UP to Top-Right (Curation)
      tl.to(zoomContainerRef.current, {
        yPercent: 100,
        ease: "power2.inOut",
        duration: 4
      });

      // 9. Type Curation text and pop up image while panning
      tl.to(curationSvgRef.current, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, "-=1.5");
      tl.to(curationTitleRef.current, { text: "Templates made for creators.", duration: 1.5, ease: "none" }, "<");
      tl.to(curationDescRef.current, { text: "Hand-picked layouts for maximum impact", duration: 1.5, ease: "none" }, "<0.5");

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
          <div className="absolute left-8 top-12 flex items-start gap-8 max-w-[420px] z-30">
            <div className="text-left w-[240px]">
              <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Process</p>
              <p ref={processTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
              <p ref={processDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
            </div>
            <svg ref={processSvgRef} viewBox="0 0 100 120" className="hidden sm:block opacity-60 mt-2 w-[100px] h-[120px] shrink-0" />
          </div>

          <div className="absolute right-8 top-12 flex items-start gap-8 max-w-[420px] z-30">
            <svg ref={curationSvgRef} viewBox="0 0 100 120" className="hidden sm:block opacity-60 mt-2 w-[100px] h-[120px] shrink-0" />
            <div className="text-right w-[240px]">
              <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Curation</p>
              <p ref={curationTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
              <p ref={curationDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
            </div>
          </div>

          <div className="absolute left-8 bottom-12 flex items-end gap-8 max-w-[420px] z-30">
            <div className="text-left w-[240px]">
              <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Layouts</p>
              <p ref={layoutsTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
              <p ref={layoutsDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
            </div>
            <svg ref={layoutsSvgRef} viewBox="0 0 100 120" className="hidden sm:block opacity-60 mb-2 w-[100px] h-[120px] shrink-0" />
          </div>

          <div className="absolute right-8 bottom-12 flex items-end gap-8 max-w-[420px] z-30">
            <svg ref={socialSvgRef} viewBox="0 0 100 120" className="hidden sm:block opacity-60 mb-2 w-[100px] h-[120px] shrink-0" />
            <div className="text-right w-[240px]">
              <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black uppercase leading-none tracking-tight text-primary">Social<span className="text-primary">!</span></p>
              <p ref={socialTitleRef} className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl min-h-[56px]"></p>
              <p ref={socialDescRef} className="mt-2 text-[10px] font-bold uppercase tracking-wider text-black/40 min-h-[30px]"></p>
            </div>
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
