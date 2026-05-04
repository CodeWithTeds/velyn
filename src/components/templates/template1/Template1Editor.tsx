import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent } from 'react';
import { EditorSlider } from './EditorSlider';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';
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
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);
  const dragStateRef = useRef<{
    originX: number;
    originY: number;
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);

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

  const updateTransform = (key: keyof ImageTransform, value: number) => {
    setImageTransform((currentTransform) => ({
      ...currentTransform,
      [key]: value,
    }));
  };

  const resetTransform = () => {
    setImageTransform(defaultImageTransform);
  };

  const nudgeTransform = (x: number, y: number) => {
    setImageTransform((currentTransform) => ({
      ...currentTransform,
      x: clamp(currentTransform.x + x, -80, 80),
      y: clamp(currentTransform.y + y, -80, 80),
    }));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      originX: imageTransform.x,
      originY: imageTransform.y,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    setImageTransform((currentTransform) => ({
      ...currentTransform,
      x: clamp(dragState.originX + (event.clientX - dragState.startX) / 5, -80, 80),
      y: clamp(dragState.originY + (event.clientY - dragState.startY) / 5, -80, 80),
    }));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      dragStateRef.current = null;
    }
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
            imageTransform={imageTransform}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`h-full w-full shadow-2xl ${
              fullscreen ? 'max-h-[calc(100vh-9rem)] max-w-[486px]' : 'max-h-[760px] max-w-[428px]'
            } cursor-grab touch-none active:cursor-grabbing`}
          />
        </div>
      </div>

      <aside className="flex min-h-0 flex-col rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
            Template 1
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-normal">Photo Layer</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Drag the poster to reposition the photo, or use exact layer controls below.
          </p>
        </div>

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-5">
          <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Source</p>
            <p className="mt-2 text-sm text-slate-600">Portrait source, auto converted to B&W.</p>

            <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-600">
              Change picture
              <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
            </label>
          </section>

          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Transform</h3>
              <button
                onClick={resetTransform}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-600"
              >
                Reset
              </button>
            </div>

            <EditorSlider
              label="Zoom"
              min={60}
              max={240}
              value={imageTransform.scale}
              suffix="%"
              onChange={(value) => updateTransform('scale', value)}
            />
            <EditorSlider
              label="Move X"
              min={-80}
              max={80}
              value={imageTransform.x}
              onChange={(value) => updateTransform('x', value)}
            />
            <EditorSlider
              label="Move Y"
              min={-80}
              max={80}
              value={imageTransform.y}
              onChange={(value) => updateTransform('y', value)}
            />
            <EditorSlider
              label="Rotate"
              min={-30}
              max={30}
              value={imageTransform.rotate}
              suffix="deg"
              onChange={(value) => updateTransform('rotate', value)}
            />
          </section>

          <section className="space-y-5">
            <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Tone</h3>
            <EditorSlider
              label="Brightness"
              min={55}
              max={140}
              value={imageTransform.brightness}
              suffix="%"
              onChange={(value) => updateTransform('brightness', value)}
            />
            <EditorSlider
              label="Contrast"
              min={80}
              max={190}
              value={imageTransform.contrast}
              suffix="%"
              onChange={(value) => updateTransform('contrast', value)}
            />
          </section>

          <section>
            <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Nudge</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div />
              <button
                onClick={() => nudgeTransform(0, -4)}
                className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950"
              >
                Up
              </button>
              <div />
              <button
                onClick={() => nudgeTransform(-4, 0)}
                className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950"
              >
                Left
              </button>
              <button
                onClick={resetTransform}
                className="rounded-md border border-slate-200 py-2 text-xs font-bold uppercase hover:border-slate-950"
              >
                Fit
              </button>
              <button
                onClick={() => nudgeTransform(4, 0)}
                className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950"
              >
                Right
              </button>
              <div />
              <button
                onClick={() => nudgeTransform(0, 4)}
                className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950"
              >
                Down
              </button>
              <div />
            </div>
          </section>
        </div>

        <div className="border-t border-slate-200 p-5 text-xs leading-5 text-slate-400">
          1080 x 1920 px - 9:16 TikTok portrait format
        </div>
      </aside>
    </div>
  );
}
