import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Template8Editor } from './Template8Editor';

type Template8EditorPageProps = {
  onBack: () => void;
};

export function Template8EditorPage({ onBack }: Template8EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 8 - 1080 x 1920"
      onBack={onBack}
      title="Birthday Editor"
    >
      <Template8Editor fullscreen />
    </EditorPageShell>
  );
}
