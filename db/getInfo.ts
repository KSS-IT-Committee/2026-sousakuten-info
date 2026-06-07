import { eq } from "drizzle-orm";
import { connection } from "next/server";

import { announcements } from "@/db/schema";
import { db } from "@/lib/db";

export async function getInfo(infoID: number) {
  if (!Number.isInteger(infoID) || infoID <= 0) {
    throw new Error("Invalid id");
  }
  await connection();
  const [result] = await db
    .select()
    .from(announcements)
    .where(eq(announcements.id, infoID));
  return result;
}
