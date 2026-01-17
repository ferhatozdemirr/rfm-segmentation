interface RFMGridProps {
  label: string;
  value: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}


export function FilterSlider({ 
  label,
  value,
  max,
  step = 1,
  onChange,
} : RFMGridProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {value}
      </label>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}