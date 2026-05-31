"use client";
import { useEffect, useState } from "react";

import { List, ListItems } from "@/components/List";
import { Select } from "@/components/Select";
import { AnnouncementsReturn } from "@/db/getAnnouncements";
import { Class, Grade, isClass, isGrade } from "@/lib/classes";

import shared from "./shared.module.css";

export default function Home() {
  const [grade, setGrade] = useState<Grade>(() => {
    if (typeof window === "undefined") return "1";
    const savedValue = localStorage.getItem("selectedGrade");
    return savedValue && isGrade(savedValue) ? (savedValue as Grade) : "1";
  });
  const [className, setClassName] = useState<Class>(() => {
    if (typeof window === "undefined") return "A";
    const savedValue = localStorage.getItem("selectedClass");
    return savedValue && isClass(savedValue) ? (savedValue as Class) : "A";
  });
  const [announcements, setAnnouncements] = useState<ListItems>([]);
  const [loading, setLoading] = useState(true);
  const grades = ["1", "2", "3", "4", "5", "6"].map((g) => ({
    value: g,
    label: `${g}年`,
  }));
  const classes = ["A", "B", "C", "D"].map((c) => ({
    value: c,
    label: `${c}組`,
  }));

  const updateGrade = (value: string) => {
    localStorage.setItem("selectedGrade", value);
    setGrade(value as Grade);
  };
  const updateClass = (value: string) => {
    localStorage.setItem("selectedClass", value);
    setClassName(value as Class);
  };

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/announcements?className=${grade}${className}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`status ${res.status}`);
        }
      })
      .then((json: AnnouncementsReturn) => {
        setAnnouncements(
          json.map(({ id, date, title }, i) => ({
            id: i,
            param: id,
            date: new Date(date),
            title,
          })),
        );
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch announcements:", error);
          alert("お知らせの取得に失敗しました");
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [grade, className]);

  return (
    <>
      <h1 className={shared.title}>情報伝達ページ</h1>
      <Select
        label="学年: "
        options={grades}
        value={grade}
        onChange={(value) => {
          setLoading(true);
          setAnnouncements([]);
          updateGrade(value);
        }}
      />
      <Select
        label="クラス: "
        options={classes}
        value={className}
        onChange={(value) => {
          setLoading(true);
          setAnnouncements([]);
          updateClass(value);
        }}
      />
      <h2 className={shared.subtitle}>お知らせ</h2>
      <List
        items={announcements}
        emptyMessage={loading ? "読み込み中・・・" : "お知らせはありません"}
        link="/info/"
        query="?from=/"
      />
      <h2 className={shared.subtitle}>減点状況</h2>
      <List items={[]} emptyMessage="減点はありません" />
    </>
  );
}
