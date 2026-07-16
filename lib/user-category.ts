import { ClassName } from "./classes";

export const ROLENAMES = [
  "IT",
  "Sousakuten",
  "Taiikusai",
  "G1",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "ClassA",
  "ClassB",
  "ClassC",
  "ClassD",
  "Students",
  "Teachers",
] as const;
export type Role = (typeof ROLENAMES)[number];

const STUDENT_RE = /^[1-6][A-D]\d{2}/;
export function classOf(username: string): ClassName | null {
  return STUDENT_RE.test(username) ? (username.slice(0, 2) as ClassName) : null;
}
