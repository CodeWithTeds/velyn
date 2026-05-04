type EditorSliderProps = {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  suffix?: string;
  value: number;
};

export function EditorSlider({
  label,
  max,
  min,
  onChange,
  suffix = '',
  value,
}: EditorSliderProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
        <span className="min-w-12 text-right text-xs font-semibold tabular-nums text-slate-900">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-red-600"
      />
    </label>
  );
}
