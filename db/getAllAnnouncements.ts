import { desc } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

import { db } from "@/lib/db";

import { announcements } from "./schema";

export async function getAllAnnouncements() {
  unstable_noStore();
  const result = await db
    .select({
      id: announcements.id,
      title: announcements.title,
      date: announcements.createdAt,
    })
    .from(announcements)
    .orderBy(desc(announcements.createdAt));
  return result;
}
