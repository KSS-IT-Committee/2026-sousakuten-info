import "server-only";

import { hasAnyRole, INTERNAL_ROLES, type Role } from "@/lib/access";
import { ClassName } from "@/lib/classes";
import type { SessionUser } from "@/lib/session";

/**
 * Access conditions for hasAccess, this app's layer over the shared role
 * primitive (lib/access.ts#hasAnyRole). Conditions are OR'ed: the filter
 * passes when the user satisfies at least one of them, and an empty filter
 * admits nobody (deny-by-default).
 */
export type Filter = {
  /** Any logged-in school account (Students / Teachers). */
  isInternal?: true;
  /** May add / delete announcements (Sousakuten). */
  canManage?: true;
  /** May read announcements addressed to any class (Sousakuten). */
  canReadAll?: true;
  role?: Role | readonly Role[];
  /** Member of one of these classes, held as G<grade> + Class<letter> roles. */
  className?: ClassName | readonly ClassName[];
};

const MANAGER_ROLES: readonly Role[] = ["Sousakuten"];
const READ_ALL_ROLES: readonly Role[] = ["Sousakuten"];

export function hasAccess(user: SessionUser, filter: Filter): boolean {
  return (
    (filter.isInternal === true && hasAnyRole(user, INTERNAL_ROLES)) ||
    (filter.canManage === true && hasAnyRole(user, MANAGER_ROLES)) ||
    (filter.canReadAll === true && hasAnyRole(user, READ_ALL_ROLES)) ||
    (filter.role !== undefined && hasAnyRole(user, filter.role)) ||
    (filter.className !== undefined && isInClass(user, filter.className))
  );
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
      hasAnyRole(user, `G${cn.charAt(0)}` as Role) &&
      hasAnyRole(user, `Class${cn.charAt(1)}` as Role),
  );
}
