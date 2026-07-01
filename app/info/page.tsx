import { FloatingMenu } from "@/components/FloatingMenu";
import { List } from "@/components/List";
import { getAllAnnouncementClasses } from "@/db/getAllAnnouncementClasses";
import { getAllAnnouncements } from "@/db/getAllAnnouncements";
import { classFormat } from "@/lib/class-format";

import shared from "../shared.module.css";

export default async function Info() {
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
      <FloatingMenu
        items={[
          { label: "クラスページ", href: "/" },
          { label: "お知らせを追加", href: "/info/add" },
        ]}
      />
    </>
  );
}
