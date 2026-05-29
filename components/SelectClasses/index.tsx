"use client";

import {
  Class,
  CLASSES,
  ClassName,
  CLASSNAMES,
  Grade,
  GRADES,
} from "@/lib/classes";

type SelectClassesProps = {
  value?: ClassName[];
  onChange: (value: ClassName[]) => void;
};

export function SelectClasses({ value = [], onChange }: SelectClassesProps) {
  const toggleAll = (checked: boolean) => {
    if (checked) {
      onChange(Array.from(CLASSNAMES));
    } else {
      onChange([]);
    }
  };

  const toggleGrade = (grade: Grade, checked: boolean) => {
    const targets = CLASSES.map((c) => `${grade}${c}` as ClassName);
    if (checked) {
      onChange(Array.from(new Set([...value, ...targets])));
    } else {
      onChange(value.filter((v) => !targets.includes(v)));
    }
  };

  const toggleClassGroup = (classes: Class, checked: boolean) => {
    const targets = GRADES.map((g) => `${g}${classes}` as ClassName);
    if (checked) {
      onChange(Array.from(new Set([...value, ...targets])));
    } else {
      onChange(value.filter((v) => !targets.includes(v)));
    }
  };

  const toggleClass = (className: ClassName, checked: boolean) => {
    if (checked) {
      onChange(Array.from(new Set([...value, className])));
    } else {
      onChange(value.filter((v) => v !== className));
    }
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
                checked={CLASSNAMES.every((className) =>
                  value.includes(className),
                )}
                onChange={(e) => toggleAll(e.target.checked)}
              />
            </label>
          </th>
          {CLASSES.map((c) => {
            const targets = GRADES.map((g) => `${g}${c}` as ClassName);
            const checked = targets.every((v) => value.includes(v));
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
          const gradeChecked = gradeTargets.every((v) => value.includes(v));
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
                const v = `${g}${c}` as ClassName;
                return (
                  <td key={v}>
                    <label>
                      {v}
                      <input
                        type="checkbox"
                        checked={value.includes(v)}
                        onChange={(e) => toggleClass(v, e.target.checked)}
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
