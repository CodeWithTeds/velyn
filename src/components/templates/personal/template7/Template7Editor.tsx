import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { InspectorPanel } from '@/components/editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '@/components/editor/editorTypes';
import { EditorSlider } from '@/components/editor/EditorSlider';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';
import { Template7Poster } from './Template7Poster';

type Template7EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Template7Editor({
  defaultImage = '/images/developer/image.png',
  fullscreen = false,
}: Template7EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>({
    ...defaultImageTransform,
    scale: 120,
    y: 10,
  });
  
  // State for new typographic fields (Updated to English defaults)
  const [university, setUniversity] = useState('DESIGN FACULTY\nARTS UNIVERSITY\nVELYN DIGITAL STUDIO');
  const [scriptText, setScriptText] = useState('I think');
  const [mainText, setMainText] = useState('WE HAVE OUR OWN');
  const [keyword, setKeyword] = useState('TIMELINE.');
  const [archiveName, setArchiveName] = useState('Archive Velyn Studio');
  
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
    { label: 'Portfolio' },
    { label: 'Clean Design' },
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
        description="Position your subject within the academic frame. Edit the typography to match your portfolio identity."
        label="Academic Portfolio"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div
          ref={downloadRef}
          className={`aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}
        >
          <Template7Poster
            imageSrc={uploadedImage ?? defaultImage}
            imageTransform={imageTransform}
            university={university}
            scriptText={scriptText}
            mainText={mainText}
            keyword={keyword}
            archiveName={archiveName}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="h-full w-full cursor-grab touch-none shadow-2xl active:cursor-grabbing"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel
        description="Modify the headers, main message, and subject positioning for this modern academic layout."
        eyebrow="Template 7"
        footer="1080 x 1920 px - 9:16 Academic Poster"
        title="Portfolio Identity"
      >
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Typography</h3>
          

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Institution / Info</span>
            <textarea
              value={university}
              onChange={(e) => setUniversity(e.target.value.toUpperCase())}
              rows={3}
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-slate-950 resize-none"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Script Text (Intro)</span>
            <input
              type="text"
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Message</span>
            <textarea
              value={mainText}
              onChange={(e) => setMainText(e.target.value.toUpperCase())}
              rows={2}
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-black outline-none focus:border-slate-950 resize-none tracking-tighter"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Keyword (Orange)</span>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toUpperCase())}
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-black outline-none focus:border-slate-950 text-[#f97316] tracking-tighter"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Archive Credit (Edge)</span>
            <input
              type="text"
              value={archiveName}
              onChange={(e) => setArchiveName(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-slate-950"
            />
          </label>
        </section>
        
        <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject Upload</p>
          <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-zinc-800">
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
          <EditorSlider label="Scale" min={50} max={300} value={imageTransform.scale} suffix="%" onChange={(value) => updateTransform('scale', value)} />
          <EditorSlider label="X Axis" min={-100} max={100} value={imageTransform.x} onChange={(value) => updateTransform('x', value)} />
          <EditorSlider label="Y Axis" min={-100} max={100} value={imageTransform.y} onChange={(value) => updateTransform('y', value)} />
          <EditorSlider label="Rotation" min={-45} max={45} value={imageTransform.rotate} suffix="deg" onChange={(value) => updateTransform('rotate', value)} />
        </section>

        <section className="mt-8">
          <DownloadButton targetRef={downloadRef} fileName="template7-portfolio.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
