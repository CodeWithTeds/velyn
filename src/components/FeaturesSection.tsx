import { useEffect, useRef } from 'react';
import rough from 'roughjs/bin/rough';

const doodleWords = [
  { text: 'crop', className: 'left-[7%] top-[18%] -rotate-12 text-3xl' },
  { text: '9:16', className: 'right-[10%] top-[15%] rotate-6 text-4xl' },
  { text: 'poster', className: 'left-[13%] bottom-[18%] rotate-6 text-3xl' },
  { text: 'edit', className: 'right-[16%] bottom-[20%] -rotate-12 text-3xl' },
  { text: 'drop photo', className: 'left-[29%] top-[13%] rotate-3 text-2xl' },
  { text: 'share', className: 'right-[30%] bottom-[14%] rotate-3 text-2xl' },
  { text: 'portrait', className: 'left-[4%] bottom-[36%] -rotate-6 text-2xl' },
  { text: 'template', className: 'right-[4%] top-[42%] rotate-90 text-2xl' },
];

export function FeaturesSection() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.replaceChildren();
    const doodle = rough.svg(svg, { options: { seed: 24 } });
    const drawOptions = {
      stroke: '#111111',
      strokeWidth: 2.2,
      roughness: 1.8,
      bowing: 1.3,
      fill: 'none',
    };
    const boldOptions = {
      ...drawOptions,
      strokeWidth: 3.2,
      roughness: 2.2,
    };

    const add = (node: SVGGElement) => svg.appendChild(node);

    add(doodle.rectangle(46, 70, 118, 150, drawOptions));
    add(doodle.rectangle(72, 96, 66, 86, drawOptions));
    add(doodle.line(82, 204, 128, 204, drawOptions));
    add(doodle.circle(226, 112, 72, boldOptions));
    add(doodle.path('M206 112 C214 82, 250 82, 258 112 C250 144, 214 144, 206 112', boldOptions));
    add(doodle.rectangle(930, 58, 138, 86, drawOptions));
    add(doodle.line(950, 84, 1048, 84, drawOptions));
    add(doodle.line(950, 112, 1016, 112, drawOptions));
    add(doodle.circle(1104, 166, 82, boldOptions));
    add(doodle.path('M1074 168 C1084 140, 1122 140, 1134 168 C1124 198, 1086 198, 1074 168', boldOptions));
    add(doodle.rectangle(80, 504, 152, 92, drawOptions));
    add(doodle.line(98, 532, 214, 532, drawOptions));
    add(doodle.line(98, 562, 184, 562, drawOptions));
    add(doodle.rectangle(968, 472, 112, 160, drawOptions));
    add(doodle.rectangle(990, 500, 68, 104, drawOptions));
    add(doodle.line(1012, 622, 1036, 622, drawOptions));
    add(doodle.circle(318, 558, 58, drawOptions));
    add(doodle.circle(860, 570, 58, drawOptions));
    add(doodle.path('M318 528 L334 558 L366 562 L342 584 L348 618 L318 602 L288 618 L294 584 L270 562 L302 558 Z', drawOptions));
    add(doodle.path('M860 540 L876 570 L908 574 L884 596 L890 630 L860 614 L830 630 L836 596 L812 574 L844 570 Z', drawOptions));
    add(doodle.line(358, 102, 430, 42, drawOptions));
    add(doodle.line(430, 42, 500, 102, drawOptions));
    add(doodle.line(396, 74, 462, 74, drawOptions));
    add(doodle.line(730, 88, 812, 88, boldOptions));
    add(doodle.line(770, 48, 770, 128, boldOptions));
    add(doodle.path('M606 560 C628 514, 696 514, 718 560 C696 616, 628 616, 606 560', drawOptions));
    add(doodle.line(636, 560, 688, 560, drawOptions));
    add(doodle.line(662, 536, 662, 586, drawOptions));
    add(doodle.path('M1034 326 C1076 280, 1130 292, 1138 344 C1100 360, 1062 360, 1034 326', boldOptions));
    add(doodle.path('M146 340 C182 296, 236 304, 248 354 C216 382, 168 382, 146 340', boldOptions));
    add(doodle.path('M515 158 C544 128, 580 128, 610 158 C580 190, 544 190, 515 158', drawOptions));
    add(doodle.path('M620 162 C650 132, 686 132, 716 162 C686 194, 650 194, 620 162', drawOptions));
  }, []);

  return (
    <section
      id="features"
      className="section relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fbfaf7] px-[6%] py-24"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 720"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-95"
        aria-hidden="true"
      />

      {doodleWords.map((word) => (
        <span
          key={word.text}
          className={`pointer-events-none absolute z-10 font-black uppercase leading-none tracking-normal text-black ${word.className}`}
          aria-hidden="true"
        >
          {word.text}
        </span>
      ))}

      <div className="relative z-20 mx-auto max-w-4xl text-center">
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
        <p className="mx-auto mt-8 max-w-2xl text-lg font-bold leading-8 text-black sm:text-2xl">
          Turn one portrait into a bold editable poster, with templates made for creators,
          profiles, and vertical stories.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-black uppercase tracking-[0.22em] text-black">
          <span>Upload</span>
          <span>Resize</span>
          <span>Style</span>
          <span>Post</span>
        </div>
      </div>
    </section>
  );
}
