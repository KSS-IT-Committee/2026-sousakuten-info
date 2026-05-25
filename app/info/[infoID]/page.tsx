import { notFound } from "next/navigation";

import { MultiLine } from "@/components/MultiLine";
import { getAnnouncementClasses } from "@/db/getAnnouncementClasses";
import { getInfo } from "@/db/getInfo";
import { classFormat } from "@/lib/class-format";
import { dateFormat } from "@/lib/date-format";

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
  const info = await getInfo(id);
  if (info === undefined) {
    return notFound();
  }
  return (
    <main>
      <h2>{info.title}</h2>
      <p>{dateFormat(info.createdAt)}</p>
      <p>
        <MultiLine body={info.body} />
      </p>
      <h3>対象クラス</h3>
      {classFormat(await getAnnouncementClasses(id)).map((className, i) => (
        <span key={i}>{className}</span>
      ))}
    </main>
  );
}
