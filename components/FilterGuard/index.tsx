import { forbidden, unauthorized } from "next/navigation";

import { Filter, hasAccess } from "@/lib/access-filter";
import { getCurrentUser } from "@/lib/session";

/**
 * Server-side page gate, the Filter-flavored sibling of the shared
 * <AuthGuard>. Renders children only for a logged-in user who satisfies
 * `filter`; anonymous visitors get the 401 page, logged-in users who don't
 * satisfy the filter the 403 page.
 *
 * Deny-by-default: with no `filter` prop the guard admits NOBODY. Every page
 * must state what it expects — `filter={{ isInternal: true }}` for "any
 * logged-in school account". Username shapes are never consulted.
 */
export async function FilterGuard({
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

  if (filter === undefined || !hasAccess(user, filter)) {
    forbidden(); // 403 — no filter requested, or the filter is not satisfied
  }
  return <>{children}</>;
}
