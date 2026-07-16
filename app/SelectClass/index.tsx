"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Select } from "@/components/Select";
import { Class, ClassName, Grade, isClassName } from "@/lib/classes";

export function SelectClass() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramKey = "className";
  const storageKey = "selectedClassName";

  const savedValue =
    typeof window === "undefined" ? null : localStorage.getItem(storageKey);
  const storageClassName: ClassName =
    savedValue && isClassName(savedValue) ? (savedValue as ClassName) : "1A";

  const paramClassName = searchParams.get(paramKey) ?? "";

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeClassName: ClassName = isClassName(paramClassName)
    ? (paramClassName as ClassName)
    : storageClassName;
  const grade = activeClassName.slice(0, 1) as Grade;
  const classLetter = activeClassName.slice(1, 2) as Class;

  const grades = ["1", "2", "3", "4", "5", "6"].map((g) => ({
    value: g,
    label: `${g}年`,
  }));
  const classes = ["A", "B", "C", "D"].map((c) => ({
    value: c,
    label: `${c}組`,
  }));

  useEffect(() => {
    if (!isMounted) return;
    if (storageClassName !== activeClassName) {
      localStorage.setItem(storageKey, activeClassName);
    }
    if (paramClassName !== activeClassName) {
      router.push(`?${paramKey}=${activeClassName}`);
    }
  }, [isMounted, activeClassName, paramClassName, storageClassName, router]);

  return (
    <>
      <Select
        label="学年: "
        options={grades}
        value={grade}
        onChange={(value) => {
          router.push(`?${paramKey}=${value}${classLetter}`);
        }}
      />
      <Select
        label="クラス: "
        options={classes}
        value={classLetter}
        onChange={(value) => {
          router.push(`?${paramKey}=${grade}${value}`);
        }}
      />
    </>
  );
}
