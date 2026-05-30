"use client";

import { Button } from "@/components/Button";

import styles from "./error.module.css";
import shared from "./shared.module.css";

export default function Error({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <>
      <h1 className={shared.title}>エラー</h1>
      <p className={styles.text}>エラーが発生しました。</p>
      <Button onClick={() => unstable_retry()} className={styles.button}>
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
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        再試行
      </Button>
    </>
  );
}
