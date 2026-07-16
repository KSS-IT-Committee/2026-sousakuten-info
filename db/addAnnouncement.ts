import { ClassName, isClassName } from "@/lib/classes";
import { db } from "@/lib/db";

import { announcementClasses, announcements } from "./schema";

export type AddAnnouncementProps = {
  title: string;
  body: string;
  classes: ClassName[];
};

export const TITLE_MAX_LENGTH: number = 30;
export const CONTENTS_MAX_LENGTH: number = 300;

export async function addAnnouncement({
  title,
  body,
  classes: classes_list,
}: AddAnnouncementProps) {
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
  await db.transaction(async (tx) => {
    const [announcement] = await tx
      .insert(announcements)
      .values({
        title,
        body,
      })
      .returning({
        id: announcements.id,
      });
    await tx.insert(announcementClasses).values(
      classes.map((c) => ({
        announcementId: announcement.id,
        className: c,
      })),
    );
  });
}
