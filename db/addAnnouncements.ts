import { ClassName } from "@/lib/classes";
import { db } from "@/lib/db";

import { announcementClasses, announcements } from "./schema";

export type AddAnnouncementsProps = {
  title: string;
  body: string;
  classes: ClassName[];
};

export async function addAnnouncements({
  title,
  body,
  classes,
}: AddAnnouncementsProps) {
  const inserted = await db
    .insert(announcements)
    .values({
      title,
      body,
    })
    .returning({
      id: announcements.id,
    });
  const id = inserted[0].id;
  if (id === undefined) {
    return;
  }
  await db.insert(announcementClasses).values(
    classes.map((c) => ({
      announcementId: id,
      className: c,
    })),
  );
}
