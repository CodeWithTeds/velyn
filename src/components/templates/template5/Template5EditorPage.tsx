import { EditorPageShell } from '../../editor/EditorPageShell';
import { Template5Editor } from './Template5Editor';

type Template5EditorPageProps = {
  onBack: () => void;
};

export function Template5EditorPage({ onBack }: Template5EditorPageProps) {
  return (
    <EditorPageShell onBack={onBack}>
      <Template5Editor fullscreen />
    </EditorPageShell>
  );
}
