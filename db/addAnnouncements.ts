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
