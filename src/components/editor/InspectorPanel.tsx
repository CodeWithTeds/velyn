import type { ReactNode } from 'react';

type InspectorPanelProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  footer: string;
  title: string;
};

export function InspectorPanel({
  children,
  description,
  eyebrow,
  footer,
  title,
}: InspectorPanelProps) {
  return (
    <aside className="flex min-h-0 flex-col rounded-[28px] border border-black/5 bg-white/85 text-slate-950 shadow-[0_18px_45px_rgb(15_23_42_/_0.08)] backdrop-blur-2xl">
      <div className="border-b border-black/5 p-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-normal">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5">{children}</div>

      <div className="border-t border-black/5 p-5 text-xs leading-5 text-slate-400">{footer}</div>
    </aside>
  );
}
