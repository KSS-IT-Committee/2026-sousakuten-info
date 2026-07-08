import { forbidden, unauthorized } from "next/navigation";

import { Filter, hasAccess } from "@/lib/access";
import { getCurrentUser } from "@/lib/session";
import { isInternal } from "@/lib/user-category";

export async function AuthGuard({
  children,
  filter,
}: {
  children: React.ReactNode;
  filter?: Filter;
}) {
  const user = await getCurrentUser();
  if (!user) {
    unauthorized(); // 401 — not logged in
  }

  if (!isInternal(user.username)) {
    forbidden(); // 403
  }

  if (filter === undefined || hasAccess(user, filter)) {
    return <>{children}</>;
  } else {
    forbidden(); // 403
  }
}
