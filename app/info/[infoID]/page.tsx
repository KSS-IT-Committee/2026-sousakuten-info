import { forbidden, notFound, unauthorized } from "next/navigation";

import { BackLink } from "@/components/BackLink";
import { Internal } from "@/components/Internal";
import { MultiLine } from "@/components/MultiLine";
import { getAnnouncementClasses } from "@/db/getAnnouncementClasses";
import { getInfo } from "@/db/getInfo";
import { hasAnyRole, INTERNAL_ROLES } from "@/lib/access";
import { MANAGE_ROLES } from "@/lib/authorize";
import { classFormat } from "@/lib/class-format";
import { dateFormat } from "@/lib/date-format";
import { getCurrentUser } from "@/lib/session";
import { classOf } from "@/lib/user-category";

import shared from "../../shared.module.css";
import { DeleteAnnouncementButton } from "./DeleteAnnouncementButton";
import styles from "./info-page.module.css";

type Props = {
  params: Promise<{
    infoID: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
};

export default async function InfoPage({ params, searchParams }: Props) {
  const user = await getCurrentUser();
  if (user === null) {
    unauthorized();
  }
  const canManage = hasAnyRole(user, MANAGE_ROLES);
  if (!canManage && !hasAnyRole(user, INTERNAL_ROLES)) {
    forbidden();
  }
  const { infoID } = await params;
  const { from } = await searchParams;
  const id = Number(infoID);
  if (isNaN(id) || id <= 0) {
    return notFound();
  }
  const [info, classes] = await Promise.all([
    getInfo(id),
    getAnnouncementClasses(id),
  ]);
  if (info === undefined) {
    return notFound();
  }
  // Non-managers may only open announcements that target their own class —
  // classOf here is read-scoping (which rows the viewer sees), the access
  // decision itself was made by the role checks above.
  if (!canManage) {
    const viewerClass = classOf(user.username);
    const targets: readonly string[] = classes;
    if (viewerClass === null || !targets.includes(viewerClass)) {
      forbidden();
    }
  }
  const parentHref = from === "/info" ? "/info" : "/";
  return (
    <>
      <div className={shared.titleRow}>
        <BackLink href={parentHref} />
        <h1 className={shared.title}>{`#${id} ${info.title}`}</h1>
      </div>
      <p className={styles.date}>{dateFormat(info.createdAt)}</p>
      <p className={styles.content}>
        <MultiLine body={info.body} />
      </p>
      <Internal role={MANAGE_ROLES}>
        <hr className={styles.hr} />
        <h2 className={shared.subtitle}>対象クラス</h2>
        <div className={styles.classes}>{classFormat(classes).join(", ")}</div>
        <DeleteAnnouncementButton id={id} />
      </Internal>
    </>
  );
}
