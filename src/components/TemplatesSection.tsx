import { useState } from 'react';
import type { CSSProperties } from 'react';
import {
  sectionClass,
  sectionHeaderClass,
  sectionSubtitleClass,
  sectionTitleClass,
} from '@/constants/sectionStyles';
import type { Template } from '@/types/template';
import {
  Template1Poster, template1,
  Template2Poster, template2,
  Template3Poster, template3,
  Template4Poster, template4,
  Template5Poster, template5,
  Template6Poster, template6,
  Template7Poster, template7,
  Template8Poster, template8,
  Template9Poster, template9,
  Template10Poster, template10
} from '@/components/templates/personal';
import { Food1Poster, food1 } from '@/components/templates/food';

type BusinessTemplateSample = {
  accent: string;
  category: string;
  description: string;
  id: number;
  title: string;
};

type TemplateCategory = 'personal' | 'food' | 'business';

const personalTemplates: Template[] = [
  template1,
  template2,
  template9,
  template3,
  template8,
  template4,
  template5,
  template6,
  template7,
  template10,
];

const foodTemplatesList: Template[] = [
  food1,
];

const foodTemplates: BusinessTemplateSample[] = [
  {
    id: 100,
    accent: '#dc2626',
    category: 'Food Industry',
    title: 'Burger Combo',
    description: 'A portrait promo layout for featured meals, pricing, and daily offers.',
  },
  {
    id: 101,
    accent: '#ea580c',
    category: 'Food Industry',
    title: 'Pizza Special',
    description: 'A bold food poster sample for limited-time bundles and delivery promos.',
  },
  {
    id: 102,
    accent: '#16a34a',
    category: 'Food Industry',
    title: 'Fresh Salad',
    description: 'A clean portrait layout for healthy menus, cafe boards, and seasonal dishes.',
  },
  {
    id: 103,
    accent: '#7c2d12',
    category: 'Food Industry',
    title: 'Coffee Deal',
    description: 'A warm cafe poster layout for drinks, pastry pairings, and morning offers.',
  },
  {
    id: 104,
    accent: '#be123c',
    category: 'Food Industry',
    title: 'Dessert Drop',
    description: 'A sweet product launch layout for cakes, desserts, and bakery highlights.',
  },
  {
    id: 105,
    accent: '#ca8a04',
    category: 'Food Industry',
    title: 'Street Tacos',
    description: 'A punchy food stand layout for combo meals, locations, and spicy offers.',
  },
  {
    id: 106,
    accent: '#0891b2',
    category: 'Food Industry',
    title: 'Seafood Platter',
    description: 'A premium portrait sample for restaurant specials and seafood menus.',
  },
  {
    id: 107,
    accent: '#9333ea',
    category: 'Food Industry',
    title: 'Milk Tea Menu',
    description: 'A playful drink poster for flavors, add-ons, and student-friendly promos.',
  },
  {
    id: 108,
    accent: '#f59e0b',
    category: 'Food Industry',
    title: 'Breakfast Set',
    description: 'A bright morning menu layout for cafes, bakeries, and brunch promos.',
  },
  {
    id: 109,
    accent: '#15803d',
    category: 'Food Industry',
    title: 'Meal Prep',
    description: 'A structured food service layout for weekly menus and ordering details.',
  },
];

const businessTemplates: BusinessTemplateSample[] = [
  {
    id: 200,
    accent: '#2563eb',
    category: 'Business',
    title: 'Brand Launch',
    description: 'A portrait layout sample for announcing a new brand, offer, or service.',
  },
  {
    id: 201,
    accent: '#0f766e',
    category: 'Business',
    title: 'Service Promo',
    description: 'A clean vertical layout for packages, features, and client-facing offers.',
  },
  {
    id: 202,
    accent: '#7c3aed',
    category: 'Business',
    title: 'Product Drop',
    description: 'A bold portrait sample for product reveals, updates, and quick campaigns.',
  },
  {
    id: 203,
    accent: '#be185d',
    category: 'Business',
    title: 'Team Feature',
    description: 'A professional poster layout for staff highlights and creator profiles.',
  },
  {
    id: 204,
    accent: '#0891b2',
    category: 'Business',
    title: 'Event Invite',
    description: 'A vertical event layout for dates, speakers, venues, and registration prompts.',
  },
  {
    id: 205,
    accent: '#4f46e5',
    category: 'Business',
    title: 'Case Study',
    description: 'A structured layout sample for outcomes, proof points, and client work.',
  },
  {
    id: 206,
    accent: '#15803d',
    category: 'Business',
    title: 'Clinic Notice',
    description: 'A calm service layout for appointment reminders and care announcements.',
  },
  {
    id: 207,
    accent: '#ea580c',
    category: 'Business',
    title: 'Sales Poster',
    description: 'A high-impact portrait layout for discounts, seasonal promos, and bundles.',
  },
  {
    id: 208,
    accent: '#9333ea',
    category: 'Business',
    title: 'Course Offer',
    description: 'A polished sample for workshops, online classes, and coaching programs.',
  },
  {
    id: 209,
    accent: '#334155',
    category: 'Business',
    title: 'Agency Proof',
    description: 'A sharp business layout for results, testimonials, and service positioning.',
  },
];

const categoryLabels: Record<TemplateCategory, string> = {
  personal: 'Personal',
  food: 'Food',
  business: 'Business',
};

const categoryCopy: Record<TemplateCategory, { subtitle: string; title: string }> = {
  personal: {
    title: 'Made For Myself.',
    subtitle: 'Ten personal layouts for portraits, memories, school posts, and creative updates.',
  },
  food: {
    title: 'Food Templates.',
    subtitle: 'Ten portrait layout samples for restaurants, cafes, drinks, desserts, and food promos.',
  },
  business: {
    title: 'Business Templates.',
    subtitle: 'Ten portrait layout samples for services, promos, launches, teams, and offers.',
  },
};

