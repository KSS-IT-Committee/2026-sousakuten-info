import { ClassName } from "@/lib/classes";
import { db } from "@/lib/db";

import { announcementClasses, announcements } from "./schema";

export type AddAnnouncementProps = {
  title: string;
  body: string;
  classes: ClassName[];
};

export async function addAnnouncement({
  title,
  body,
  classes,
}: AddAnnouncementProps) {
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
