"use server";

import { deleteAnnouncement } from "@/db/deleteAnnouncement";

export async function deleteAnnouncementAction(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id");
  }
  await deleteAnnouncement(id);
}
