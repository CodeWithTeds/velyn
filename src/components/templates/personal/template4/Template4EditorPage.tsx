import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Template4Editor } from './Template4Editor';

type Template4EditorPageProps = {
  onBack: () => void;
};

export function Template4EditorPage({ onBack }: Template4EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 4 - 1080 x 1920"
      onBack={onBack}
      title="Photo Editor"
    >
      <Template4Editor fullscreen />
    </EditorPageShell>
  );
}
