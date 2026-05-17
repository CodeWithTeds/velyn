import { EditorPageShell } from '@/components/editor/EditorPageShell';
import { Food5Editor } from './Food5Editor';

type Food5EditorPageProps = {
  onBack: () => void;
};

export function Food5EditorPage({ onBack }: Food5EditorPageProps) {
  return (
    <EditorPageShell
      canvasLabel="Food 5 - 1080 x 1920"
      onBack={onBack}
      title="Food Editor"
    >
      <Food5Editor fullscreen />
    </EditorPageShell>
  );
}
