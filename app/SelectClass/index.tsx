"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Select } from "@/components/Select";
import { Class, Grade, isClass, isClassName, isGrade } from "@/lib/classes";

export function SelectClass() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = "className";

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

  let paramGrade: Grade = "1";
  let paramClass: Class = "A";
  const paramClassName = searchParams.get(param) ?? "";
  if (isClassName(paramClassName)) {
    paramGrade = paramClassName.slice(0, 1) as Grade;
    paramClass = paramClassName.slice(1, 2) as Class;
  }

  const updateGrade = (value: string) => {
    localStorage.setItem("selectedGrade", value);
    setGrade(value as Grade);
  };
  const updateClass = (value: string) => {
    localStorage.setItem("selectedClass", value);
    setClassName(value as Class);
  };

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
    const currentClassName = searchParams.get(param);
    if (currentClassName !== nextClassName) {
      router.push(`?${param}=${grade}${className}`);
    }
  }, [grade, className, searchParams, router]);

  return (
    <>
      <Select
        label="学年: "
        options={grades}
        value={paramGrade}
        onChange={(value) => {
          updateGrade(value);
        }}
      />
      <Select
        label="クラス: "
        options={classes}
        value={paramClass}
        onChange={(value) => {
          updateClass(value);
        }}
      />
    </>
  );
}
