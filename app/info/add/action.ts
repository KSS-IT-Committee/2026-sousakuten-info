"use server";

import { revalidatePath } from "next/cache";

import { addAnnouncement, AddAnnouncementProps } from "@/db/addAnnouncement";
import { isClassName } from "@/lib/classes";

export async function addAnnouncementAction({
  title,
  body,
  classes: classes_list,
}: AddAnnouncementProps) {
  if (
    typeof title !== "string" ||
    title.length === 0 ||
    typeof body !== "string" ||
    body.length === 0 ||
    !Array.isArray(classes_list) ||
    classes_list.length === 0
  ) {
    throw new Error("Invalid request");
  }
  const classes = Array.from(new Set(classes_list));
  if (classes.some((v) => !isClassName(v))) {
    throw new Error("Invalid class name");
  }
  await addAnnouncement({ title, body, classes });

  revalidatePath("/info");
}
