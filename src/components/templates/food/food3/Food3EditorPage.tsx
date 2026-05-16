import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Food3Editor } from './Food3Editor';

type Food3EditorPageProps = {
  onBack: () => void;
};

export function Food3EditorPage({ onBack }: Food3EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Food 3 - 1080 x 1920"
      onBack={onBack}
      title="Food Editor"
    >
      <Food3Editor fullscreen />
    </EditorPageShell>
  );
}
