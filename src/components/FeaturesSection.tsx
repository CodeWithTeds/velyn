import {
  bentoCardClass,
  sectionClass,
  sectionHeaderClass,
  sectionSubtitleClass,
  sectionTitleClass,
} from '../constants/sectionStyles';

export function FeaturesSection() {
  return (
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
              Subtle motion and horizontal storytelling give the portfolio a premium, app-like
              feel without getting in the way of the portraits.
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
  );
}
