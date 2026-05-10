"use client";
import { useState } from "react";

const GRADES = ["1", "2", "3", "4", "5", "6"] as const;
const CLASSES = ["A", "B", "C", "D"] as const;
const ALLCLASSES = GRADES.flatMap((g) =>
  CLASSES.map((c) => `${g}${c}` as ClassName),
);

type Grade = (typeof GRADES)[number];
type Classes = (typeof CLASSES)[number];
export type ClassName = `${(typeof GRADES)[number]}${(typeof CLASSES)[number]}`;
type SelectClassesProps = {
  value?: ClassName[];
  onChange: (selected: ClassName[]) => void;
};

export function SelectClasses({ value = [], onChange }: SelectClassesProps) {
  const [selected, setSelected] = useState<ClassName[]>(value);

  const toggleAll = (checked: boolean) => {
    if (checked) {
      update(ALLCLASSES);
    } else {
      update([]);
    }
  };

  const toggleGrade = (grade: Grade, checked: boolean) => {
    const targets = CLASSES.map((c) => `${grade}${c}` as ClassName);
    if (checked) {
      update([...new Set([...selected, ...targets])]);
    } else {
      update(selected.filter((v) => !targets.includes(v)));
    }
  };

  const toggleClassGroup = (className: Classes, checked: boolean) => {
    const targets = GRADES.map((g) => `${g}${className}` as ClassName);
    if (checked) {
      update([...new Set([...selected, ...targets])]);
    } else {
      update(selected.filter((v) => !targets.includes(v)));
    }
  };

  const toggleClass = (className: ClassName, checked: boolean) => {
    if (checked) {
      update([...new Set([...selected, className])]);
    } else {
      update(selected.filter((v) => v !== className));
    }
  };

  const update = (next: ClassName[]) => {
    setSelected(next);
    onChange(next);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <label>
              全て
              <input
                type="checkbox"
                checked={selected.length === ALLCLASSES.length}
                onChange={(e) => toggleAll(e.target.checked)}
              />
            </label>
          </th>
          {CLASSES.map((c) => {
            const targets = GRADES.map((g) => `${g}${c}` as ClassName);
            const checked = targets.every((v) => selected.includes(v));
            return (
              <th key={c}>
                <label>
                  {c}組
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => toggleClassGroup(c, e.target.checked)}
                  />
                </label>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {GRADES.map((g) => {
          const gradeTargets = CLASSES.map((c) => `${g}${c}` as ClassName);
          const gradeChecked = gradeTargets.every((v) => selected.includes(v));
          return (
            <tr key={g}>
              <th>
                <label>
                  {g}年
                  <input
                    type="checkbox"
                    checked={gradeChecked}
                    onChange={(e) => toggleGrade(g, e.target.checked)}
                  />
                </label>
              </th>
              {CLASSES.map((c) => {
                const value = `${g}${c}` as ClassName;
                return (
                  <td key={value}>
                    <label>
                      {value}
                      <input
                        type="checkbox"
                        checked={selected.includes(value)}
                        onChange={(e) => toggleClass(value, e.target.checked)}
                      />
                    </label>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
