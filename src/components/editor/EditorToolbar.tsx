import type { EditorStatusItem } from './editorTypes';

type EditorToolbarProps = {
  description: string;
  label: string;
  statusItems: EditorStatusItem[];
};

export function EditorToolbar({ description, label, statusItems }: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[22px] border border-black/5 bg-white/75 px-4 py-3 shadow-[0_18px_45px_rgb(15_23_42_/_0.08)] backdrop-blur-2xl md:col-span-2">
      <div className="flex min-w-0 items-center gap-3">
        <span className="rounded-full bg-red-50 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-red-600">
          {label}
        </span>
        <p className="truncate text-sm font-semibold text-slate-600">{description}</p>
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        {statusItems.map((item) => (
          <span
            key={item.label}
            className="rounded-full bg-black/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500"
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
