"use client";

import styles from "./Select.module.css";

type OptionProp = {
  value: string;
  label: string;
};

type SelectProp = {
  label?: string;
  value?: string;
  options: OptionProp[];
  onChange: (value: string) => void;
};

export function Select({ label, value, options, onChange }: SelectProp) {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label ?? ""}</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(({ value, label }) => (
          <option className={styles.option} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
