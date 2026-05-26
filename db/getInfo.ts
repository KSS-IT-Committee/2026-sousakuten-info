import { eq } from "drizzle-orm";
import { connection } from "next/server";

import { announcements } from "@/db/schema";
import { db } from "@/lib/db";

export async function getInfo(infoID: number) {
  await connection();
  const [result] = await db
    .select()
    .from(announcements)
    .where(eq(announcements.id, infoID));
  return result;
}
