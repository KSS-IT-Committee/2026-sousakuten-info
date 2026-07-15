import { desc, eq } from "drizzle-orm";

import { deductions } from "@/db/schema";
import { ClassName } from "@/lib/classes";
import { db } from "@/lib/db";

type DeductionsReturn = {
  id: number;
  content: string;
  points: number;
  date: Date;
}[];

export async function getDeductions(className: ClassName) {
  const result: DeductionsReturn = await db
    .select({
      id: deductions.id,
      content: deductions.content,
      points: deductions.points,
      date: deductions.occurredAt,
    })
    .from(deductions)
    .where(eq(deductions.className, className))
    .orderBy(desc(deductions.occurredAt));
  return result;
}
