import "server-only";

import { hasAnyRole, type Role } from "@/lib/access";
import { getCurrentUser } from "@/lib/session";

// The roles allowed to *manage* announcements: add/delete them, browse the
// full list, and view any class's top page. Mirrors the pre-revert canManage
// rule (teachers plus the Sousakuten/IT committees); everyone else only reads
// what targets their own class.
export const MANAGE_ROLES: readonly Role[] = ["Teachers", "Sousakuten", "IT"];

export async function isManager(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return hasAnyRole(user, MANAGE_ROLES);
}

/**
 * Assert the caller holds a manage role; throws otherwise. Call this at the
 * top of every mutating server action — AuthGuard / Internal only gate
 * rendering, so an action stays directly invocable by anyone without it.
 */
export async function requireManager(): Promise<void> {
  if (!(await isManager())) {
    throw new Error("この操作を行う権限がありません");
  }
}
