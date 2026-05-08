import { EditorPageShell } from '../../editor/EditorPageShell';
import { Template7Editor } from './Template7Editor';

type Template7EditorPageProps = {
  onBack: () => void;
};

export function Template7EditorPage({ onBack }: Template7EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 7 - 1080 x 1920"
      onBack={onBack}
      title="Archive Editor"
    >
      <Template7Editor fullscreen />
    </EditorPageShell>
  );
}
