import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Food2Editor } from './Food2Editor';

type Food2EditorPageProps = {
  onBack: () => void;
};

export function Food2EditorPage({ onBack }: Food2EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Food 2 - 1080 x 1920"
      onBack={onBack}
      title="Food Editor"
    >
      <Food2Editor fullscreen />
    </EditorPageShell>
  );
}