type TemplatesSectionProps = {
  onOpenModal: (template: Template) => void;
};

function BusinessTemplateCard({ template }: { template: BusinessTemplateSample }) {
  return (
    <article className="preview-card flex flex-col overflow-hidden rounded-lg border border-black/5 bg-white transition-[transform] duration-300 hover:-translate-y-1">
      <div className="flex justify-center bg-slate-50 py-5">
        <div
          className="relative aspect-[9/16] max-h-80 w-full max-w-[180px] overflow-hidden rounded-md bg-white shadow-[0_18px_40px_rgb(15_23_42_/_0.14)]"
          style={{ '--business-accent': template.accent } as CSSProperties}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff7ed_0%,#fff7ed_18%,var(--business-accent)_18%,var(--business-accent)_100%)]" />
          <div className="absolute inset-x-0 top-[16%] h-[42%] bg-[radial-gradient(circle,#111827_0.9px,transparent_1.4px)] bg-[size:10px_10px] opacity-20" />
          <div className="absolute -right-10 top-16 h-32 w-32 rounded-full bg-white/20" />
          <div className="absolute left-4 top-4 rounded-sm bg-slate-950 px-2 py-1 text-[7px] font-black uppercase tracking-widest text-white">
            Fresh
          </div>
          <div className="absolute right-4 top-4 rounded-full bg-white px-2 py-1 text-[8px] font-black text-slate-950">
            -20%
          </div>
          <div className="absolute left-5 right-5 top-[21%] aspect-square rounded-full bg-white p-3 shadow-[0_14px_24px_rgb(0_0_0_/_0.2)]">
            <div className="h-full w-full rounded-full border-[10px] border-orange-100 bg-[radial-gradient(circle_at_50%_48%,#fde68a_0%,#f97316_37%,#7f1d1d_38%,#7f1d1d_44%,#fde68a_45%,#fde68a_100%)]" />
          </div>
          <div className="absolute bottom-[21%] left-4 right-4 rounded-sm bg-white/95 p-3 shadow-[0_10px_18px_rgb(0_0_0_/_0.18)]">
            <div className="h-3 w-20 rounded-full bg-slate-950" />
            <div className="mt-2 h-2 w-28 rounded-full bg-slate-300" />
            <div className="mt-1.5 h-2 w-20 rounded-full bg-slate-200" />
          </div>
          <div className="absolute bottom-5 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest">Order Now</p>
              <p className="mt-1 text-2xl font-black leading-none">$9</p>
            </div>
            <div className="rounded-full bg-white px-3 py-2 text-[8px] font-black uppercase text-slate-950">
              Menu
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 text-left">
        <span className="mb-3 w-fit rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
          {template.category}
        </span>
        <h3 className="text-xl font-bold tracking-normal text-ink">{template.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{template.description}</p>
        <div className="mt-auto pt-6">
          <button
            type="button"
            className="w-full rounded-md border border-slate-200 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-600"
          >
            Layout Sample
          </button>
        </div>
      </div>
    </article>
  );
}

export function TemplatesSection({ onOpenModal }: TemplatesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('personal');
  const sampleTemplates = selectedCategory === 'food' ? foodTemplates : businessTemplates;
  const copy = categoryCopy[selectedCategory];

  return (
    <section id="templates" className={sectionClass}>
      <div className={sectionHeaderClass}>
        <h2 className={sectionTitleClass}>{copy.title}</h2>
        <p className={sectionSubtitleClass}>
          {copy.subtitle}
        </p>
      </div>

      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-black/10 bg-white p-1 shadow-[0_14px_32px_rgb(0_0_0_/_0.08)]">
          {(Object.keys(categoryLabels) as TemplateCategory[]).map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.16em] transition duration-300 ${isSelected
                  ? 'bg-ink text-white shadow-[0_10px_22px_rgb(0_0_0_/_0.16)]'
                  : 'text-muted hover:bg-slate-100 hover:text-ink'
                  }`}
              >
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={selectedCategory}
        className="template-grid-enter grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {selectedCategory === 'business' ? (
          businessTemplates.map((template) => (
            <BusinessTemplateCard key={template.id} template={template} />
          ))
        ) : (
          (selectedCategory === 'personal' ? personalTemplates : foodTemplatesList).map((template) => (
            <article
              key={template.id}
              className="preview-card flex flex-col overflow-hidden rounded-lg transition-[transform] duration-300 hover:-translate-y-1"
            >
              {template.kind === 'portrait-poster' || template.kind === 'food-poster' ? (
                <div className="bg-transparent p-0">
                  {template.id === 0 ? (
                    <Template1Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 1 ? (
                    <Template2Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 2 ? (
                    <Template3Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 3 ? (
                    <Template4Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 4 ? (
                    <Template5Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 5 ? (
                    <Template6Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 6 ? (
                    <Template7Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 7 ? (
                    <Template8Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 8 ? (
                    <Template9Poster photoSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 10 ? (
                    <Template10Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : template.id === 11 ? (
                    <Food1Poster imageSrc={template.image} compact className="mx-auto max-h-80" />
                  ) : null}
                </div>
              ) : (
                <img
                  src={template.image}
                  alt={`${template.title} preview`}
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-6 text-left">
                {(template.kind === 'portrait-poster' || template.kind === 'food-poster') && (
                  <span className="mb-3 w-fit rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600">
                    1080 x 1920
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-normal text-ink">{template.title}</h3>
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
          ))
        )}
      </div>
    </section>
  );
}

