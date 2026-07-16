import { forbidden, unauthorized } from "next/navigation";

import { Filter, hasAccess } from "@/lib/access";
import { getCurrentUser } from "@/lib/session";

export async function AuthGuard({
  children,
  filter,
}: {
  children: React.ReactNode;
  filter?: Filter;
}) {
  const user = await getCurrentUser();
  if (user === null) {
    unauthorized(); // 401
  }
  if (filter === undefined || !hasAccess(user, filter)) {
    forbidden(); // 403 — no filter requested, or the filter is not satisfied
  }
  return children;
}
