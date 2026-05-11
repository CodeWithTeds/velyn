import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent, type PointerEventHandler } from 'react';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { InspectorPanel } from '@/components/editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '@/components/editor/editorTypes';
import { EditorSlider } from '@/components/editor/EditorSlider';
import { Template9Poster } from './Template9Poster';

type Template9EditorProps = {
  defaultLogo?: string;
  defaultPhoto?: string;
  fullscreen?: boolean;
};

type ImageKey = 'logo' | 'photo';
type ElementTransform = {
  x: number;
  y: number;
  scale: number;
};
type PhotoTransform = {
  brightness: number;
  contrast: number;
  rotate: number;
  scale: number;
  x: number;
  y: number;
};

const imageFields: Array<{ description: string; key: ImageKey; label: string }> = [
  { key: 'photo', label: 'Girl photo', description: 'Main student picture for the poster.' },
  { key: 'logo', label: 'Logo', description: 'Used in the header and as the faint background mark.' },
];

const backgroundSwatches = ['#062c58', '#7f1d1d', '#14532d', '#4c1d95', '#7c2d12', '#111827'];
const textSwatches = ['#ffffff', '#fff7ed', '#fde047', '#111827', '#f472b6', '#38bdf8'];

const defaultPhotoTransform: PhotoTransform = {
  brightness: 100,
  contrast: 100,
  rotate: 0,
  scale: 96,
  x: 0,
  y: 0,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Template9Editor({
  defaultLogo = '/images/logo.png',
  defaultPhoto = '/images/image copy.png',
  fullscreen = false,
}: Template9EditorProps) {
  const [logoSrc, setLogoSrc] = useState(defaultLogo);
  const [photoSrc, setPhotoSrc] = useState(defaultPhoto);
  const [councilName, setCouncilName] = useState('Supreme Student Council');
  const [name, setName] = useState('HYERI');
  const [title, setTitle] = useState('SECRETARY');
  const [schoolName, setSchoolName] = useState('Falconridge School of Excellence');
  const [backgroundColor, setBackgroundColor] = useState('#062c58');
  const [textColor, setTextColor] = useState('#ffffff');
  const [photoTransform, setPhotoTransform] = useState<PhotoTransform>(defaultPhotoTransform);
  const [councilTransform, setCouncilTransform] = useState<ElementTransform>({ x: 0, y: 0, scale: 1 });
  const [schoolTransform, setSchoolTransform] = useState<ElementTransform>({ x: 0, y: 0, scale: 1 });
  const [nameTransform, setNameTransform] = useState<ElementTransform>({ x: 0, y: 0, scale: 1 });
  const [titleTransform, setTitleTransform] = useState<ElementTransform>({ x: 0, y: 0, scale: 1 });

  const downloadRef = useRef<HTMLDivElement>(null);
  const uploadedUrlsRef = useRef<string[]>([]);
  const dragStateRef = useRef<{
    elementId: string;
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

  const handleImageChange = (key: ImageKey) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    uploadedUrlsRef.current.push(imageUrl);

    if (key === 'logo') {
      if (logoSrc.startsWith('blob:')) URL.revokeObjectURL(logoSrc);
      setLogoSrc(imageUrl);
    } else {
      if (photoSrc.startsWith('blob:')) URL.revokeObjectURL(photoSrc);
      setPhotoSrc(imageUrl);
      setPhotoTransform(defaultPhotoTransform);
    }

    event.target.value = '';
  };

  const resetPhoto = () => {
    setPhotoTransform(defaultPhotoTransform);
  };

  const updatePhotoTransform = (key: keyof PhotoTransform, value: number) => {
    setPhotoTransform((currentTransform) => ({
      ...currentTransform,
      [key]: value,
    }));
  };

  const zoomPhoto = (amount: number) => {
    setPhotoTransform((currentTransform) => ({
      ...currentTransform,
      scale: clamp(currentTransform.scale + amount, 70, 150),
    }));
  };

  const nudgePhoto = (x: number, y: number) => {
    setPhotoTransform((currentTransform) => ({
      ...currentTransform,
      x: clamp(currentTransform.x + x, -32, 32),
      y: clamp(currentTransform.y + y, -26, 26),
    }));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    handleElementPointerDown('photo', event);
  };

  const handleElementPointerDown = (id: string, event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    let originX = 0;
    let originY = 0;

    if (id === 'photo') {
      originX = photoTransform.x;
      originY = photoTransform.y;
    } else if (id === 'council') {
      originX = councilTransform.x;
      originY = councilTransform.y;
    } else if (id === 'school') {
      originX = schoolTransform.x;
      originY = schoolTransform.y;
    } else if (id === 'name') {
      originX = nameTransform.x;
      originY = nameTransform.y;
    } else if (id === 'title') {
      originX = titleTransform.x;
      originY = titleTransform.y;
    }

    dragStateRef.current = {
      elementId: id,
      originX,
      originY,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.stopPropagation();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const dx = (event.clientX - dragState.startX) / 1;
    const dy = (event.clientY - dragState.startY) / 1;

    if (dragState.elementId === 'photo') {
      setPhotoTransform((currentTransform) => ({
        ...currentTransform,
        x: clamp(dragState.originX + dx / 5, -32, 32),
        y: clamp(dragState.originY + dy / 5, -26, 26),
      }));
    } else {
      const setterMap: Record<string, (val: any) => void> = {
        council: setCouncilTransform,
        school: setSchoolTransform,
        name: setNameTransform,
        title: setTitleTransform,
      };
      const setter = setterMap[dragState.elementId];
      if (setter) {
        setter((prev: ElementTransform) => ({
          ...prev,
          x: dragState.originX + dx,
          y: dragState.originY + dy,
        }));
      }
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      dragStateRef.current = null;
    }
  };

  const statusItems: EditorStatusItem[] = [
    { label: '1080 x 1920' },
    { label: '2 Pictures' },
    { label: '4 Text Fields' },
    { label: 'Color Controls' },
  ];

  const quickActions: EditorQuickAction[] = [
    { label: '+', title: 'Zoom photo in', onClick: () => zoomPhoto(5) },
    { label: '-', title: 'Zoom photo out', onClick: () => zoomPhoto(-5) },
    { label: 'R', title: 'Reset photo', tone: 'danger', onClick: resetPhoto },
  ];

  return (
    <div
      className={`grid h-full gap-4 overflow-hidden bg-[#f5f5f7] p-4 md:grid-cols-[320px_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] md:p-6 ${
        fullscreen ? 'min-h-0' : 'max-h-[82vh] min-h-[620px]'
      }`}
    >
      <EditorToolbar
        description="Upload one student photo and one logo, then edit the council name, student name, title, and school name."
        label="Student Council Poster"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div
          ref={downloadRef}
          className={`aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}
        >
          <Template9Poster
            backgroundColor={backgroundColor}
            className="h-full w-full shadow-2xl"
            councilName={councilName}
            logoSrc={logoSrc}
            name={name}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onElementPointerDown={handleElementPointerDown}
            photoTransform={photoTransform}
            photoSrc={photoSrc}
            schoolName={schoolName}
            textColor={textColor}
            title={title}
            councilTransform={councilTransform}
            schoolTransform={schoolTransform}
            nameTransform={nameTransform}
            titleTransform={titleTransform}
          />
        </div>
      </EditorCanvas>

      <InspectorPanel
        description="Change the poster background, label text color, images, and editable text."
        eyebrow="Template 9"
        footer="1080 x 1920 px - student council portrait format"
        title="Council Poster"
      >
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Colors</h3>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Background</span>
              <input
                type="color"
                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1"
                aria-label="Custom background color"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {backgroundSwatches.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setBackgroundColor(color)}
                  className={`h-8 rounded-full border transition ${
                    backgroundColor === color ? 'border-slate-950 ring-2 ring-slate-950 ring-offset-2' : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Use ${color} as background color`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Name & Title Text</span>
              <input
                type="color"
                value={textColor}
                onChange={(event) => setTextColor(event.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1"
                aria-label="Custom text color"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {textSwatches.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setTextColor(color)}
                  className={`h-8 rounded-full border transition ${
                    textColor === color ? 'border-slate-950 ring-2 ring-slate-950 ring-offset-2' : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Use ${color} as text color`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Text</h3>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Council Name</span>
            <input
              type="text"
              value={councilName}
              maxLength={40}
              onChange={(event) => setCouncilName(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-extrabold tracking-normal text-slate-950 outline-none transition focus:border-slate-950"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</span>
            <input
              type="text"
              value={name}
              maxLength={16}
              onChange={(event) => setName(event.target.value.toUpperCase())}
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-lg font-black uppercase tracking-normal text-slate-950 outline-none transition focus:border-slate-950"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Title</span>
            <input
              type="text"
              value={title}
              maxLength={22}
              onChange={(event) => setTitle(event.target.value.toUpperCase())}
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-base font-black uppercase tracking-normal text-slate-950 outline-none transition focus:border-slate-950"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">School Name</span>
            <input
              type="text"
              value={schoolName}
              maxLength={48}
              onChange={(event) => setSchoolName(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-bold tracking-normal text-slate-950 outline-none transition focus:border-slate-950"
            />
          </label>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Text Scaling</h3>
          <EditorSlider label="Council Size" min={0.5} max={2} step={0.05} value={councilTransform.scale} onChange={(val) => setCouncilTransform(prev => ({ ...prev, scale: val }))} />
          <EditorSlider label="School Size" min={0.5} max={2} step={0.05} value={schoolTransform.scale} onChange={(val) => setSchoolTransform(prev => ({ ...prev, scale: val }))} />
          <EditorSlider label="Name Size" min={0.5} max={2} step={0.05} value={nameTransform.scale} onChange={(val) => setNameTransform(prev => ({ ...prev, scale: val }))} />
          <EditorSlider label="Title Size" min={0.5} max={2} step={0.05} value={titleTransform.scale} onChange={(val) => setTitleTransform(prev => ({ ...prev, scale: val }))} />
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Pictures</h3>
          {imageFields.map((field) => (
            <label
              key={field.key}
              className="relative block cursor-pointer rounded-md border border-slate-200 bg-white p-3 transition hover:border-slate-950"
            >
              <span className="block text-xs font-bold uppercase tracking-widest text-slate-950">{field.label}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">{field.description}</span>
              <span className="mt-3 inline-flex rounded-md bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                Change picture
              </span>
              <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange(field.key)} />
            </label>
          ))}
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Transform</h3>
            <button
              onClick={resetPhoto}
              className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-950"
            >
              Reset
            </button>
          </div>
          <EditorSlider label="Scale" min={70} max={150} value={photoTransform.scale} suffix="%" onChange={(value) => updatePhotoTransform('scale', value)} />
          <EditorSlider label="X Axis" min={-32} max={32} value={photoTransform.x} onChange={(value) => updatePhotoTransform('x', value)} />
          <EditorSlider label="Y Axis" min={-26} max={26} value={photoTransform.y} onChange={(value) => updatePhotoTransform('y', value)} />
          <EditorSlider label="Rotation" min={-20} max={20} value={photoTransform.rotate} suffix="deg" onChange={(value) => updatePhotoTransform('rotate', value)} />
        </section>

        <section className="space-y-5">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Tone</h3>
          <EditorSlider label="Brightness" min={70} max={140} value={photoTransform.brightness} suffix="%" onChange={(value) => updatePhotoTransform('brightness', value)} />
          <EditorSlider label="Contrast" min={70} max={150} value={photoTransform.contrast} suffix="%" onChange={(value) => updatePhotoTransform('contrast', value)} />
        </section>

        <section>
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Nudge</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div />
            <button onClick={() => nudgePhoto(0, -3)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Up</button>
            <div />
            <button onClick={() => nudgePhoto(-3, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Left</button>
            <button onClick={resetPhoto} className="rounded-md border border-slate-200 py-2 text-xs font-bold uppercase hover:border-slate-950">Fit</button>
            <button onClick={() => nudgePhoto(3, 0)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Right</button>
            <div />
            <button onClick={() => nudgePhoto(0, 3)} className="rounded-md border border-slate-200 py-2 text-sm font-bold hover:border-slate-950">Down</button>
            <div />
          </div>
        </section>

        <section className="mt-8">
          <button
            onClick={resetPhoto}
            className="mb-3 w-full rounded-md border border-slate-200 py-3 text-xs font-bold uppercase tracking-widest text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
          >
            Reset Photo Position
          </button>
          <DownloadButton targetRef={downloadRef} fileName="template9-student-council-poster.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
