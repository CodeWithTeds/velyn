import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { InspectorPanel } from '@/components/editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '@/components/editor/editorTypes';
import { EditorSlider } from '@/components/editor/EditorSlider';
import { Food1Poster } from './Food1Poster';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';

type Food1EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Food1Editor({
  defaultImage = '/images/food/cupcake.png',
  fullscreen = false,
}: Food1EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);

  const [mainTitle, setMainTitle] = useState('CUP\nCAKE');
  const [subTitle, setSubTitle] = useState('Strawberry + Vanilla');
  const [openHours, setOpenHours] = useState('Open Daily\n9 AM - 10 PM');
  const [price, setPrice] = useState('Get Now\nIDR 10K');
  const [handle, setHandle] = useState('@bakery_delight');

  const [primaryColor, setPrimaryColor] = useState('#b53d5a');
  const [secondaryColor, setSecondaryColor] = useState('#f9f5f0');

  const primarySwatches = ['#b53d5a', '#e11d48', '#062c58', '#14532d', '#7c2d12', '#111827'];
  const secondarySwatches = ['#f9f5f0', '#ffffff', '#fff7ed', '#fde047', '#f472b6', '#38bdf8'];

  // Element Transforms
  const [mainTitleTransform, setMainTitleTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [subTitleTransform, setSubTitleTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [hoursTransform, setHoursTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [priceTransform, setPriceTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [handleTransform, setHandleTransform] = useState({ x: 0, y: 0, scale: 1 });

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
    if (id === 'subTitle') currentPos = subTitleTransform;
    if (id === 'hours') currentPos = hoursTransform;
    if (id === 'price') currentPos = priceTransform;
    if (id === 'handle') currentPos = handleTransform;
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
    if (dragState.id === 'subTitle') setSubTitleTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'hours') setHoursTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'price') setPriceTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'handle') setHandleTransform(p => ({ ...p, x: nx, y: ny }));
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
    { label: 'Cupcake' },
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
        description="Drag the cupcake, resize with zoom, then adjust text for your bakery promo."
        label="Food Layer"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div ref={downloadRef} className={`m-auto aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}>
          <Food1Poster
            imageSrc={uploadedImage ?? defaultImage}
            imageTransform={imageTransform}
            mainTitle={mainTitle}
            subTitle={subTitle}
            openHours={openHours}
            price={price}
            handle={handle}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onPointerDown={(e) => handleElementPointerDown('image', e as any)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onElementPointerDown={handleElementPointerDown}
            mainTitleTransform={mainTitleTransform}
            subTitleTransform={subTitleTransform}
            hoursTransform={hoursTransform}
            priceTransform={priceTransform}
            handleTransform={handleTransform}
            className="h-full w-full touch-none shadow-2xl"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel eyebrow="Food 1" title="Cupcake Delight" footer="1080 x 1920 px - 9:16 Story format" description="Adjust text and image layout">
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Typography</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Title</span>
              <textarea value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Sub Title</span>
              <input type="text" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold text-slate-950">Store Info</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Opening Hours</span>
              <textarea value={openHours} onChange={(e) => setOpenHours(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Price Info</span>
              <textarea value={price} onChange={(e) => setPrice(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Social Handle</span>
              <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Colors</h3>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary</span>
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
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Secondary</span>
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
          <DownloadButton targetRef={downloadRef} fileName="cupcake-poster.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
