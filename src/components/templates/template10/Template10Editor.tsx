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
import { Template10Poster } from './Template10Poster';

type Template10EditorProps = {
  defaultImage?: string;
  fullscreen?: boolean;
};

export function Template10Editor({
  defaultImage = '/images/velyn.png',
  fullscreen = false,
}: Template10EditorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<ImageTransform>({
    ...defaultImageTransform,
    scale: 130,
    y: 5
  });
  
  // State for typographic fields
  const [username, setUsername] = useState('Velyn');
  const [handle, setHandle] = useState('@velyn');
  const [count, setCount] = useState('43/365');
  const [headline, setHeadline] = useState('Hello Everyone.');
  const [paragraph, setParagraph] = useState('A curated collection of typographic stories and creative layouts.');
  const [handwrittenText, setHandwrittenText] = useState('Love this');
  const [designCredit, setDesignCredit] = useState('Velyn Design');
  const [hashtag, setHashtag] = useState('#velyn #aesthetic');
  
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
    setImageTransform({ ...defaultImageTransform, scale: 110, y: 5 });
  };

  const zoomBy = (amount: number) => {
    setImageTransform((currentTransform) => ({
      ...currentTransform,
      scale: clamp(currentTransform.scale + amount, 50, 300),
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
    { label: 'Social' },
    { label: 'Sticker Effect' },
  ];

  const quickActions: EditorQuickAction[] = [
    { label: '+', title: 'Zoom in', onClick: () => zoomBy(10) },
    { label: '-', title: 'Zoom out', onClick: () => zoomBy(-10) },
    { label: 'R', title: 'Reset transform', tone: 'danger', onClick: resetTransform },
  ];

  return (
    <div
      className={`grid h-full gap-4 bg-[#f5f5f7] p-4 md:grid-cols-[320px_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] md:p-6 ${
        fullscreen ? 'min-h-0' : 'max-h-[82vh] min-h-[620px]'
      }`}
    >
      <EditorToolbar
        description="Customize the social media elements and subject framing."
        label="Instagram Social"
        statusItems={statusItems}
      />

      <EditorCanvas quickActions={quickActions}>
        <div
          ref={downloadRef}
          className={`aspect-[9/16] h-full w-auto max-w-full ${fullscreen ? 'max-h-[calc(100vh-9rem)]' : 'max-h-[760px]'}`}
        >
          <Template10Poster
            imageSrc={uploadedImage ?? defaultImage}
            imageTransform={imageTransform}
            username={username}
            handle={handle}
            count={count}
            headline={headline}
            paragraph={paragraph}
            handwrittenText={handwrittenText}
            designCredit={designCredit}
            hashtag={hashtag}
            profileImage={profileImage || '/images/velyn.png'}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="h-full w-full cursor-grab touch-none shadow-2xl active:cursor-grabbing"
          />
        </div>
      </EditorCanvas>

      <InspectorPanel
        description="Fine-tune the typography and subject positioning for the social sticker layout."
        eyebrow="Template 10"
        footer="1080 x 1920 px - 9:16 Social Media Story"
        title="Instagram Social"
      >
        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="flex gap-2">
            <label className="flex-1 relative cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => setUploadedImage(event.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                accept="image/*"
              />
              <div className="flex items-center justify-center gap-2 py-2 px-3 rounded border-2 border-slate-900 bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-[10px] font-black uppercase tracking-wider text-center">Change Picture</span>
              </div>
            </label>

            <label className="flex-1 relative cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => setProfileImage(event.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                accept="image/*"
              />
              <div className="flex items-center justify-center gap-2 py-2 px-3 rounded border-2 border-slate-200 bg-white text-slate-950 hover:bg-slate-50 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-[10px] font-black uppercase tracking-wider text-center">Change Profile</span>
              </div>
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-md border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-extrabold tracking-normal text-slate-950">Typography</h3>
          
          <div className="space-y-3">
             <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Headline</span>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Username</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Count</span>
                <input
                  type="text"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
                />
              </label>
            </div>
             <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Description Paragraph</span>
              <textarea
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950 resize-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Handwritten Text</span>
              <input
                type="text"
                value={handwrittenText}
                onChange={(e) => setHandwrittenText(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold outline-none focus:border-slate-950"
              />
            </label>
          </div>
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
          <DownloadButton targetRef={downloadRef} fileName="template10-social.png" className="w-full" />
        </section>
      </InspectorPanel>
    </div>
  );
}
