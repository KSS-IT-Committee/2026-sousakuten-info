import { AuthGuard } from "@/components/AuthGuard";
import { List } from "@/components/List";
import { getAllAnnouncementClasses } from "@/db/getAllAnnouncementClasses";
import { getAllAnnouncements } from "@/db/getAllAnnouncements";
import { classFormat } from "@/lib/class-format";

import shared from "../shared.module.css";

export default async function Info() {
  return (
    <AuthGuard filter={{ canReadAll: true }}>
      <InfoContent />
    </AuthGuard>
  );
}

async function InfoContent() {
  const [announcements, classes] = await Promise.all([
    getAllAnnouncements(),
    getAllAnnouncementClasses(),
  ]);
  const items = announcements.map(({ id, date, title }, i) => {
    const formattedClasses = classFormat(
      classes
        .filter(({ id: classId }) => classId === id)
        .map(({ className }) => className),
    ).join(", ");
    return { id: i, param: id, date, title, subtext: formattedClasses };
  });
  return (
    <>
      <h1 className={shared.title}>お知らせ一覧</h1>
      <List
        items={items}
        emptyMessage="お知らせはありません"
        link="/info/"
        query="?from=/info"
      />
    </>
  );
}
