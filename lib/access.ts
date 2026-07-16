import "server-only";

import { ROLENAMES } from "@/db/schema";
import { ClassName } from "@/lib/classes";
import type { SessionUser } from "@/lib/session";

export type Role = (typeof ROLENAMES)[number];

/**
 * Access conditions for hasAccess. Conditions are OR'ed: the filter passes
 * when the user satisfies at least one of them, and an empty filter admits
 * nobody (deny-by-default).
 */
export type Filter = {
  /** Any logged-in school account (Students / Teachers). */
  isInternal?: true;
  /** May add / delete announcements (Sousakuten / IT). */
  canManage?: true;
  /** May read announcements addressed to any class (Teachers / Sousakuten / IT). */
  canReadAll?: true;
  role?: Role | readonly Role[];
  /** Member of one of these classes, held as G<grade> + Class<letter> roles. */
  className?: ClassName | readonly ClassName[];
};

export function hasAccess(user: SessionUser, filter: Filter): boolean {
  return (
    (filter.isInternal === true &&
      holdsAnyRole(user, ["Students", "Teachers"])) ||
    (filter.canManage === true && holdsAnyRole(user, ["Sousakuten", "IT"])) ||
    (filter.canReadAll === true &&
      holdsAnyRole(user, ["Teachers", "Sousakuten", "IT"])) ||
    (filter.role !== undefined && holdsAnyRole(user, filter.role)) ||
    (filter.className !== undefined && isInClass(user, filter.className))
  );
}

function holdsAnyRole(user: SessionUser, roles: Role | readonly Role[]) {
  const allowed: readonly Role[] = typeof roles === "string" ? [roles] : roles;
  return allowed.some((role) => user.roles.includes(role));
}

/**
 * Class membership is decided by the population roles G<grade> +
 * Class<letter> that 2026-account-generator's users.sql grants to every
 * roster student — never by the shape of the username, so accounts created
 * outside the roster belong to no class until roles are granted.
 */
function isInClass(
  user: SessionUser,
  classNames: ClassName | readonly ClassName[],
) {
  const allowed: readonly ClassName[] =
    typeof classNames === "string" ? [classNames] : classNames;
  return allowed.some(
    (cn) =>
      holdsAnyRole(user, `G${cn.charAt(0)}` as Role) &&
      holdsAnyRole(user, `Class${cn.charAt(1)}` as Role),
  );
}
