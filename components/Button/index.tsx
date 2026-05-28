import React from "react";

import styles from "./Button.module.css";

type ButtonProp = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color?: string;
};

export function Button({ children, onClick, className, color }: ButtonProp) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}
