import { EditorPageShell } from '../../editor/EditorPageShell';
import { Template1Editor } from './Template1Editor';

type Template1EditorPageProps = {
  onBack: () => void;
};

export function Template1EditorPage({ onBack }: Template1EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 1 - 1080 x 1920"
      onBack={onBack}
      title="Photo Editor"
    >
      <Template1Editor fullscreen />
    </EditorPageShell>
  );
}
