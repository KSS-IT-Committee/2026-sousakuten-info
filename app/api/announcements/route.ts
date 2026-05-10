import { getAnnouncements } from "@/db/getAnnouncements";
import { CLASSES, ClassName } from "@/db/schema";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const className = req.nextUrl.searchParams.get("className");
  if (className === null || !CLASSES.includes(className as ClassName)) {
    return Response.json([]);
  }
  const announcements = await getAnnouncements(className as ClassName);
  return Response.json(announcements);
}
