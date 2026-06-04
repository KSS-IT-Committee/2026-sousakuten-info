import Link from "next/link";

import shared from "../../shared.module.css";
import styles from "./info-page.module.css";

export default function InvalidID() {
  return (
    <>
      <h1 className={shared.title}>Error</h1>
      <div className={styles.content}>
        <p>無効なIDです。</p>
        <p>お知らせが削除された可能性があります。</p>
        <Link href={"/"} className={styles.link}>
          トップに戻る
        </Link>
      </div>
    </>
  );
}
