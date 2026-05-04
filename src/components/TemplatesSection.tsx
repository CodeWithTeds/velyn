import {
  sectionClass,
  sectionHeaderClass,
  sectionSubtitleClass,
  sectionTitleClass,
} from '../constants/sectionStyles';

export function TemplatesSection() {
  return (
    <section id="templates" className={sectionClass}>
      <div className={sectionHeaderClass}>
        <h2 className={sectionTitleClass}>Curated Templates.</h2>
        <p className={sectionSubtitleClass}>
          A compact set of high-end layouts tailored for modern creatives.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="preview-card overflow-hidden rounded-lg border border-border-soft bg-surface shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
          <img src="/images/test.png" alt="Gallery template preview" className="h-72 w-full object-cover" />
          <div className="p-7 text-center">
            <h3 className="text-2xl font-bold tracking-normal text-ink">The Gallery.</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              A spacious grid-based layout for polished portrait collections.
            </p>
          </div>
        </article>

        <article className="preview-card overflow-hidden rounded-lg border border-border-soft bg-surface shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
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
  );
}
