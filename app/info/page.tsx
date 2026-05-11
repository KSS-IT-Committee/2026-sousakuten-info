"use client";

import { ClassName, SelectClasses } from "@/components/SelectClasses";
import { useRef, useState } from "react";

export default function Info() {
  const [classes, setClasses] = useState<ClassName[]>([]);
  const title = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLTextAreaElement>(null);

  const addAnnouncement = () => {
    fetch("/api/announcements", {
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
    window.location.reload()
  };

  return (
    <>
      <h2>お知らせを追加</h2>
      <div>
        <div>タイトル</div>
        <input ref={title} type="text" placeholder="タイトルを入力" />
      </div>
      <div>
        <div>内容</div>
        <textarea ref={body} placeholder="お知らせ内容を入力"></textarea>
      </div>
      <h3>対象クラス</h3>
      <SelectClasses value={classes} onChange={setClasses} />
      <button onClick={addAnnouncement}>追加</button>
    </>
  );
}
