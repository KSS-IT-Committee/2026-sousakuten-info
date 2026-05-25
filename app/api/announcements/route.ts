import { NextRequest } from "next/server";

import { addAnnouncements, AddAnnouncementsProps } from "@/db/addAnnouncements";
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
      { error: "Failed to get announcement" },
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
  const { title, body, classes: classes_list } = json as PostBody;
  const classes = Array.from(new Set(classes_list));
  if (
    typeof title !== "string" ||
    title.length === 0 ||
    typeof body !== "string" ||
    body.length === 0 ||
    !Array.isArray(classes) ||
    classes.length === 0
  ) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
  if (classes.some((v) => !isClassName(v))) {
    return Response.json({ error: "Invalid class name" }, { status: 400 });
  }
  try {
    await addAnnouncements({ title, body, classes } as AddAnnouncementsProps);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to get announcements:", error);
    return Response.json(
      { error: "Failed to add announcement" },
      { status: 500 },
    );
  }
}
