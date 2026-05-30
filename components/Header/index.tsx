"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./Header.module.css";

const items = [
  { text: "クラスページ", url: "/" },
  { text: "お知らせを管理", url: "/info" },
  { text: "お知らせを追加", url: "/info/add" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
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
          {pathname !== "/" && (
            <button
              type="button"
              className={styles.prev}
              onClick={() => router.back()}
              aria-label="前のページに戻る"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
          <a href="sosakuten-top-page" className={styles.home}>
            {/* 創作展 */}
            <Image
              src="/theme/event-week.png"
              alt="創作展"
              height={420}
              width={930}
            />
          </a>
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
        <button
          type="button"
          className={styles.back}
          onClick={closeOpen}
          aria-label="メニューを閉じる"
          tabIndex={isOpen ? 0 : -1}
        ></button>
      </div>
    </header>
  );
}
