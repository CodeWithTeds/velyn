import { Template1Editor } from './Template1Editor';

type Template1EditorPageProps = {
  onBack: () => void;
};

export function Template1EditorPage({ onBack }: Template1EditorPageProps) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur-xl">
        <button
          onClick={onBack}
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        >
          Back
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-red-500">
            Template 1 - 1080 x 1920
          </p>
          <h1 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">
            Photo Editor
          </h1>
        </div>
        <div className="w-[72px]" />
      </header>

      <div className="h-screen pt-16">
        <Template1Editor fullscreen />
      </div>
    </main>
  );
}
