import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Template1Poster } from './Template1Poster';

type Template1EditorProps = {
  defaultImage?: string;
};

export function Template1Editor({ defaultImage = '/images/test3.png' }: Template1EditorProps) {
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
    <div className="grid max-h-[82vh] min-h-[620px] gap-6 bg-neutral-950 p-4 md:grid-cols-[minmax(0,1fr)_220px] md:p-6">
      <div className="flex min-h-0 items-center justify-center overflow-hidden">
        <Template1Poster
          imageSrc={uploadedImage ?? defaultImage}
          className="h-full max-h-[760px] w-full max-w-[510px] shadow-2xl"
        />
      </div>

      <aside className="flex flex-col justify-center text-white">
        <span className="text-[10px] font-bold uppercase text-red-500">Template 1</span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-normal">Portrait Poster</h2>
        <p className="mt-3 text-sm leading-6 text-white/65">
          The layout, text, colors, and black and white treatment are fixed. Change the picture
          only.
        </p>

        <label className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-md bg-white px-5 py-3 text-xs font-bold uppercase text-neutral-950 transition hover:bg-red-600 hover:text-white">
          Change picture
          <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
        </label>
      </aside>
    </div>
  );
}
