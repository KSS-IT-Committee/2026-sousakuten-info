import { CLASSES, ClassName, GRADES } from "@/lib/classes";
export const classFormat = (classes: ClassName[]) => {
  if (classes.length === 24) {
    return ["全クラス"];
  }
  const grades: string[] = [];
  GRADES.forEach((grade) => {
    const className = CLASSES.map((c) => `${grade}${c}` as ClassName);
    if (className.every((c) => classes.includes(c))) {
      classes = classes.filter((c) => !className.includes(c));
      grades.push(`${grade}年`);
    }
  });
  return [...grades, ...classes];
};
