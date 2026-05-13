type OptionProp = {
  value: string;
  label: string;
};

type SelectProp = {
  label?: string;
  options: OptionProp[];
  onChange: (value: string) => void;
};

export function Select({ label, options, onChange }: SelectProp) {
  return (
    <label>
      {label ?? ""}
      <select onChange={(e) => onChange(e.target.value)}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
