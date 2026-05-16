import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Food4Editor } from './Food4Editor';

type Food4EditorPageProps = {
  onBack: () => void;
};

export function Food4EditorPage({ onBack }: Food4EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Food 4 - 1080 x 1920"
      onBack={onBack}
      title="Food Editor"
    >
      <Food4Editor fullscreen />
    </EditorPageShell>
  );
}
