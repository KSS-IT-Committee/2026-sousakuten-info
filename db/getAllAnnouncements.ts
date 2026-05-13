import { desc } from "drizzle-orm";

import { db } from "@/lib/db";

import { announcements } from "./schema";

export type AnnouncementsReturn = {
  id: number;
  title: string;
  date: Date;
};

export async function getAllAnnouncements() {
  const result: AnnouncementsReturn[] = await db
    .select({
      id: announcements.id,
      title: announcements.title,
      date: announcements.createdAt,
    })
    .from(announcements)
    .orderBy(desc(announcements.createdAt));
  return result;
}
