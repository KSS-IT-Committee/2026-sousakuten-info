import { eq } from "drizzle-orm";
import { connection } from "next/server";

import { ClassName } from "@/lib/classes";
import { db } from "@/lib/db";

import { announcementClasses } from "./schema";

export async function getAnnouncementClasses(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid id");
  }
  await connection();
  const records: { className: ClassName }[] = await db
    .select({ className: announcementClasses.className })
    .from(announcementClasses)
    .where(eq(announcementClasses.announcementId, id));
  const result: ClassName[] = records.map(({ className }) => className);
  return result;
}
