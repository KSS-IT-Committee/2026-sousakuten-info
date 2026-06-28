"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";

import styles from "./Header.module.css";

const items = [
  { text: "クラスページ", url: "/" },
  { text: "お知らせを管理", url: "/info" },
  { text: "お知らせを追加", url: "/info/add" },
  { text: "ページ改善の提案", url: "/requests" },
];

type HeaderProps = {
  // Server-rendered login control, passed in from the layout (this is a
  // client component, so it can't render the async AccountNav itself).
  accountSlot?: ReactNode;
};

export function Header({ accountSlot }: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const closeOpen = () => {
    setIsOpen(false);
  };
  return (
    <header className={`${styles.header} ${isOpen ? styles.open : ""}`}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <a href="https://top.2026.kss-it.com/" className={styles.home}>
            <Image
              src="/theme/event-week.png"
              alt="創作展"
              height={420}
              width={930}
            />
          </a>
          {accountSlot ? (
            <div className={styles.account}>{accountSlot}</div>
          ) : null}
          <button
            type="button"
            className={styles.hamburger}
            onClick={toggleOpen}
            aria-expanded={isOpen}
            aria-controls="header-nav"
            aria-label="メニュー"
          >
            <span className={styles.bars}></span>
          </button>
        </div>
        <nav id="header-nav" className={styles.nav}>
          {items.map(({ text, url }, i) => (
            <Link href={url} key={i} onClick={closeOpen}>
              {text}
            </Link>
          ))}
        </nav>
        <div
          className={styles.back}
          onClick={closeOpen}
          aria-label="メニューを閉じる"
        ></div>
      </div>
    </header>
  );
}
