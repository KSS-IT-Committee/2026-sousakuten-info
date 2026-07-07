import "server-only";

import { ROLENAMES } from "@/db/schema";
import type { SessionUser } from "@/lib/session";
import { classOf } from "@/lib/user-category";
import { ClassName } from "./classes";

export type Role = (typeof ROLENAMES)[number];

export function hasAccess(
  user: SessionUser,
  role: Role | Role[] | undefined,
  classCode: ClassName | ClassName[] | undefined,
): boolean {
  if (classCode !== undefined) {
    const allowed: string[] = Array.isArray(classCode)
      ? classCode
      : [classCode];
    const userClass = classOf(user.username);
    if (userClass !== null && allowed.includes(userClass)) {
      return true;
    }
  }

  if (role !== undefined) {
    const required = Array.isArray(role) ? role : [role];
    if (required.some((r) => user.roles.includes(r))) {
      return true;
    }
  }

  return false;
}
