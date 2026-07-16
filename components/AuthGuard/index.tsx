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
  if (filter === undefined || hasAccess(user, filter)) {
    return children;
  } else {
    forbidden(); // 403
  }
}
