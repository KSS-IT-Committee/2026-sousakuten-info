import { NextRequest } from "next/server";

import { addAnnouncement, AddAnnouncementProps } from "@/db/addAnnouncement";
import { getAnnouncements } from "@/db/getAnnouncements";
import { ClassName, isClassName } from "@/lib/classes";

export async function GET(req: NextRequest) {
  const className = req.nextUrl.searchParams.get("className");
  if (className === null || !isClassName(className)) {
    return Response.json(
      { error: "Invalid class name", field: "className" },
      { status: 400 },
    );
  }
  try {
    const announcements = await getAnnouncements(className as ClassName);
    return Response.json(announcements);
  } catch (error) {
    console.error("Failed to get announcements:", error);
    return Response.json(
      { error: "Failed to get announcements" },
      { status: 500 },
    );
  }
}

type PostBody = {
  title: string;
  body: string;
  classes: string[];
};

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (typeof json !== "object" || Array.isArray(json) || json === null) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const { title, body, classes: classes_list } = json as PostBody;
  if (
    typeof title !== "string" ||
    title.length === 0 ||
    typeof body !== "string" ||
    body.length === 0 ||
    !Array.isArray(classes_list) ||
    classes_list.length === 0
  ) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  const classes = Array.from(new Set(classes_list));
  if (classes.some((v) => !isClassName(v))) {
    return Response.json({ error: "Invalid class name" }, { status: 400 });
  }
  try {
    await addAnnouncement({ title, body, classes } as AddAnnouncementProps);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to add announcement:", error);
    return Response.json(
      { error: "Failed to add announcement" },
      { status: 500 },
    );
  }
}
