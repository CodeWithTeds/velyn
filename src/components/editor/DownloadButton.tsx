import { useState, useRef, useCallback } from "react";
import type { RefObject } from "react";
import { toPng } from "html-to-image";

type DownloadButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  fileName?: string;
  className?: string;
};

export function DownloadButton({ targetRef, fileName = 'download.png', className = '' }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const lastDownloadTime = useRef<number>(0);

  const handleDownload = useCallback(async () => {
    const now = Date.now();
 
    // Rate limit: 3000ms cooldown
    if (now - lastDownloadTime.current < 3000) return;
    if (!targetRef.current) return;

    setIsDownloading(true);
    lastDownloadTime.current = now;

    try {
      const dataUrl = await toPng(targetRef.current, {
        quality: 1,
        pixelRatio: 2,
        skipFonts: false,
      });

      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download fail:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [targetRef, fileName]);

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`inline-flex items-center justify-center rounded-md px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition ${isDownloading ? 'cursor-not-allowed bg-slate-400' : 'bg-slate-950 hover:bg-slate-800'
        } ${className}`}
    >
      {isDownloading ? (
        <>
          <svg className="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Downloading...
        </>
      ) : (
        'Download Poster'
      )}
    </button>
  );
}