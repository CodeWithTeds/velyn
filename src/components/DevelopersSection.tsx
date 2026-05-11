import { developers } from '@/data/developers';
import {
  sectionClass,
  sectionHeaderClass,
  sectionSubtitleClass,
  sectionTitleClass,
} from '@/constants/sectionStyles';

const developerFigureClass = 'developer-card flex min-w-0 flex-col items-center text-center';

export function DevelopersSection() {
  return (
    <section id="developers" className={sectionClass}>
      <div className={sectionHeaderClass}>
        <h2 className={sectionTitleClass}>The Developers.</h2>
        <p className={sectionSubtitleClass}>The creative minds behind the Velyn experience.</p>
      </div>

      <div className="grid items-end gap-8 sm:grid-cols-3 lg:gap-14">
        {developers.map((developer) => (
          <article key={developer.name} className={developerFigureClass}>
            <img
              src={developer.image}
              alt={developer.name}
              className="h-[38vh] max-h-[430px] min-h-[260px] w-auto object-contain object-bottom sm:h-[44vh] lg:h-[52vh]"
            />
            <h3 className="mt-7 text-3xl font-bold tracking-normal text-slate-700 lg:text-4xl">
              {developer.name}
            </h3>
            <p className="mt-6 text-xl font-normal leading-7 text-zinc-600 lg:text-2xl">
              {developer.role}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

