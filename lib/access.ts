import "server-only";

import { ClassName } from "@/lib/classes";
import type { SessionUser } from "@/lib/session";
import { classOf, Role } from "@/lib/user-category";

export type Filter = {
  isInternal?: true;
  canManage?: true;
  canReadAll?: true;
  role?: Role | Role[];
  className?: ClassName | ClassName[];
};

export function hasAccess(user: SessionUser, filter: Filter): boolean {
  if (
    (filter.isInternal === true &&
      checkCondition(user, { role: ["Students", "Teachers"] })) ||
    (filter.canManage === true &&
      checkCondition(user, { role: ["Sousakuten", "IT"] })) ||
    (filter.canReadAll === true &&
      checkCondition(user, { role: ["Teachers", "Sousakuten", "IT"] })) ||
    (filter.role !== undefined &&
      checkCondition(user, { role: filter.role })) ||
    (filter.className !== undefined &&
      checkCondition(user, { className: filter.className }))
  ) {
    return true;
  }

  return false;
}

export function checkCondition(
  user: SessionUser,
  {
    role,
    className,
  }: {
    role?: Role | Role[];
    className?: ClassName | ClassName[];
  },
) {
  if (role !== undefined) {
    const allowed = Array.isArray(role) ? role : [role];
    if (allowed.some((r) => user.roles.includes(r))) {
      return true;
    }
  }

  if (className !== undefined) {
    const allowed = Array.isArray(className) ? className : [className];
    const userClass = classOf(user.username);
    if (userClass !== null && allowed.includes(userClass)) {
      return true;
    }
  }

  return false;
}
