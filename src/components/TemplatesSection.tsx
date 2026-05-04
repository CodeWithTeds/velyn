import {
  sectionClass,
  sectionHeaderClass,
  sectionSubtitleClass,
  sectionTitleClass,
} from '../constants/sectionStyles';

const mockTemplates = Array.from({ length: 12 }).map((_, i) => {
  const imgNum = ((i + 1) % 3) + 1;
  const imageSrc = `/images/test${imgNum}.png`;

  return {
    id: i,
    title: `Template ${i + 1}`,
    description: 'A minimalist presentation designed for visual storytelling.',
    image: imageSrc,
  };
});

type TemplatesSectionProps = {
  onOpenModal: (template: typeof mockTemplates[0]) => void;
};

export function TemplatesSection({ onOpenModal }: TemplatesSectionProps) {
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
          <article key={template.id} className="preview-card flex flex-col overflow-hidden rounded-lg transition-[transform] duration-300 hover:-translate-y-1">
            <img
              src={template.image}
              alt={`${template.title} preview`}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6 text-center">
              <h3 className="text-xl font-bold tracking-normal text-ink">{template.title}.</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {template.description}
              </p>
              <div className="mt-auto pt-6">
                <button
                  onClick={() => onOpenModal(template)}
                  className="w-full rounded-md bg-ink py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
                >
                  Use Template
                </button>
              </div>
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
