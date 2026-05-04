type Template1PosterProps = {
  imageSrc?: string;
  compact?: boolean;
  className?: string;
};

export function Template1Poster({
  imageSrc = '/images/test3.png',
  compact = false,
  className = '',
}: Template1PosterProps) {
  return (
    <div
      className={`relative isolate aspect-[2/3] overflow-hidden bg-neutral-950 text-white ${className}`}
    >
      <img
        src={imageSrc}
        alt="Black and white portrait poster"
        className="absolute inset-0 z-10 h-full w-full object-cover object-[72%_center] grayscale contrast-125 brightness-90"
      />

      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/70 via-black/20 to-black/5" />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_76%_42%,transparent_0%,rgb(0_0_0_/_0.08)_42%,rgb(0_0_0_/_0.45)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-20 h-1/3 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />

      <div className="absolute left-[4%] top-[5%] z-30 max-w-[70%]">
        <p
          className={`font-extrabold uppercase leading-[0.92] tracking-normal text-white drop-shadow-[0_2px_1px_rgb(0_0_0_/_0.75)] ${
            compact ? 'text-[6px] sm:text-[7px]' : 'text-[10px] sm:text-xs'
          }`}
        >
          In a world that never stops.
          <br />
          He stood still not lost,
          <br />
          just quietly searching for something
          <br />
          more.
        </p>
      </div>

      <h3
        className={`absolute bottom-[36%] left-[4%] z-30 max-w-[46%] font-black uppercase leading-[0.86] tracking-normal text-red-600 drop-shadow-[3px_3px_0_rgb(0_0_0_/_0.7)] ${
          compact ? 'text-[clamp(1.4rem,7vw,3rem)]' : 'text-[clamp(2.2rem,6vw,4.5rem)]'
        }`}
      >
        Than the
        <br />
        Rush
      </h3>
    </div>
  );
}
