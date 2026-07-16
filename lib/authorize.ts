import "server-only";

import { hasAccess } from "@/lib/access";
import { getCurrentUser } from "@/lib/session";

export async function isManager(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  return hasAccess(user, { canManage: true });
}

export async function requireManager(): Promise<void> {
  if (!(await isManager())) {
    throw new Error("この操作を行う権限がありません");
  }
}
