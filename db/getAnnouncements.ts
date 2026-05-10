import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { announcementClasses, announcements, ClassName } from "./schema";

export type AnnouncementsReturn = {
  id: number;
  title: string;
  body: string;
  date: Date;
}[];

export async function getAnnouncements(className: ClassName) {
  const result: AnnouncementsReturn = await db
    .select({
      id: announcements.id,
      title: announcements.title,
      body: announcements.body,
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
