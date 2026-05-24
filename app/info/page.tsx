import Link from "next/link";

import { getAllAnnouncementClasses } from "@/db/getAllAnnouncementClasses";
import { getAllAnnouncements } from "@/db/getAllAnnouncements";
import { classFormat } from "@/lib/class-format";
import { dateFormat } from "@/lib/date-format";

export const dynamic = "force-dynamic";

export default async function Info() {
  const announcements = await getAllAnnouncements();
  const classes = await getAllAnnouncementClasses();
  return (
    <>
      <h2>お知らせ一覧</h2>
      {announcements.map(async ({ id, title, date }, i) => (
        <div key={i}>
          <Link href={`/info/${id}`}>
            {dateFormat(date)}
            {title}
            {classFormat(
              classes
                .filter(({ id: classId }) => classId === id)
                .map(({ className }) => className),
            ).map((className, ci) => (
              <span key={ci}>{className}</span>
            ))}
          </Link>
        </div>
      ))}
    </>
  );
}
