import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { InspectorPanel } from '@/components/editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '@/components/editor/editorTypes';
import { EditorSlider } from '@/components/editor/EditorSlider';
import { Food5Poster } from './Food5Poster';
import { clamp, defaultImageTransform } from '../food1/imageTransform';
import type { ImageTransform } from '../food1/imageTransform';

type Food5EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Food5Editor({
  defaultImage = '/images/food/pizza.png',
  fullscreen = false,
}: Food5EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageLeft, setUploadedImageLeft] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);
  const [imageLeftTransform, setImageLeftTransform] = useState<ImageTransform>(defaultImageTransform);

  const [scriptTitle, setScriptTitle] = useState('Delicious');
  const [mainTitle, setMainTitle] = useState('MENU');
  const [badgeText, setBadgeText] = useState('25%\nOFF');
  const [phone, setPhone] = useState('+123 4567 890');
  const [website, setWebsite] = useState('www.velyn.com');
  const [companyName, setCompanyName] = useState('VELYN');

  const [menuLeft, setMenuLeft] = useState([
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱150' },
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱120' },
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱150' },
  ]);
  const [menuSpecial, setMenuSpecial] = useState([
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱180' },
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱180' },
  ]);
  const [menuRight, setMenuRight] = useState([
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱199' },
    { title: 'FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱149' },
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱199' },
    { title: 'SPECIAL FOOD NAME', desc: 'Lorem ipsum dolor sit amet', price: '₱199' },
  ]);

  const handleMenuLeftChange = (index: number, field: 'title' | 'price', value: string) => {
    setMenuLeft((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
  };
  const handleMenuSpecialChange = (index: number, field: 'title' | 'price', value: string) => {
    setMenuSpecial((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
  };
  const handleMenuRightChange = (index: number, field: 'title' | 'price', value: string) => {
    setMenuRight((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
  };

  const [primaryColor, setPrimaryColor] = useState('#e62429');
  const [secondaryColor, setSecondaryColor] = useState('#ff6b00');
  const [footerColor, setFooterColor] = useState('#111111');

  const primarySwatches = ['#e62429', '#ff0055', '#7a0016', '#ff8800', '#00b894', '#0984e3'];
  const secondarySwatches = ['#ff6b00', '#ff9f43', '#e84393', '#fdcb6e', '#55efc4', '#74b9ff'];
  const footerSwatches = ['#111111', '#2d3436', '#000000', '#636e72', '#2c3e50', '#8e44ad'];

  // Element Transforms
  const [scriptTitleTransform, setScriptTitleTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [mainTitleTransform, setMainTitleTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [badgeTransform, setBadgeTransform] = useState({ x: 0, y: 0, scale: 1 });

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
      if (uploadedImageLeft) URL.revokeObjectURL(uploadedImageLeft);
    };
  }, [uploadedImage, uploadedImageLeft]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextImage = URL.createObjectURL(file);
    setUploadedImage((currentImage) => {
      if (currentImage) URL.revokeObjectURL(currentImage);
      return nextImage;
    });
  };

  const handleImageLeftChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextImage = URL.createObjectURL(file);
    setUploadedImageLeft((currentImage) => {
      if (currentImage) URL.revokeObjectURL(currentImage);
      return nextImage;
    });
  };

  const updateTransform = (key: keyof ImageTransform, value: number) => {
    setImageTransform((prev) => ({ ...prev, [key]: value }));
  };

  const updateLeftTransform = (key: keyof ImageTransform, value: number) => {
    setImageLeftTransform((prev) => ({ ...prev, [key]: value }));
  };

  const resetTransform = () => {
    setImageTransform(defaultImageTransform);
  };

  const resetLeftTransform = () => {
    setImageLeftTransform(defaultImageTransform);
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
    if (id === 'scriptTitle') currentPos = scriptTitleTransform;
    if (id === 'mainTitle') currentPos = mainTitleTransform;
    if (id === 'badge') currentPos = badgeTransform;
    if (id === 'imageRight') currentPos = { x: imageTransform.x, y: imageTransform.y };
    if (id === 'imageLeft') currentPos = { x: imageLeftTransform.x, y: imageLeftTransform.y };

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

    if (dragState.id === 'scriptTitle') setScriptTitleTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'mainTitle') setMainTitleTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'badge') setBadgeTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'imageRight') setImageTransform(p => ({ ...p, x: nx, y: ny }));
    if (dragState.id === 'imageLeft') setImageLeftTransform(p => ({ ...p, x: nx, y: ny }));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      dragStateRef.current = null;
    }
  };

  const statusItems: EditorStatusItem[] = [
    { label: '1080 x 1920' },
    { label: 'Menu Flyer' },
    { label: 'Modern' },
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
        description="Drag the main food image, adjust colors, and edit text for this dynamic menu flyer."
        label="Food Layer"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div ref={downloadRef} className={`m-auto aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}>
          <Food5Poster
            imageRightSrc={uploadedImage ?? defaultImage}
            imageLeftSrc={uploadedImageLeft ?? "/images/food/burger.png"}
            imageTransform={imageTransform}
            imageLeftTransform={imageLeftTransform}
            scriptTitle={scriptTitle}
            mainTitle={mainTitle}
            badgeText={badgeText}
            phone={phone}
            website={website}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            footerColor={footerColor}
            companyName={companyName}
            menuLeft={menuLeft}
            menuSpecial={menuSpecial}
            menuRight={menuRight}
            onPointerDown={(e) => handleElementPointerDown('imageRight', e as any)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onElementPointerDown={handleElementPointerDown}
            scriptTitleTransform={scriptTitleTransform}
            mainTitleTransform={mainTitleTransform}
            badgeTransform={badgeTransform}
            className="h-full w-full touch-none shadow-2xl"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel eyebrow="Food 5" title="Dynamic Menu" footer="1080 x 1920 px - 9:16 Story format" description="Adjust text and colors">
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Header Typography</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Name</span>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Script Title</span>
              <input type="text" value={scriptTitle} onChange={(e) => setScriptTitle(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Title</span>
              <input type="text" value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Food Menu Items</h3>
          <div className="space-y-3">
            {menuLeft.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleMenuLeftChange(idx, 'title', e.target.value)}
                  className="flex-1 min-w-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-slate-950"
                  placeholder={`Item ${idx + 1}`}
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handleMenuLeftChange(idx, 'price', e.target.value)}
                  className="w-14 shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-slate-950"
                  placeholder="Price"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Special Menu Items</h3>
          <div className="space-y-3">
            {menuSpecial.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleMenuSpecialChange(idx, 'title', e.target.value)}
                  className="flex-1 min-w-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-slate-950"
                  placeholder={`Item ${idx + 1}`}
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handleMenuSpecialChange(idx, 'price', e.target.value)}
                  className="w-14 shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-slate-950"
                  placeholder="Price"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Fast Food Items</h3>
          <div className="space-y-3">
            {menuRight.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleMenuRightChange(idx, 'title', e.target.value)}
                  className="flex-1 min-w-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-slate-950"
                  placeholder={`Item ${idx + 1}`}
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handleMenuRightChange(idx, 'price', e.target.value)}
                  className="w-14 shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-slate-950"
                  placeholder="Price"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold text-slate-950">Call to Action</h3>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Badge Text</span>
              <textarea value={badgeText} onChange={(e) => setBadgeText(e.target.value)} rows={2} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950 resize-none" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</span>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Website</span>
              <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950" />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Colors</h3>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Primary (Gradient Top)</span>
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
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Secondary (Gradient Bottom)</span>
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
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Footer Tone</span>
              <input type="color" value={footerColor} onChange={(e) => setFooterColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {footerSwatches.map((color) => (
                <button key={color} type="button" onClick={() => setFooterColor(color)} className={`h-8 rounded-full border transition ${footerColor === color ? 'border-slate-950 ring-2 ring-slate-950 ring-offset-2' : 'border-slate-200'}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Image (Right)</p>
          <label className="relative mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-slate-800">
            Change picture
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Transform Main Image</h3>
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
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Main Image Tone</h3>
          <EditorSlider label="Brightness" min={50} max={150} value={imageTransform.brightness} suffix="%" onChange={(v) => updateTransform('brightness', v)} />
          <EditorSlider label="Contrast" min={50} max={150} value={imageTransform.contrast} suffix="%" onChange={(v) => updateTransform('contrast', v)} />
        </section>

        <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Second Image (Left)</p>
          <label className="relative mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-slate-800">
            Change picture
            <input type="file" accept="image/*" className="hidden" onChange={handleImageLeftChange} />
          </label>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Transform Second Image</h3>
            <button
              onClick={resetLeftTransform}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-950"
            >
              Reset
            </button>
          </div>
          <EditorSlider label="Zoom" min={50} max={250} value={imageLeftTransform.scale} suffix="%" onChange={(v) => updateLeftTransform('scale', v)} />
          <EditorSlider label="Move X" min={-150} max={150} value={imageLeftTransform.x} onChange={(v) => updateLeftTransform('x', v)} />
          <EditorSlider label="Move Y" min={-150} max={150} value={imageLeftTransform.y} onChange={(v) => updateLeftTransform('y', v)} />
          <EditorSlider label="Rotate" min={-180} max={180} value={imageLeftTransform.rotate} suffix="deg" onChange={(v) => updateLeftTransform('rotate', v)} />
        </section>

        <section className="space-y-5">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Second Image Tone</h3>
          <EditorSlider label="Brightness" min={50} max={150} value={imageLeftTransform.brightness} suffix="%" onChange={(v) => updateLeftTransform('brightness', v)} />
          <EditorSlider label="Contrast" min={50} max={150} value={imageLeftTransform.contrast} suffix="%" onChange={(v) => updateLeftTransform('contrast', v)} />
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
          <DownloadButton targetRef={downloadRef} fileName="dynamic-menu-poster.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
