import { eq } from "drizzle-orm";

import { announcements } from "@/db/schema";
import { db } from "@/lib/db";

export async function getInfo(infoID: number) {
  return await db
    .select()
    .from(announcements)
    .where(eq(announcements.id, infoID));
}
