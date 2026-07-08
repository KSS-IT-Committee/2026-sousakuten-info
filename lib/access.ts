import "server-only";

import { ClassName } from "@/lib/classes";
import type { SessionUser } from "@/lib/session";
import { classOf, isStudent, isTeacher, Job, Role } from "@/lib/user-category";

export type Filter = { canManage: true };

export function hasAccess(user: SessionUser, filter: Filter): boolean {
  if (filter.canManage === true) {
    return checkCondition(user, { job: "teacher", role: ["Sousakuten", "IT"] });
  }
  return false;
}

function checkCondition(
  user: SessionUser,
  {
    job,
    role,
    classCode,
  }: {
    job?: Job;
    role?: Role | Role[];
    classCode?: ClassName | ClassName[];
  },
): boolean {
  const username = user.username;

  if (
    (job === "student" && isStudent(username)) ||
    (job === "teacher" && isTeacher(username))
  ) {
    return true;
  }

  if (role !== undefined) {
    const required = Array.isArray(role) ? role : [role];
    if (required.some((r) => user.roles.includes(r))) {
      return true;
    }
  }

  if (classCode !== undefined) {
    const allowed: string[] = Array.isArray(classCode)
      ? classCode
      : [classCode];
    const userClass = classOf(username);
    if (userClass !== null && allowed.includes(userClass)) {
      return true;
    }
  }

  return false;
}
