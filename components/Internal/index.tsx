import { Filter, hasAccess } from "@/lib/access";
import { getCurrentUser } from "@/lib/session";

export async function Internal({
  children,
  filter,
}: {
  children: React.ReactNode;
  filter?: Filter;
}) {
  const user = await getCurrentUser();
  if (user === null || filter === undefined || !hasAccess(user, filter)) {
    return null;
  }
  return children;
}
