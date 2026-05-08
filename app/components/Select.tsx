type OptionProp = {
  value: string;
  label: string;
};

type SelectProp = {
  label?: string;
  options: OptionProp[];
  onChange: (value: string) => void;
};

export function Select(arg: SelectProp) {
  return (
    <label>
      {arg.label ?? ""}
      <select onChange={(e) => arg.onChange(e.target.value)}>
        {arg.options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
