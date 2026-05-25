"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./Header.module.css";

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const closeOpen = () => {
    setIsOpen(false);
  };
  const items = [
    { text: "クラスページ", url: "/" },
    { text: "お知らせを管理", url: "/info" },
    { text: "お知らせを追加", url: "/info/add" },
  ];
  return (
    <header className={`${styles.header} ${isOpen ? styles.open : ""}`}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <a href="sosakuten-top-page" className={styles.home}>
            {/* 創作展 */}
            <Image
              src="/theme/event-week.png"
              alt="創作展"
              height={420}
              width={930}
            />
          </a>
          <div className={styles.hamburger} onClick={toggleOpen}>
            <div className={styles.bars}></div>
          </div>
        </div>
        <nav className={styles.nav}>
          {items.map(({ text, url }, i) => (
            <Link href={url} key={i} onClick={closeOpen}>
              {text}
            </Link>
          ))}
        </nav>
        <div className={styles.back} onClick={closeOpen}></div>
      </div>
    </header>
  );
}
