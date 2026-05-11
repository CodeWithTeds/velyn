import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { InspectorPanel } from '@/components/editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '@/components/editor/editorTypes';
import { EditorSlider } from '@/components/editor/EditorSlider';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';
import { Template5Poster } from './Template5Poster';

type Template5EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Template5Editor({
  defaultImage = '/images/test2.png',
  fullscreen = false,
}: Template5EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);
  const [title, setTitle] = useState('FOCUS');
  const [subtitle, setSubtitle] = useState('ON ME');
  const [author, setAuthor] = useState('ARTIST');
  const [quote, setQuote] = useState('I CANNOT FOCUS ON ANYTHING BUT YOU');
  const [brand, setBrand] = useState('VELYN');
  
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
      scale: clamp(currentTransform.scale + amount, 50, 300),
    }));
  };

  const nudgeTransform = (x: number, y: number) => {
    setImageTransform((currentTransform) => ({
      ...currentTransform,
      x: clamp(currentTransform.x + x, -100, 100),
      y: clamp(currentTransform.y + y, -100, 100),
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
      x: clamp(dragState.originX + (event.clientX - dragState.startX) / 5, -100, 100),
      y: clamp(dragState.originY + (event.clientY - dragState.startY) / 5, -100, 100),
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
    { label: 'Editorial' },
    { label: 'Focus Effect' },
  ];

  const quickActions: EditorQuickAction[] = [
    { label: '+', title: 'Zoom in', onClick: () => zoomBy(10) },
    { label: '-', title: 'Zoom out', onClick: () => zoomBy(-10) },
    { label: 'C', title: 'Center image', onClick: centerTransform },
    { label: 'R', title: 'Reset image', tone: 'danger', onClick: resetTransform },
  ];

  return (
    <div
      className={`grid h-full gap-4 bg-[#f5f5f7] p-4 md:grid-cols-[320px_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] md:p-6 ${
        fullscreen ? 'min-h-0' : 'max-h-[82vh] min-h-[620px]'
      }`}
    >
      <EditorToolbar
        description="Reposition your photo and edit the editorial text elements."
        label="Focus On Me"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div
          ref={downloadRef}
          className={`aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}
        >
          <Template5Poster
            imageSrc={uploadedImage ?? defaultImage}
            imageTransform={imageTransform}
            title={title}
            subtitle={subtitle}
            author={author}
            quote={quote}
            brand={brand}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="h-full w-full cursor-grab touch-none shadow-2xl active:cursor-grabbing"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel
        description="Edit the typography and reposition the subject to align with the focus frame."
        eyebrow="Template 5"
        footer="1080 x 1920 px - 9:16 Editorial Layout"
        title="Focus On Me"
      >
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Typography</h3>
          
          <div className="space-y-3">
             <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Bottom Title</span>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value.toUpperCase())}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject Name</span>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value.toUpperCase())}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
              />
            </label>
             <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Quote</span>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value.toUpperCase())}
                rows={2}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950 resize-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Brand Name</span>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value.toUpperCase())}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
              />
            </label>
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Image Source</p>
          <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-slate-800">
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
          <EditorSlider label="Zoom" min={50} max={300} value={imageTransform.scale} suffix="%" onChange={(value) => updateTransform('scale', value)} />
          <EditorSlider label="Move X" min={-100} max={100} value={imageTransform.x} onChange={(value) => updateTransform('x', value)} />
          <EditorSlider label="Move Y" min={-100} max={100} value={imageTransform.y} onChange={(value) => updateTransform('y', value)} />
          <EditorSlider label="Rotate" min={-45} max={45} value={imageTransform.rotate} suffix="deg" onChange={(value) => updateTransform('rotate', value)} />
        </section>

        <section className="mt-8">
          <DownloadButton targetRef={downloadRef} fileName="template5-focus-on-me.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
