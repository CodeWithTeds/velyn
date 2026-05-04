export type EditorStatusItem = {
  label: string;
};

export type EditorQuickAction = {
  label: string;
  title: string;
  tone?: 'default' | 'danger';
  onClick: () => void;
};
