import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Template6Editor } from './Template6Editor';

type Template6EditorPageProps = {
  onBack: () => void;
};

export function Template6EditorPage({ onBack }: Template6EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 6 - 1080 x 1920"
      onBack={onBack}
      title="Nostalgic Editor"
    >
      <Template6Editor fullscreen />
    </EditorPageShell>
  );
}
