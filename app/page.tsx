"use client";
import { List } from "@/app/components/List";
import { Select } from "@/app/components/Select";

export default function Home() {
  const grades = ["1", "2", "3", "4", "5", "6"].map((g) => ({
    value: g,
    label: `${g}年`,
  }));
  const classes = ["A", "B", "C", "D"].map((c) => ({
    value: c,
    label: `${c}組`,
  }));

  return (
    <>
      <h1>情報伝達ページ</h1>
      <Select options={grades} onChange={(value) => {}} />
      <Select options={classes} onChange={(value) => {}} />
      <h2>お知らせ</h2>
      {/* <List /> */}
      <h2>減点状況</h2>
      {/* <List /> */}
    </>
  );
}
