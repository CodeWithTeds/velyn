'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h1 className="text-3xl font-extrabold tracking-normal text-ink">Something went wrong.</h1>
      <button
        onClick={reset}
        className="rounded-md bg-ink px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-black"
      >
        Try again
      </button>
    </main>
  );
}
