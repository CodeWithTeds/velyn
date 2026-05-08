import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, PointerEvent } from 'react';
import { DownloadButton } from '../../editor/DownloadButton';
import { EditorCanvas } from '../../editor/EditorCanvas';
import { EditorToolbar } from '../../editor/EditorToolbar';
import { InspectorPanel } from '../../editor/InspectorPanel';
import type { EditorQuickAction, EditorStatusItem } from '../../editor/editorTypes';
import { Template9Poster } from './Template9Poster';

type Template9EditorProps = {
  defaultLogo?: string;
  defaultPhoto?: string;
  fullscreen?: boolean;
};

type ImageKey = 'logo' | 'photo';
type PhotoTransform = {
  scale: number;
  x: number;
  y: number;
};

const imageFields: Array<{ description: string; key: ImageKey; label: string }> = [
  { key: 'photo', label: 'Girl photo', description: 'Main student picture for the poster.' },
  { key: 'logo', label: 'Logo', description: 'Used in the header and as the faint background mark.' },
];

const defaultPhotoTransform: PhotoTransform = {
  scale: 100,
  x: 0,
  y: 0,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Template9Editor({
  defaultLogo = '/images/logo.png',
  defaultPhoto = '/images/prof.png',
  fullscreen = false,
}: Template9EditorProps) {
  const [logoSrc, setLogoSrc] = useState(defaultLogo);
  const [photoSrc, setPhotoSrc] = useState(defaultPhoto);
  const [councilName, setCouncilName] = useState('Supreme Student Council');
  const [name, setName] = useState('HYERI');
  const [title, setTitle] = useState('SECRETARY');
  const [schoolName, setSchoolName] = useState('Falconridge School of Excellence');
  const [photoTransform, setPhotoTransform] = useState<PhotoTransform>(defaultPhotoTransform);
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
    }

    event.target.value = '';
  };

  const resetPhoto = () => {
    setPhotoTransform(defaultPhotoTransform);
  };

  const zoomPhoto = (amount: number) => {
    setPhotoTransform((currentTransform) => ({
      ...currentTransform,
      scale: clamp(currentTransform.scale + amount, 70, 150),
    }));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      originX: photoTransform.x,
      originY: photoTransform.y,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    setPhotoTransform((currentTransform) => ({
      ...currentTransform,
      x: clamp(dragState.originX + (event.clientX - dragState.startX) / 5, -32, 32),
      y: clamp(dragState.originY + (event.clientY - dragState.startY) / 5, -26, 26),
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
    { label: '2 Pictures' },
    { label: '4 Text Fields' },
  ];

  const quickActions: EditorQuickAction[] = [
    { label: '+', title: 'Zoom photo in', onClick: () => zoomPhoto(5) },
    { label: '-', title: 'Zoom photo out', onClick: () => zoomPhoto(-5) },
    { label: 'R', title: 'Reset photo', tone: 'danger', onClick: resetPhoto },
  ];

  return (
    <div
      className={`grid h-full gap-4 bg-[#f5f5f7] p-4 md:grid-cols-[minmax(0,1fr)_320px] md:grid-rows-[auto_minmax(0,1fr)] md:p-6 ${
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
          className={`h-full w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)] max-w-[486px]' : 'max-h-[760px] max-w-[428px]'}`}
        >
          <Template9Poster
            className="h-full w-full shadow-2xl"
            councilName={councilName}
            logoSrc={logoSrc}
            name={name}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            photoTransform={photoTransform}
            photoSrc={photoSrc}
            schoolName={schoolName}
            title={title}
          />
        </div>
      </EditorCanvas>

      <InspectorPanel
        description="This template is locked to two pictures and four editable text values."
        eyebrow="Template 9"
        footer="1080 x 1920 px - student council portrait format"
        title="Council Poster"
      >
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

        <section className="space-y-3">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Pictures</h3>
          {imageFields.map((field) => (
            <label
              key={field.key}
              className="block cursor-pointer rounded-md border border-slate-200 bg-white p-3 transition hover:border-slate-950"
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
