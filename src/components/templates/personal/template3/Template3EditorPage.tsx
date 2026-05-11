import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Template3Editor } from './Template3Editor';

type Template3EditorPageProps = {
  onBack: () => void;
};

export function Template3EditorPage({ onBack }: Template3EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 3 - 1080 x 1920"
      onBack={onBack}
      title="Photo Editor"
    >
      <Template3Editor fullscreen />
    </EditorPageShell>
  );
}
