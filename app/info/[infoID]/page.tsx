import Link from "next/link";

import { MultiLine } from "@/components/MultiLine";
import { getAnnouncementClasses } from "@/db/getAnnouncementClasses";
import { getInfo } from "@/db/getInfo";
import { classFormat } from "@/lib/class-format";
import { dateFormat } from "@/lib/date-format";

import styles from "./info-page.module.css";

type Props = {
  params: Promise<{
    infoID: string;
  }>;
};

export default async function InfoPage({ params }: Props) {
  const { infoID } = await params;
  const id = Number(infoID);
  if (isNaN(id) || id <= 0) {
    return <InvalidID />;
  }
  const [info, classes] = await Promise.all([
    getInfo(id),
    getAnnouncementClasses(id),
  ]);
  if (info === undefined) {
    return <InvalidID />;
  }
  return (
    <>
      <h1 className={styles.title}>{`#${id} ${info.title}`}</h1>
      <p className={styles.date}>{dateFormat(info.createdAt)}</p>
      <p className={styles.content}>
        <MultiLine body={info.body} />
      </p>
      <hr className={styles.hr} />
      <h2 className={styles.subtitle}>対象クラス</h2>
      <div className={styles.classes}>{classFormat(classes).join(" ")}</div>
    </>
  );
}

function InvalidID() {
  return (
    <>
      <h1 className={styles.title}>#0 Error</h1>
      <p className={styles.content}>
        無効なIDです。
        <Link href={"/"} className={styles.link}>
          トップに戻る
        </Link>
      </p>
    </>
  );
}
