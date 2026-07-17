import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";

import { ClassName, isClassName } from "@/lib/classes";
import { db } from "@/lib/db";

import { announcementClasses, announcements } from "./schema";

type AnnouncementsReturn = {
  id: number;
  title: string;
  date: Date;
}[];

export async function getAnnouncements(className: ClassName) {
  if (!isClassName(className)) {
    throw new Error("Invalid className");
  }
  await connection();
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
    .where(eq(announcementClasses.className, className))
    .orderBy(desc(announcements.createdAt));
  return result;
}
