import Link from "next/link";

export function InvalidID({ href }: { href: string }) {
  return (
    <div>
      <p>無効なIDです。</p>
      <Link href={href}>戻る</Link>
    </div>
  );
}
