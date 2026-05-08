import type { ReactNode } from 'react';
import type { EditorQuickAction } from './editorTypes';
import { QuickActionDock } from './QuickActionDock';

type EditorCanvasProps = {
  children: ReactNode;
  quickActions: EditorQuickAction[];
};

export function EditorCanvas({ children, quickActions }: EditorCanvasProps) {
  return (
    <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-[28px] border border-black/5 bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%),linear-gradient(-45deg,#ffffff_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ffffff_75%),linear-gradient(-45deg,transparent_75%,#ffffff_75%)] bg-[length:26px_26px] bg-[position:0_0,0_13px,13px_-13px,-13px_0] p-6 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.9),0_18px_50px_rgb(15_23_42_/_0.08)] md:col-start-2 md:row-start-2">
      <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-white/90 p-4 shadow-inner backdrop-blur-xl">
        {children}
      </div>

      {quickActions.length > 0 && <QuickActionDock actions={quickActions} />}
    </div>
  );
}
