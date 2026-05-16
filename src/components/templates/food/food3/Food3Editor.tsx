import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { InspectorPanel } from '@/components/editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '@/components/editor/editorTypes';
import { EditorSlider } from '@/components/editor/EditorSlider';
import { Food3Poster } from './Food3Poster';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';

type Food3EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Food3Editor({
  defaultImage = '/images/food/burger.png',
  fullscreen = false,
}: Food3EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);

  const [mainTitle, setMainTitle] = useState('SUPER\nSPICY');
  const [subtitle, setSubtitle] = useState('NEW ARRIVAL');
  const [badgeText, setBadgeText] = useState('ONLY');
  const [price, setPrice] = useState('₱199');
  const [footerText, setFooterText] = useState('ORDER NOW AT \nWWW.TASTYEATS.COM');

  const [primaryColor, setPrimaryColor] = useState('#E63946');
  const [secondaryColor, setSecondaryColor] = useState('#1D3557');
  const [accentColor, setAccentColor] = useState('#FFB703');

  const primarySwatches = ['#E63946', '#2A9D8F', '#F4A261', '#E76F51', '#264653', '#000000'];
  const secondarySwatches = ['#1D3557', '#FFFFFF', '#E9C46A', '#1A1A1A', '#457B9D', '#A8DADC'];
  const accentSwatches = ['#FFB703', '#E63946', '#FFFFFF', '#F4A261', '#2A9D8F', '#8AB17D'];

  // Element Transforms
  const [mainTitleTransform, setMainTitleTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [subtitleTransform, setSubtitleTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [badgeTextTransform, setBadgeTextTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [priceTransform, setPriceTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [footerTextTransform, setFooterTextTransform] = useState({ x: 0, y: 0, scale: 1 });

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
    if (id === 'subtitle') currentPos = subtitleTransform;
    if (id === 'badgeText') currentPos = badgeTextTransform;
    if (id === 'price') currentPos = priceTransform;
    if (id === 'footerText') currentPos = footerTextTransform;
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
    if (dragState.id === 'subtitle') setSubtitleTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'badgeText') setBadgeTextTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'price') setPriceTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'footerText') setFooterTextTransform(p => ({ ...p, x: nx, y: ny }));
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
    { label: 'Bold' },
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
        description="Drag elements, adjust colors, and edit text for this bold promotional poster."
        label="Food Layer"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div ref={downloadRef} className={`m-auto aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}>
          <Food3Poster
            imageSrc={uploadedImage ?? defaultImage}
            imageTransform={imageTransform}
            mainTitle={mainTitle}
            subtitle={subtitle}
            badgeText={badgeText}
            price={price}
            footerText={footerText}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
            onPointerDown={(e) => handleElementPointerDown('image', e as any)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onElementPointerDown={handleElementPointerDown}
            mainTitleTransform={mainTitleTransform}
            subtitleTransform={subtitleTransform}
            badgeTextTransform={badgeTextTransform}
            priceTransform={priceTransform}
            footerTextTransform={footerTextTransform}
            className="h-full w-full touch-none shadow-2xl"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel eyebrow="Food 3" title="Bold Cravings" footer="1080 x 1920 px - 9:16 Story format" description="Adjust text and image layout">
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Typography</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Title</span>
              <textarea value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Subtitle</span>
              <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Footer Text</span>
              <textarea value={footerText} onChange={(e) => setFooterText(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950 resize-none" />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold text-slate-950">Price Badge</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Badge Prefix</span>
              <input type="text" value={badgeText} onChange={(e) => setBadgeText(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Price Value</span>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
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
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Secondary / Shape</span>
              <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {secondarySwatches.map((color) => (
                <button key={color} type="button" onClick={() => setSecondaryColor(color)} className={`h-8 rounded-full border transition ${secondaryColor === color ? 'border-slate-950 ring-2 ring-slate-950 ring-offset-2' : 'border-slate-200'}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="pt-2">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Accent / Badge</span>
              <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {accentSwatches.map((color) => (
                <button key={color} type="button" onClick={() => setAccentColor(color)} className={`h-8 rounded-full border transition ${accentColor === color ? 'border-slate-950 ring-2 ring-slate-950 ring-offset-2' : 'border-slate-200'}`} style={{ backgroundColor: color }} />
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
          <DownloadButton targetRef={downloadRef} fileName="bold-cravings-poster.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
