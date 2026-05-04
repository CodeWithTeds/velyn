import {
  sectionClass,
  sectionHeaderClass,
  sectionSubtitleClass,
  sectionTitleClass,
} from '../constants/sectionStyles';

const mockTemplates = Array.from({ length: 12 }).map((_, i) => {
  const imgNum = i % 4;
  const imageSrc = imgNum === 0 ? '/images/test.png' : `/images/test${imgNum}.png`;
  
  return {
    id: i,
    title: `Template ${i + 1}`,
    description: 'A minimalist presentation designed for visual storytelling.',
    image: imageSrc,
  };
});

export function TemplatesSection() {
  return (
    <section id="templates" className={sectionClass}>
      <div className={sectionHeaderClass}>
        <h2 className={sectionTitleClass}>Curated Templates.</h2>
        <p className={sectionSubtitleClass}>
          A compact set of high-end layouts tailored for modern creatives.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockTemplates.map((template) => (
          <article key={template.id} className="preview-card overflow-hidden rounded-lg transition-[transform] duration-300 hover:-translate-y-1">
            <img
              src={template.image}
              alt={`${template.title} preview`}
              className="h-64 w-full object-cover object-top"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold tracking-normal text-ink">{template.title}.</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {template.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <button className="text-base font-semibold text-ink transition duration-300 hover:text-primary">
          View More
        </button>
      </div>
    </section>
  );
}
