import { notFound } from "next/navigation";

import { MultiLine } from "@/components/MultiLine";
import { getAnnouncementClasses } from "@/db/getAnnouncementClasses";
import { getInfo } from "@/db/getInfo";
import { classFormat } from "@/lib/class-format";
import { dateFormat } from "@/lib/date-format";

import shared from "../../shared.module.css";
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
    return notFound();
  }
  const [info, classes] = await Promise.all([
    getInfo(id),
    getAnnouncementClasses(id),
  ]);
  if (info === undefined) {
    return notFound();
  }
  return (
    <>
      <h1 className={shared.title}>{`#${id} ${info.title}`}</h1>
      <p className={styles.date}>{dateFormat(info.createdAt)}</p>
      <p className={styles.content}>
        <MultiLine body={info.body} />
      </p>
      <hr className={styles.hr} />
      <h2 className={shared.subtitle}>対象クラス</h2>
      <div className={styles.classes}>{classFormat(classes).join(" ")}</div>
    </>
  );
}
