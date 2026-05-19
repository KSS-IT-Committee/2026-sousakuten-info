export const dynamic = "force-dynamic";

import {
  AnnouncementsReturn,
  getAllAnnouncements,
} from "@/db/getAllAnnouncements";
import { getAnnouncementClasses } from "@/db/getAnnouncementClasses";
import { classFormat } from "@/lib/class-format";
import { dateFormat } from "@/lib/date-format";

export default async function Info() {
  const announcements = await getAllAnnouncements();
  return (
    <>
      <h2>お知らせ一覧</h2>
      {announcements.map(
        async ({ id, title, date }: AnnouncementsReturn, i) => (
          <div key={i}>
            <a href={`/info/${id}`}>
              {dateFormat(date)}
              {title}
              {classFormat(await getAnnouncementClasses(id)).map(
                (className, ci) => (
                  <span key={ci}>{className}</span>
                ),
              )}
            </a>
          </div>
        ),
      )}
    </>
  );
}
