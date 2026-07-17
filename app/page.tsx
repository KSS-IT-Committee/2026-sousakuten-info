import { forbidden, unauthorized } from "next/navigation";

import { FilterInternal } from "@/components/FilterInternal";
import { List } from "@/components/List";
import { getAnnouncements } from "@/db/getAnnouncements";
import { getDeductions } from "@/db/getDeductions";
import { hasAccess } from "@/lib/access-filter";
import { ClassName, isClassName } from "@/lib/classes";
import { getCurrentUser } from "@/lib/session";
import { classOf } from "@/lib/user-category";

import { SelectClass } from "./SelectClass";
import shared from "./shared.module.css";

type Props = {
  searchParams: Promise<{
    className?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  let className: ClassName = "1A";

  const user = await getCurrentUser();
  if (user === null) {
    unauthorized();
  }
  // Page gate (FilterGuard's check, inlined): must run before the class-scoped
  // reads below so unauthorized accounts never execute them.
  if (!hasAccess(user, { isInternal: true })) {
    forbidden();
  }
  const userClass = classOf(user.username) ?? "";
  className = isClassName(userClass) ? (userClass as ClassName) : "1A";
  if (hasAccess(user, { canReadAll: true })) {
    const { className: paramClass = "" } = await searchParams;
    className = isClassName(paramClass) ? (paramClass as ClassName) : className;
  }

  const [announcements, deductions] = await Promise.all([
    getAnnouncements(className),
    getDeductions(className),
  ]);

  const announcementItems = announcements.map(({ id, date, title }, i) => ({
    id: i,
    title,
    param: id,
    date: new Date(date),
  }));
  const deductionItems = deductions.map(({ id, content, points, date }, i) => ({
    id: i,
    title: content,
    subtext: `${points}点`,
    param: id,
    date: new Date(date),
  }));

  return (
    <>
      <h1 className={shared.title}>情報伝達ページ</h1>
      <FilterInternal filter={{ canReadAll: true }}>
        <SelectClass />
      </FilterInternal>
      <h2 className={shared.subtitle}>お知らせ</h2>
      <List
        items={announcementItems}
        emptyMessage="お知らせはありません"
        link="/info/"
        query="?from=/"
      />
      <h2 className={shared.subtitle}>減点状況</h2>
      <List items={deductionItems} emptyMessage="減点はありません" />
    </>
  );
}
