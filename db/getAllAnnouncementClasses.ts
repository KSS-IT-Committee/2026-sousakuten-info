import { desc, eq } from "drizzle-orm";

import { ClassName } from "@/lib/classes";
import { db } from "@/lib/db";

import { announcementClasses, announcements } from "./schema";

export type AnnouncementsClassesReturn = {
  id: number;
  className: ClassName;
};

export async function getAllAnnouncementClasses() {
  const result: AnnouncementsClassesReturn[] = await db
    .select({
      id: announcements.id,
      className: announcementClasses.className,
    })
    .from(announcements)
    .innerJoin(
      announcementClasses,
      eq(announcements.id, announcementClasses.announcementId),
    )
    .orderBy(desc(announcements.createdAt));
  return result;
}
