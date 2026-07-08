import { Filter, hasAccess } from "@/lib/access";
import { getCurrentUser } from "@/lib/session";
import { isInternal } from "@/lib/user-category";

export async function Internal({
  children,
  filter,
}: {
  children: React.ReactNode;
  filter?: Filter;
}) {
  const user = await getCurrentUser();
  if (!user || !isInternal(user.username)) {
    return null;
  }

  if (filter === undefined || hasAccess(user, filter)) {
    return <>{children}</>;
  } else {
    return null;
  }
}
