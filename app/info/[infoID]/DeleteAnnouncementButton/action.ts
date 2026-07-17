"use server";

import { revalidatePath } from "next/cache";

import { deleteAnnouncement } from "@/db/deleteAnnouncement";
import { requireManager } from "@/lib/authorize";

export async function deleteAnnouncementAction(id: number) {
  await requireManager();

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id");
  }
  await deleteAnnouncement(id);

  revalidatePath("/info");
  revalidatePath(`/info/${id}`);
}
