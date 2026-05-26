import { desc } from "drizzle-orm";
import { connection } from "next/server";

import { db } from "@/lib/db";

import { announcements } from "./schema";

export async function getAllAnnouncements() {
  await connection();
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
