"use server";

import { revalidatePath } from "next/cache";

import { addAnnouncement, AddAnnouncementProps } from "@/db/addAnnouncement";
import { CONTENTS_MAX_LENGTH, TITLE_MAX_LENGTH } from "@/db/announcements";
import { requireManager } from "@/lib/authorize";
import { isClassName } from "@/lib/classes";

export async function addAnnouncementAction({
  title,
  body,
  classes: classes_list,
}: AddAnnouncementProps) {
  await requireManager();

  if (
    typeof title !== "string" ||
    title.length === 0 ||
    TITLE_MAX_LENGTH < title.length ||
    typeof body !== "string" ||
    body.length === 0 ||
    CONTENTS_MAX_LENGTH < body.length ||
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
