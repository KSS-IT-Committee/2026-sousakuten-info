import { Filter, hasAccess } from "@/lib/access-filter";
import { getCurrentUser } from "@/lib/session";

/**
 * Renders children only for a logged-in user who satisfies `filter`;
 * everyone else gets nothing — the fragment leaves no trace in the HTML.
 * The Filter-flavored sibling of the shared <Internal>.
 *
 * Deny-by-default: with no `filter` prop it renders nothing for anybody.
 * Username shapes are never consulted.
 */
export async function FilterInternal({
  children,
  filter,
}: {
  children: React.ReactNode;
  filter?: Filter;
}) {
  const user = await getCurrentUser();
  if (!user || filter === undefined || !hasAccess(user, filter)) {
    return null;
  }
  return <>{children}</>;
}
