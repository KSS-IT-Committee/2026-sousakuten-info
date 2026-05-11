import { NextRequest } from "next/server";

import { addAnnouncements, AddAnnouncementsProps } from "@/db/addAnnouncements";
import { getAnnouncements } from "@/db/getAnnouncements";
import { ClassName, isClassName } from "@/db/schema";

export async function GET(req: NextRequest) {
  const className = req.nextUrl.searchParams.get("className");
  if (className === null || !isClassName(className)) {
    return Response.json([]);
  }
  const announcements = await getAnnouncements(className as ClassName);
  return Response.json(announcements);
}

type PostBody = {
  title: string;
  body: string;
  classes: string[];
};

export async function POST(req: NextRequest) {
  const json = (await req.json()) as PostBody;
  const { title, body, classes } = json;
  if (
    typeof title !== "string" ||
    typeof body !== "string" ||
    !Array.isArray(classes)
  ) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (classes.some((v) => !isClassName(v))) {
    return Response.json({ error: "Invalid class name" }, { status: 400 });
  }
  await addAnnouncements({ title, body, classes } as AddAnnouncementsProps);
  return Response.json({
    success: true,
  });
}
