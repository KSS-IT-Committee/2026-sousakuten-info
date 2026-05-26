import Link from "next/link";

import { getAllAnnouncementClasses } from "@/db/getAllAnnouncementClasses";
import { getAllAnnouncements } from "@/db/getAllAnnouncements";
import { classFormat } from "@/lib/class-format";
import { dateFormat } from "@/lib/date-format";

export default async function Info() {
  const [announcements, classes] = await Promise.all([
    getAllAnnouncements(),
    getAllAnnouncementClasses(),
  ]);
  return (
    <>
      <h2>お知らせ一覧</h2>
      {announcements.length === 0 ? (
        <p>お知らせはありません</p>
      ) : (
        announcements.map(({ id, title, date }) => (
          <div key={id}>
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
        ))
      )}
    </>
  );
}
