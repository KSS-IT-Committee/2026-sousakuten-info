import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>Not Found</h2>
      <p>お探しのページは見つかりませんでした。</p>
      <p>
        <Link href="/">ホームに戻る</Link>
      </p>
    </>
  );
}
