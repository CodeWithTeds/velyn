import type { ChangeEvent } from 'react';

type EditorSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
};

export function EditorSlider({
  label,
  value,
  min,
  max,
  onChange,
  suffix = '',
}: EditorSliderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
        <label htmlFor={`slider-${label}`}>{label}</label>
        <span className="text-slate-900">
          {value}
          {suffix}
        </span>
      </div>
      <input
        id={`slider-${label}`}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 outline-none accent-slate-950"
      />
    </div>
  );
}
