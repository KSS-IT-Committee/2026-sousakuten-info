import { getInfo } from "@/db/getInfo";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    infoID: string;
  }>;
};

export default async function InfoPage({ params }: Props) {
  const { infoID } = await params;
  const info = await getInfo(Number(infoID));
  if (info.length === 0) {
    return notFound();
  }
  return (
    <main>
      <h2>{info[0].title}</h2>
      <p>{info[0].createdAt.toLocaleDateString()}</p>
      <p>{info[0].body}</p>
    </main>
  );
}
