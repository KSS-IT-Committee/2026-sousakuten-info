"use client";

import { ClassName, SelectClasses } from "@/components/SelectClasses";
import { useState } from "react";

export default function Info() {
  const [classes, setClasses] = useState<ClassName[]>([]);
  return (
    <>
      <h2>お知らせを追加</h2>
      <div>
        <div>タイトル</div>
        <input type="text" placeholder="タイトルを入力" />
      </div>
      <div>
        <div>内容</div>
        <textarea placeholder="お知らせ内容を入力"></textarea>
      </div>
      <h3>対象クラス</h3>
      <SelectClasses value={classes} onChange={setClasses} />
      <button>追加</button>
    </>
  );
}
