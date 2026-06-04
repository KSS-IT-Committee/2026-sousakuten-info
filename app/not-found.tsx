import Link from "next/link";

import styles from "./not-found.module.css";
import shared from "./shared.module.css";

export default function NotFound() {
  return (
    <>
      <h1 className={shared.title}>404</h1>
      <h2 className={shared.subtitle}>ページが見つかりませんでした</h2>
      <p className={styles.text}>
        お探しのページは移動または削除された可能性があります
      </p>
      <Link href="/" className={styles.link}>
        トップに戻る
      </Link>
    </>
  );
}
