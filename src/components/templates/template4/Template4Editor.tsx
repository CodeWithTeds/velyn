import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent } from 'react';
import { DownloadButton } from '../../editor/DownloadButton';
import { EditorCanvas } from '../../editor/EditorCanvas';
import { EditorToolbar } from '../../editor/EditorToolbar';
import { InspectorPanel } from '../../editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '../../editor/editorTypes';
import { EditorSlider } from './EditorSlider';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';
import { Template4Poster } from './Template4Poster';

type Template4EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Template4Editor({
  defaultImage = '/images/developer/image.png',
  fullscreen = false,
}: Template4EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);
  const downloadRef = useRef<HTMLDivElement>(null);
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

  const centerTransform = () => {
    setImageTransform((currentTransform) => ({
      ...currentTransform,
      x: 0,
      y: 0,
      rotate: 0,
    }));
  };

  const zoomBy = (amount: number) => {
    setImageTransform((currentTransform) => ({
      ...currentTransform,
      scale: clamp(currentTransform.scale + amount, 70, 260),
    }));
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

  const statusItems: EditorStatusItem[] = [
    { label: '1080 x 1920' },
    { label: 'Fit Check Type' },
    { label: 'Rough.js Notes' },
  ];

  const quickActions: EditorQuickAction[] = [
    { label: '+', title: 'Zoom in', onClick: () => zoomBy(10) },
    { label: '-', title: 'Zoom out', onClick: () => zoomBy(-10) },
    { label: 'C', title: 'Center image', onClick: centerTransform },
    { label: 'R', title: 'Reset image', tone: 'danger', onClick: resetTransform },
  ];

  return (
    <div
      className={`grid h-full gap-4 bg-[#f5f5f7] p-4 md:grid-cols-[minmax(0,1fr)_320px] md:grid-rows-[auto_minmax(0,1fr)] md:p-6 ${
        fullscreen ? 'min-h-0' : 'max-h-[82vh] min-h-[620px]'
      }`}
    >
      <EditorToolbar
        description="Drag the photo under the locked fit-check title and Rough.js annotations, then tune tone for the poster."
        label="Fit Check"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div
          ref={downloadRef}
          className={`h-full w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)] max-w-[486px]' : 'max-h-[760px] max-w-[428px]'}`}
        >
          <Template4Poster
            imageSrc={uploadedImage ?? defaultImage}
            imageTransform={imageTransform}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="h-full w-full cursor-grab touch-none shadow-2xl active:cursor-grabbing"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel
        description="Drag the poster to reposition the outfit photo under the annotations, or use exact layer controls below."
        eyebrow="Template 4"
        footer="1080 x 1920 px - 9:16 TikTok portrait format"
        title="Fit Check"
      >
        <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Source</p>
          <p className="mt-2 text-sm text-slate-600">Outfit source layered below the title, arrows, and Rough.js notes.</p>

          <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#82a9c9]">
            Change picture
            <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
          </label>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Transform</h3>
            <button
              onClick={resetTransform}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-950"
            >
              Reset
            </button>
          </div>
          <EditorSlider label="Zoom" min={70} max={260} value={imageTransform.scale} suffix="%" onChange={(value) => updateTransform('scale', value)} />
          <EditorSlider label="Move X" min={-80} max={80} value={imageTransform.x} onChange={(value) => updateTransform('x', value)} />
          <EditorSlider label="Move Y" min={-80} max={80} value={imageTransform.y} onChange={(value) => updateTransform('y', value)} />
          <EditorSlider label="Rotate" min={-30} max={30} value={imageTransform.rotate} suffix="deg" onChange={(value) => updateTransform('rotate', value)} />
        </section>

        <section className="space-y-5">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Tone</h3>
          <EditorSlider label="Brightness" min={65} max={145} value={imageTransform.brightness} suffix="%" onChange={(value) => updateTransform('brightness', value)} />
          <EditorSlider label="Contrast" min={80} max={190} value={imageTransform.contrast} suffix="%" onChange={(value) => updateTransform('contrast', value)} />
        </section>

        <section>
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Nudge</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div />
            <button onClick={() => nudgeTransform(0, -4)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Up</button>
            <div />
            <button onClick={() => nudgeTransform(-4, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Left</button>
            <button onClick={resetTransform} className="rounded-md border border-slate-200 py-2 text-xs font-bold uppercase hover:border-slate-950">Fit</button>
            <button onClick={() => nudgeTransform(4, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Right</button>
            <div />
            <button onClick={() => nudgeTransform(0, 4)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Down</button>
            <div />
          </div>
        </section>

        <section className="mt-8">
          <DownloadButton targetRef={downloadRef} fileName="template4-fit-check-download.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
