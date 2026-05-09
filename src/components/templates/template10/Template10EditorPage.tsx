import { EditorPageShell } from '../../editor/EditorPageShell';
import { Template10Editor } from './Template10Editor';

type Template10EditorPageProps = {
  onBack: () => void;
};

export function Template10EditorPage({ onBack }: Template10EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Template 10 - 1080 x 1920"
      onBack={onBack}
      title="Social Editor"
    >
      <Template10Editor fullscreen defaultImage="/images/velyn.png" />
    </EditorPageShell>
  );
}
