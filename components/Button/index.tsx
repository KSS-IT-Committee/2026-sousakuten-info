"use client";

import React from "react";

import styles from "./Button.module.css";

type ButtonProp = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  className,
  disabled,
  onClick,
  type,
}: ButtonProp) {
  return (
    <button
      className={`${styles.button} ${className ?? ""}`}
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
