import Link from "next/link";

import styles from "./not-found.module.css";
import shared from "./shared.module.css";

export default function Forbidden() {
  return (
    <>
      <h1 className={shared.title}>403</h1>
      <h2 className={shared.subtitle}>アクセス権限がありません</h2>
      <p className={styles.text}>このページを表示する権限がありません</p>
      <Link href="/" className={styles.link}>
        トップに戻る
      </Link>
    </>
  );
}
