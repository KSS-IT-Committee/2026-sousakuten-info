import { eq } from "drizzle-orm";

import { ClassName } from "@/lib/classes";
import { db } from "@/lib/db";

import { announcementClasses } from "./schema";

export async function getAnnouncementClasses(id: number) {
  const records: { className: ClassName }[] = await db
    .select({ className: announcementClasses.className })
    .from(announcementClasses)
    .where(eq(announcementClasses.announcementId, id));
  const result: ClassName[] = records.map(({ className }) => className);
  return result;
}
