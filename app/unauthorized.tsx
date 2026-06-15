import Link from "next/link";

import styles from "./not-found.module.css";
import shared from "./shared.module.css";

export default function Unauthorized() {
  return (
    <>
      <h1 className={shared.title}>401</h1>
      <h2 className={shared.subtitle}>ログインが必要です</h2>
      <p className={styles.text}>このページを表示するにはログインしてください</p>
      <Link href="/" className={styles.link}>
        トップに戻る
      </Link>
    </>
  );
}
