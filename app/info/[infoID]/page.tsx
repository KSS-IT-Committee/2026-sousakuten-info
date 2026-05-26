import { InvalidID } from "@/components/InvalidID";
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
    return <InvalidID href="/" />;
  }
  const [info, classes] = await Promise.all([
    getInfo(id),
    getAnnouncementClasses(id),
  ]);
  if (info === undefined) {
    return <InvalidID href="/" />;
  }
  return (
    <>
      <h2>{info.title}</h2>
      <p>{dateFormat(info.createdAt)}</p>
      <p>
        <MultiLine body={info.body} />
      </p>
      <h3>対象クラス</h3>
      {classFormat(classes).map((className, i) => (
        <span key={i}>{className}</span>
      ))}
    </>
  );
}
