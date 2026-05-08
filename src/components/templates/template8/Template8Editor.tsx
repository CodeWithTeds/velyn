import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent } from 'react';
import { DownloadButton } from '../../editor/DownloadButton';
import { EditorCanvas } from '../../editor/EditorCanvas';
import { EditorToolbar } from '../../editor/EditorToolbar';
import { InspectorPanel } from '../../editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '../../editor/editorTypes';
import { EditorSlider } from '../../editor/EditorSlider';
import { clamp, defaultImageTransform } from './imageTransform';
import type { ImageTransform } from './imageTransform';
import { Template8Poster } from './Template8Poster';
import type { BirthdayCollageImages } from './birthdayImages';
import { defaultBirthdayImages } from './birthdayImages';

type Template8EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

type ImageSlot = keyof BirthdayCollageImages;

const imageSlots: Array<{ description: string; key: ImageSlot; label: string }> = [
  { key: 'main', label: 'Color portrait', description: 'Main portrait stays full color.' },
  { key: 'stripTop', label: 'B&W photo 1', description: 'Top strip photo renders black and white.' },
  { key: 'stripMiddle', label: 'B&W photo 2', description: 'Middle strip photo renders black and white.' },
  { key: 'stripBottom', label: 'B&W photo 3', description: 'Bottom strip photo renders black and white.' },
  { key: 'cakeIcon', label: 'Cake picture 1', description: 'Small cake image near the birthday headline.' },
  { key: 'cakeMain', label: 'Cake picture 2', description: 'Large cake image on the right side.' },
];

export function Template8Editor({
  defaultImage = '/images/velyn.png',
  fullscreen = false,
}: Template8EditorProps) {
  const [uploadedImages, setUploadedImages] = useState<Partial<BirthdayCollageImages>>({});
  const [dateText, setDateText] = useState('24.09');
  const [imageTransform, setImageTransform] = useState<ImageTransform>(defaultImageTransform);
  const downloadRef = useRef<HTMLDivElement>(null);
  const uploadedUrlsRef = useRef<string[]>([]);
  const dragStateRef = useRef<{
    originX: number;
    originY: number;
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      uploadedUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      uploadedUrlsRef.current = [];
    };
  }, []);

  const posterImages: BirthdayCollageImages = {
    ...defaultBirthdayImages,
    main: defaultImage,
    ...uploadedImages,
  };

  const handleImageChange = (slot: ImageSlot) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextImage = URL.createObjectURL(file);
    uploadedUrlsRef.current.push(nextImage);
    setUploadedImages((currentImages) => {
      const currentImage = currentImages[slot];
      if (currentImage?.startsWith('blob:')) URL.revokeObjectURL(currentImage);
      return {
        ...currentImages,
        [slot]: nextImage,
      };
    });
    event.target.value = '';
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
    { label: '6 Uploads' },
    { label: 'Editable Date' },
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
        description="Upload four birthday photos plus two cake pictures, keep the portrait in color, and edit the bold date text."
        label="Birthday Collage"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div
          ref={downloadRef}
          className={`aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}
        >
          <Template8Poster
            dateText={dateText}
            imageSources={posterImages}
            imageTransform={imageTransform}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="h-full w-full cursor-grab touch-none shadow-2xl active:cursor-grabbing"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel
        description="The three strip photos are automatically black and white. The large portrait and cake pictures stay in color."
        eyebrow="Template 8"
        footer="1080 x 1920 px - birthday collage format"
        title="Birthday Collage"
      >
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Date Text</p>
            <p className="mt-2 text-sm text-slate-600">This controls the large date below the birthday headline.</p>
          </div>
          <input
            type="text"
            value={dateText}
            maxLength={10}
            onChange={(event) => setDateText(event.target.value.toUpperCase())}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-3 font-mono text-2xl font-black tracking-tight text-slate-950 outline-none transition focus:border-slate-950"
          />
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Image Uploads</h3>
          {imageSlots.map((slot) => (
            <label
              key={slot.key}
              className="block cursor-pointer rounded-md border border-slate-200 bg-white p-3 transition hover:border-slate-950"
            >
              <span className="block text-xs font-bold uppercase tracking-widest text-slate-950">{slot.label}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">{slot.description}</span>
              <span className="mt-3 inline-flex rounded-md bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                Change picture
              </span>
              <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange(slot.key)} />
            </label>
          ))}
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

        <section className="space-y-5">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Tone</h3>
          <EditorSlider label="Brightness" min={50} max={150} value={imageTransform.brightness} suffix="%" onChange={(value) => updateTransform('brightness', value)} />
          <EditorSlider label="Contrast" min={50} max={150} value={imageTransform.contrast} suffix="%" onChange={(value) => updateTransform('contrast', value)} />
        </section>

        <section>
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Nudge</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div />
            <button onClick={() => nudgeTransform(0, -5)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Up</button>
            <div />
            <button onClick={() => nudgeTransform(-5, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Left</button>
            <button onClick={resetTransform} className="rounded-md border border-slate-200 py-2 text-xs font-bold uppercase hover:border-slate-950">Fit</button>
            <button onClick={() => nudgeTransform(5, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Right</button>
            <div />
            <button onClick={() => nudgeTransform(0, 5)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Down</button>
            <div />
          </div>
        </section>

        <section className="mt-8">
          <DownloadButton targetRef={downloadRef} fileName="template8-birthday-collage-download.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
