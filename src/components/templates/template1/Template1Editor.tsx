import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Template1Poster } from './Template1Poster';

type Template1EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Template1Editor({
  defaultImage = '/images/test3.png',
  fullscreen = false,
}: Template1EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    };
  }, [uploadedImage]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextImage = URL.createObjectURL(file);
    setUploadedImage((currentImage) => {
      if (currentImage) URL.revokeObjectURL(currentImage);
      return nextImage;
    });
  };

  return (
    <div
      className={`grid h-full gap-6 bg-slate-100 p-4 md:grid-cols-[minmax(0,1fr)_280px] md:p-6 ${
        fullscreen ? 'min-h-0' : 'max-h-[82vh] min-h-[620px]'
      }`}
    >
      <div className="flex min-h-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(45deg,#f8fafc_25%,transparent_25%),linear-gradient(-45deg,#f8fafc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f8fafc_75%),linear-gradient(-45deg,transparent_75%,#f8fafc_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0] p-6">
        <div className="flex h-full w-full items-center justify-center rounded-md bg-white p-4 shadow-inner">
          <Template1Poster
            imageSrc={uploadedImage ?? defaultImage}
            className={`h-full w-full shadow-2xl ${
              fullscreen ? 'max-h-[calc(100vh-9rem)] max-w-[560px]' : 'max-h-[760px] max-w-[510px]'
            }`}
          />
        </div>
      </div>

      <aside className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 text-slate-950 shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
          Template 1
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-normal">Portrait Poster</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          The typography, layout, red title, and black and white filter are locked. The only edit is
          replacing the picture.
        </p>

        <div className="mt-7 rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Image</p>
          <p className="mt-2 text-sm text-slate-600">Portrait source, auto converted to B&W.</p>
        </div>

        <label className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-600">
          Change picture
          <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
        </label>

        <div className="mt-auto pt-8 text-xs leading-5 text-slate-400">
          TikTok portrait format · Fixed poster treatment
        </div>
      </aside>
    </div>
  );
}
