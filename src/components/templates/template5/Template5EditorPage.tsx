import { EditorPageShell } from '../../editor/EditorPageShell';
import { Template5Editor } from './Template5Editor';

type Template5EditorPageProps = {
  onBack: () => void;
};

export function Template5EditorPage({ onBack }: Template5EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 5 - 1080 x 1920"
      onBack={onBack}
      title="Soft Green Editor"
    >
      <Template5Editor fullscreen />
    </EditorPageShell>
  );
}
