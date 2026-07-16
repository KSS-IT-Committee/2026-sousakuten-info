"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { BackLink } from "@/components/BackLink";
import { Button } from "@/components/Button";
import { SelectClasses } from "@/components/SelectClasses";
import { classFormat } from "@/lib/class-format";
import { ClassName } from "@/lib/classes";

import shared from "../../shared.module.css";
import { addAnnouncementAction } from "./action";
import styles from "./add-info.module.css";

export function AddInfoClient() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<ClassName[]>([]);
  const title = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLTextAreaElement>(null);
  const title_max_length: number = 30;
  const contents_max_length: number = 300;

  const addAnnouncement = async () => {
    const titleText = title?.current?.value;
    const bodyContent = body?.current?.value;
    if (typeof titleText !== "string" || titleText.length === 0) {
      alert(`タイトルを入力してください(最大文字数:${title_max_length})`);
      return;
    }
    if (typeof bodyContent !== "string" || bodyContent.length === 0) {
      alert(`内容を入力してください(最大文字数:${contents_max_length})`);
      return;
    }
    if (classes.length === 0) {
      alert("クラスを選択してください");
      return;
    }

    setLoading(true);
    try {
      await addAnnouncementAction({
        title: titleText,
        body: bodyContent,
        classes: classes,
      });
      alert("お知らせを追加しました");
      router.push("/info");
    } catch {
      alert("お知らせの追加に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addAnnouncement();
      }}
    >
      <div className={shared.titleRow}>
        <BackLink href="/info" />
        <h1 className={shared.title}>お知らせを追加</h1>
      </div>
      <label className={styles.label}>
        <span className={styles.labelText}>タイトル</span>
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            ref={title}
            type="text"
            placeholder="タイトルを入力"
            maxLength={title_max_length}
          />
        </div>
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>内容</span>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            ref={body}
            placeholder="お知らせ内容を入力"
            maxLength={contents_max_length}
          ></textarea>
        </div>
      </label>
      <h2 className={shared.subtitle}>対象クラス</h2>
      <p>クラスを選択してください。</p>
      <p>{`選択中 : ${classFormat(classes).join(", ")}`}</p>
      <SelectClasses value={classes} onChange={setClasses} />
      <Button type="submit" disabled={loading}>
        {loading ? "処理中…" : "追加"}
      </Button>
    </form>
  );
}
