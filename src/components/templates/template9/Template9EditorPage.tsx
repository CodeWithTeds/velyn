import { EditorPageShell } from '../../editor/EditorPageShell';
import { Template9Editor } from './Template9Editor';

type Template9EditorPageProps = {
  onBack: () => void;
};

export function Template9EditorPage({ onBack }: Template9EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 9 - 1080 x 1920"
      onBack={onBack}
      title="Council Poster Editor"
    >
      <Template9Editor fullscreen />
    </EditorPageShell>
  );
}
