import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { announcementClasses, announcements, ClassName } from "./schema";

export type AnnouncementsReturn = {
  id: number;
  title: string;
  date: Date;
}[];

export async function getAnnouncements(className: ClassName) {
  const result: AnnouncementsReturn = await db
    .select({
      id: announcements.id,
      title: announcements.title,
      date: announcements.createdAt,
    })
    .from(announcementClasses)
    .innerJoin(
      announcements,
      eq(announcementClasses.announcementId, announcements.id),
    )
    .where(eq(announcementClasses.className, className));
  return result;
}
