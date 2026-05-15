import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { InspectorPanel } from '@/components/editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '@/components/editor/editorTypes';
import { EditorSlider } from '@/components/editor/EditorSlider';
import { Food2Poster } from './Food2Poster';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';

type Food2EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Food2Editor({
  defaultImage = '/images/food/egg.png',
  fullscreen = false,
}: Food2EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);

  const [mainTitle, setMainTitle] = useState('Wholesome\nMorning');
  const [label1, setLabel1] = useState('FRESH\nGREENS');
  const [label2, setLabel2] = useState('PROTEIN\nPACKED');
  const [label3, setLabel3] = useState('CRISPY\nTOAST');
  const [label4, setLabel4] = useState('AVO\nGOODNESS');
  const [footerLabel, setFooterLabel] = useState('MORNING\nFUEL');

  const [primaryColor, setPrimaryColor] = useState('#aab293');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');

  const primarySwatches = ['#aab293', '#d4cbb8', '#2d3748', '#8b5a2b', '#b53d5a', '#fde047'];
  const secondarySwatches = ['#ffffff', '#f9f5f0', '#000000', '#f472b6', '#38bdf8', '#fb923c'];

  // Element Transforms
  const [mainTitleTransform, setMainTitleTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [label1Transform, setLabel1Transform] = useState({ x: 0, y: 0, scale: 1 });
  const [label2Transform, setLabel2Transform] = useState({ x: 0, y: 0, scale: 1 });
  const [label3Transform, setLabel3Transform] = useState({ x: 0, y: 0, scale: 1 });
  const [label4Transform, setLabel4Transform] = useState({ x: 0, y: 0, scale: 1 });
  const [footerLabelTransform, setFooterLabelTransform] = useState({ x: 0, y: 0, scale: 1 });

  const downloadRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    id: string;
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
    setImageTransform((prev) => ({ ...prev, [key]: value }));
  };

  const resetTransform = () => {
    setImageTransform(defaultImageTransform);
  };

  const zoomBy = (amount: number) => {
    setImageTransform((prev) => ({
      ...prev,
      scale: clamp(prev.scale + amount, 50, 250),
    }));
  };

  const nudgeTransform = (x: number, y: number) => {
    setImageTransform((prev) => ({
      ...prev,
      x: clamp(prev.x + x, -150, 150),
      y: clamp(prev.y + y, -150, 150),
    }));
  };

  const handleElementPointerDown = (id: string, event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    let currentPos = { x: 0, y: 0 };
    if (id === 'mainTitle') currentPos = mainTitleTransform;
    if (id === 'label1') currentPos = label1Transform;
    if (id === 'label2') currentPos = label2Transform;
    if (id === 'label3') currentPos = label3Transform;
    if (id === 'label4') currentPos = label4Transform;
    if (id === 'footerLabel') currentPos = footerLabelTransform;
    if (id === 'image') currentPos = { x: imageTransform.x, y: imageTransform.y };

    dragStateRef.current = {
      id,
      originX: currentPos.x,
      originY: currentPos.y,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const dx = (event.clientX - dragState.startX);
    const dy = (event.clientY - dragState.startY);

    const nx = dragState.originX + dx;
    const ny = dragState.originY + dy;

    if (dragState.id === 'mainTitle') setMainTitleTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'label1') setLabel1Transform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'label2') setLabel2Transform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'label3') setLabel3Transform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'label4') setLabel4Transform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'footerLabel') setFooterLabelTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'image') setImageTransform(p => ({ ...p, x: nx, y: ny }));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      dragStateRef.current = null;
    }
  };

  const statusItems: EditorStatusItem[] = [
    { label: '1080 x 1920' },
    { label: 'Food Poster' },
    { label: 'Organic' },
  ];

  const quickActions: EditorQuickAction[] = [
    { label: '+', title: 'Zoom in', onClick: () => zoomBy(10) },
    { label: '-', title: 'Zoom out', onClick: () => zoomBy(-10) },
    { label: 'C', title: 'Center image', onClick: () => setImageTransform(p => ({ ...p, x: 0, y: 0, rotate: 0 })) },
    { label: 'R', title: 'Reset', tone: 'danger', onClick: () => resetTransform() },
  ];

  return (
    <div className={`grid h-full gap-4 bg-[#f5f5f7] p-4 md:grid-cols-[320px_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] md:p-6 ${fullscreen ? 'min-h-0' : 'max-h-[82vh] min-h-[620px]'}`}>
      <EditorToolbar
        description="Drag elements, adjust colors, and edit the sketchy annotations."
        label="Food Layer"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div ref={downloadRef} className={`m-auto aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}>
          <Food2Poster
            imageSrc={uploadedImage ?? defaultImage}
            imageTransform={imageTransform}
            mainTitle={mainTitle}
            label1={label1}
            label2={label2}
            label3={label3}
            label4={label4}
            footerLabel={footerLabel}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onPointerDown={(e) => handleElementPointerDown('image', e as any)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onElementPointerDown={handleElementPointerDown}
            mainTitleTransform={mainTitleTransform}
            label1Transform={label1Transform}
            label2Transform={label2Transform}
            label3Transform={label3Transform}
            label4Transform={label4Transform}
            footerLabelTransform={footerLabelTransform}
            className="h-full w-full touch-none shadow-2xl"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel eyebrow="Food 2" title="Wholesome Morning" footer="1080 x 1920 px - 9:16 Story format" description="Adjust text and image layout">
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Typography</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Title</span>
              <textarea value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Footer Label</span>
              <textarea value={footerLabel} onChange={(e) => setFooterLabel(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950 resize-none" />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold text-slate-950">Annotations</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Top Left Label</span>
              <textarea value={label1} onChange={(e) => setLabel1(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Top Right Label</span>
              <textarea value={label2} onChange={(e) => setLabel2(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Bottom Left Label</span>
              <textarea value={label3} onChange={(e) => setLabel3(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Bottom Right Label</span>
              <textarea value={label4} onChange={(e) => setLabel4(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-950 resize-none" />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Colors</h3>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Background</span>
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {primarySwatches.map((color) => (
                <button key={color} type="button" onClick={() => setPrimaryColor(color)} className={`h-8 rounded-full border transition ${primaryColor === color ? 'border-slate-950 ring-2 ring-slate-950 ring-offset-2' : 'border-slate-200'}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="pt-2">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Text & Scribbles</span>
              <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {secondarySwatches.map((color) => (
                <button key={color} type="button" onClick={() => setSecondaryColor(color)} className={`h-8 rounded-full border transition ${secondaryColor === color ? 'border-slate-950 ring-2 ring-slate-950 ring-offset-2' : 'border-slate-200'}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Source Image</p>
          <label className="relative mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-slate-800">
            Change picture
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Transform Image</h3>
            <button
              onClick={resetTransform}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-950"
            >
              Reset
            </button>
          </div>
          <EditorSlider label="Zoom" min={50} max={250} value={imageTransform.scale} suffix="%" onChange={(v) => updateTransform('scale', v)} />
          <EditorSlider label="Move X" min={-150} max={150} value={imageTransform.x} onChange={(v) => updateTransform('x', v)} />
          <EditorSlider label="Move Y" min={-150} max={150} value={imageTransform.y} onChange={(v) => updateTransform('y', v)} />
          <EditorSlider label="Rotate" min={-180} max={180} value={imageTransform.rotate} suffix="deg" onChange={(v) => updateTransform('rotate', v)} />
        </section>

        <section className="space-y-5">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Tone</h3>
          <EditorSlider label="Brightness" min={50} max={150} value={imageTransform.brightness} suffix="%" onChange={(v) => updateTransform('brightness', v)} />
          <EditorSlider label="Contrast" min={50} max={150} value={imageTransform.contrast} suffix="%" onChange={(v) => updateTransform('contrast', v)} />
        </section>

        <section>
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Nudge Elements</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div />
            <button onClick={() => nudgeTransform(0, -10)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Up</button>
            <div />
            <button onClick={() => nudgeTransform(-10, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Left</button>
            <button onClick={resetTransform} className="rounded-md border border-slate-200 py-2 text-xs font-bold uppercase hover:border-slate-950">Fit</button>
            <button onClick={() => nudgeTransform(10, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Right</button>
            <div />
            <button onClick={() => nudgeTransform(0, 10)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Down</button>
            <div />
          </div>
        </section>

        <section className="mt-8">
          <DownloadButton targetRef={downloadRef} fileName="wholesome-morning-poster.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
