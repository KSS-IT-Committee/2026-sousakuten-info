import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>ページが見つかりません</h2>
      <p>お探しのページは見つかりませんでした。</p>
      <Link href="/">ホームに戻る</Link>
    </>
  );
}
