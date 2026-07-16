import Image from "next/image";

import { AccountNav } from "../AccountNav";
import styles from "./Header.module.css";

/**
 * Slim top bar: the event logo linking back to the festival top site on the
 * left, the shared login control on the right. Page navigation lives in
 * <FloatingMenu>, not here. Unlike the shared <AccountBar>, this bar is
 * app-local — per AccountBar's own docs, apps with a header of their own
 * render <AccountNav /> inline in it instead.
 */
export function Header() {
  return (
    <header className={styles.header}>
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
    </header>
  );
}
