"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/Button";
import { SelectClasses } from "@/components/SelectClasses";
import { ClassName } from "@/lib/classes";

import styles from "./add-info.module.css";

export default function AddInfo() {
  const [classes, setClasses] = useState<ClassName[]>([]);
  const title = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLTextAreaElement>(null);

  const addAnnouncement = async () => {
    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title?.current?.value,
        body: body?.current?.value,
        classes: classes,
      }),
    });
    if (!res.ok) {
      alert("お知らせの追加に失敗しました");
      return;
    }
  };

  return (
    <>
      <h1 className={styles.title}>お知らせを追加</h1>
      <label className={styles.label}>
        <span className={styles.labelText}>タイトル</span>
        <input
          className={styles.input}
          ref={title}
          type="text"
          placeholder="タイトルを入力"
        />
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>内容</span>
        <textarea
          className={styles.textarea}
          ref={body}
          placeholder="お知らせ内容を入力"
        ></textarea>
      </label>
      <h2 className={styles.subtitle}>対象クラス</h2>
      <SelectClasses value={classes} onChange={setClasses} />
      <Button onClick={addAnnouncement}>追加</Button>
    </>
  );
}
