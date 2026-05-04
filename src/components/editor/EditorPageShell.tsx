import type { ReactNode } from 'react';

type EditorPageShellProps = {
  canvasLabel: string;
  children: ReactNode;
  onBack: () => void;
  title: string;
};

export function EditorPageShell({ canvasLabel, children, onBack, title }: EditorPageShellProps) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] font-sans text-slate-950">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-black/5 bg-white/80 px-[5%] shadow-sm backdrop-blur-2xl">
        <button onClick={onBack} className="flex items-center gap-3.5 text-left">
          <img src="/images/logo.png" alt="Velyn" className="h-9 w-auto" />
          <span className="hidden leading-none sm:block">
            <span className="block text-base font-extrabold tracking-normal text-ink">Velyn</span>
            <span className="mt-1 block text-[11px] font-semibold uppercase text-muted">
              Portrait Studio
            </span>
          </span>
        </button>

        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-500">
            {canvasLabel}
          </p>
          <h1 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-black/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 md:inline-flex">
            Modern Editor
          </span>
          <button
            onClick={onBack}
            className="rounded-full bg-ink px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-black"
          >
            Back
          </button>
        </div>
      </header>

      <div className="h-screen pt-16">{children}</div>
    </main>
  );
}
