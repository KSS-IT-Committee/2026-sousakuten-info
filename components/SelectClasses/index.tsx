"use client";

import {
  Class,
  CLASSES,
  ClassName,
  CLASSNAMES,
  Grade,
  GRADES,
} from "@/lib/classes";

import styles from "./SelectClasses.module.css";

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
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>
            <label className={styles.label}>
              全て
              <input
                className={styles.checkbox}
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
            const classColor = {
              A: "blue",
              B: "red",
              C: "green",
              D: "white",
            };
            return (
              <th className={styles.th} key={c}>
                <label className={styles.label}>
                  <div
                    className={styles.classColor}
                    style={{
                      backgroundColor: `var(--class-${classColor[c]})`,
                    }}
                  ></div>
                  {c}組
                  <input
                    className={styles.checkbox}
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
      <tbody className={styles.tbody}>
        {GRADES.map((g) => {
          const gradeTargets = CLASSES.map((c) => `${g}${c}` as ClassName);
          const gradeChecked = gradeTargets.every((v) => value.includes(v));
          return (
            <tr className={styles.tr} key={g}>
              <th className={styles.th}>
                <label className={styles.label}>
                  {g}年
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={gradeChecked}
                    onChange={(e) => toggleGrade(g, e.target.checked)}
                  />
                </label>
              </th>
              {CLASSES.map((c) => {
                const v = `${g}${c}` as ClassName;
                return (
                  <td className={styles.td} key={v}>
                    <label className={styles.label}>
                      {v}
                      <input
                        className={styles.checkbox}
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
