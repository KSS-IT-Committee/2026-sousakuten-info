"use client";

import React from "react";

import styles from "./Button.module.css";

type ButtonProp = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  className,
  title,
  disabled,
  onClick,
  type,
}: ButtonProp) {
  return (
    <button
      className={`${styles.button} ${className ?? ""}`}
      title={title}
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
