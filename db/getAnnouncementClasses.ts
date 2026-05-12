import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { announcementClasses, ClassName } from "./schema";

export async function getAnnouncementClasses(id: number) {
  const records: { className: ClassName }[] = await db
    .select({ className: announcementClasses.className })
    .from(announcementClasses)
    .where(eq(announcementClasses.announcementId, id));
  const result: ClassName[] = records.map(({ className }) => className);
  return result;
}
