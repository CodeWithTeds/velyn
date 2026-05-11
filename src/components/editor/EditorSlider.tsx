import type { ChangeEvent } from 'react';

type EditorSliderProps = {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step?: number;
  suffix?: string;
  value: number;
};

export function EditorSlider({
  label,
  max,
  min,
  onChange,
  step = 1,
  suffix = '',
  value,
}: EditorSliderProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
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
        step={step}
        value={value}
        onChange={handleChange}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 outline-none accent-slate-950"
      />
    </div>
  );
}
