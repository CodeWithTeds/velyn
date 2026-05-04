import type { EditorQuickAction } from './editorTypes';

type QuickActionDockProps = {
  actions: EditorQuickAction[];
};

export function QuickActionDock({ actions }: QuickActionDockProps) {
  return (
    <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col overflow-hidden rounded-full border border-black/5 bg-white/90 p-1 shadow-[0_18px_45px_rgb(15_23_42_/_0.14)] backdrop-blur-2xl">
      {actions.map((action) => (
        <button
          key={action.title}
          onClick={action.onClick}
          className={`h-10 w-10 rounded-full text-[11px] font-black uppercase transition hover:bg-slate-100 ${
            action.tone === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-slate-700'
          }`}
          title={action.title}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
