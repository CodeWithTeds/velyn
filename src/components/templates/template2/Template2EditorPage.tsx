import { EditorPageShell } from '../../editor/EditorPageShell';
import { Template2Editor } from './Template2Editor';

type Template2EditorPageProps = {
  onBack: () => void;
};

export function Template2EditorPage({ onBack }: Template2EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 2 - 1080 x 1920"
      onBack={onBack}
      title="Photo Editor"
    >
      <Template2Editor fullscreen />
    </EditorPageShell>
  );
}
