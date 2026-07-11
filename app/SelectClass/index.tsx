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

  const [grade, setGrade] = useState<Grade>(() => {
    if (isClassName(paramClassName)) return paramClassName.slice(0, 1) as Grade;
    if (typeof window === "undefined") return "1";
    return storageClassName.slice(0, 1) as Grade;
  });
  const [className, setClassName] = useState<Class>(() => {
    if (isClassName(paramClassName)) return paramClassName.slice(1, 2) as Class;
    if (typeof window === "undefined") return "A";
    return storageClassName.slice(1, 2) as Class;
  });

  const grades = ["1", "2", "3", "4", "5", "6"].map((g) => ({
    value: g,
    label: `${g}年`,
  }));
  const classes = ["A", "B", "C", "D"].map((c) => ({
    value: c,
    label: `${c}組`,
  }));

  useEffect(() => {
    const nextClassName = `${grade}${className}`;
    if (storageClassName !== nextClassName) {
      localStorage.setItem(storageKey, `${nextClassName}`);
    }
    if (paramClassName !== nextClassName) {
      router.push(`?${paramKey}=${nextClassName}`);
    }
  }, [
    router,
    searchParams,
    paramClassName,
    storageClassName,
    grade,
    className,
  ]);

  return (
    <>
      <Select
        label="学年: "
        options={grades}
        value={grade}
        onChange={(value) => {
          setGrade(value as Grade);
        }}
      />
      <Select
        label="クラス: "
        options={classes}
        value={className}
        onChange={(value) => {
          setClassName(value as Class);
        }}
      />
    </>
  );
}
