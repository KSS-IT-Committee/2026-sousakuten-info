"use server";

import { revalidatePath } from "next/cache";

import { deleteAnnouncement } from "@/db/deleteAnnouncement";
import { hasAccess } from "@/lib/access";
import { getCurrentUser } from "@/lib/session";
import { isInternal } from "@/lib/user-category";

export async function deleteAnnouncementAction(id: number) {
  const user = await getCurrentUser();
  if (
    !user ||
    !isInternal(user.username) ||
    !hasAccess(user, { canManage: true })
  ) {
    throw new Error("Invalid user");
  }

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id");
  }
  await deleteAnnouncement(id);

  revalidatePath("/info");
  revalidatePath(`/info/${id}`);
}
