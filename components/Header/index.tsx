import Image from "next/image";

import { AccountNav } from "../AccountNav";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="https://top.2026.kss-it.com/" className={styles.home}>
          <Image
            src="/theme/event-week.png"
            alt="創作展トップページ"
            height={420}
            width={930}
            loading="eager"
            className={styles.logo}
          />
        </a>
        <AccountNav />
      </div>
    </header>
  );
}
