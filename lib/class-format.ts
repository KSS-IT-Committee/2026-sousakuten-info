import { CLASSES, ClassName, CLASSNAMES, GRADES } from "@/lib/classes";
export const classFormat = (classes: ClassName[]) => {
  if (classes.length === 0) {
    return ["なし"];
  }
  if (CLASSNAMES.every((className) => classes.includes(className))) {
    return ["全クラス"];
  }
  const groups: string[] = [];
  let remainClasses: ClassName[] = [...classes].sort();
  GRADES.forEach((g) => {
    const className = CLASSES.map((c) => `${g}${c}` as ClassName);
    if (className.every((c) => classes.includes(c))) {
      remainClasses = remainClasses.filter((c) => !className.includes(c));
      groups.push(`${g}年`);
    }
  });
  CLASSES.forEach((c) => {
    const className = GRADES.map((g) => `${g}${c}` as ClassName);
    if (className.every((c) => classes.includes(c))) {
      remainClasses = remainClasses.filter((c) => !className.includes(c));
      groups.push(`${c}組`);
    }
  });
  return [...groups, ...remainClasses];
};
