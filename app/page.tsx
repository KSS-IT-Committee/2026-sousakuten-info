"use client";
import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { List } from "@/components/List";
import { Select } from "@/components/Select";
import { AnnouncementsReturn } from "@/db/getAnnouncements";

export default function Home() {
  const [grade, setGrade] = useState("1");
  const [className, setClassName] = useState("A");
  const [announcements, setAnnouncements] = useState<AnnouncementsReturn>([]);
  const grades = ["1", "2", "3", "4", "5", "6"].map((g) => ({
    value: g,
    label: `${g}年`,
  }));
  const classes = ["A", "B", "C", "D"].map((c) => ({
    value: c,
    label: `${c}組`,
  }));
  useEffect(() => {
    fetch(`/api/announcements?className=${grade}${className}`)
      .then((res) => res.json())
      .then(setAnnouncements);
  }, [grade, className]);

  return (
    <>
      <h1>情報伝達ページ</h1>
      <Select options={grades} onChange={setGrade} />
      <Select options={classes} onChange={setClassName} />
      <h2>お知らせ</h2>
      <List
        items={announcements}
        emptyMessage="お知らせはありません"
        link="/info/"
      />
      <h2>減点状況</h2>
      <List items={[]} emptyMessage="減点はありません" />
      <Footer />
    </>
  );
}
