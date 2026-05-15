import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Food1Editor } from './Food1Editor';

type Food1EditorPageProps = {
  onBack: () => void;
};

export function Food1EditorPage({ onBack }: Food1EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Food 1 - 1080 x 1920"
      onBack={onBack}
      title="Food Editor"
    >
      <Food1Editor fullscreen />
    </EditorPageShell>
  );
}
