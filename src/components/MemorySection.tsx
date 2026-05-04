import { useEffect, useRef } from 'react';
import rough from 'roughjs/bin/rough';
import { sectionClass } from '../constants/sectionStyles';

const artImages = [
  {
    src: '/images/art/art1.png',
    alt: 'Memory portrait artwork 1',
    className: 'row-span-2 h-full',
  },
  {
    src: '/images/art/art2.png',
    alt: 'Memory portrait artwork 2',
    className: 'h-full',
  },
  {
    src: '/images/art/art3.png',
    alt: 'Memory portrait artwork 3',
    className: 'h-full',
  },
];

export function MemorySection() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.replaceChildren();
    const sketch = rough.svg(svg, { options: { seed: 42 } });
    const options = {
      stroke: '#111111',
      strokeWidth: 2.4,
      roughness: 2,
      bowing: 1.2,
      fill: 'none',
    };

    svg.appendChild(sketch.rectangle(28, 42, 520, 380, options));
    svg.appendChild(sketch.line(72, 118, 438, 118, options));
    svg.appendChild(sketch.line(74, 314, 360, 314, options));
    svg.appendChild(sketch.path('M86 470 C164 430, 240 526, 326 470 C398 424, 460 460, 514 504', options));
    svg.appendChild(sketch.circle(506, 92, 52, options));
    svg.appendChild(sketch.path('M490 92 C496 74, 518 74, 524 92 C518 112, 496 112, 490 92', options));
  }, []);

  return (
    <section id="memory" className={`${sectionClass} overflow-hidden bg-[#fbfaf7]`}>
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[560px]">
          <svg
            ref={svgRef}
            viewBox="0 0 600 560"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          />

          <div className="absolute inset-y-10 left-0 w-[82%] bg-[#fbfaf7]/90 blur-2xl" />

          <div className="relative z-10 flex min-h-[560px] flex-col justify-center px-8">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-primary drop-shadow-[0_2px_0_white]">
              Memory
            </p>
            <h2
              className="mt-6 max-w-xl text-[clamp(4.3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-normal text-black"
              style={{
                textShadow:
                  '4px 4px 0 #ff3399, 8px 8px 0 #ffffff, 13px 13px 0 rgba(17,17,17,0.14), 18px 18px 30px rgba(0,0,0,0.18)',
              }}
            >
              Pictures connect us
            </h2>

            <blockquote className="mt-12 max-w-xl">
              <p className="bg-[#fbfaf7]/85 text-3xl font-extrabold leading-tight tracking-normal text-black drop-shadow-[0_2px_0_white] sm:text-4xl">
                "Death is not the end, but forgetting is."
              </p>
              <footer className="mt-5 text-sm font-black uppercase tracking-[0.24em] text-black/60">
                Inspired by Coco
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="grid h-[660px] gap-5 sm:grid-cols-2">
          {artImages.map((image) => (
            <div key={image.src} className={`overflow-hidden rounded-[2rem] bg-white ${image.className}`}>
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
