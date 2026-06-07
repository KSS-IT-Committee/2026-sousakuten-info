import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { announcementClasses, announcements } from "./schema";

export async function deleteAnnouncement(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id");
  }
  await db.transaction(async (tx) => {
    await tx
      .delete(announcementClasses)
      .where(eq(announcementClasses.announcementId, id));
    const result = await tx
      .delete(announcements)
      .where(eq(announcements.id, id))
      .returning({ id: announcements.id });
    if (result.length === 0) {
      throw new Error("Announcement not found");
    }
  });
}
