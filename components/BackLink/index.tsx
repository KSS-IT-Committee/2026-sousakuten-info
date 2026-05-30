import Link from "next/link";

import styles from "./BackLink.module.css";

type BackLinkProps = {
  href: string;
};

export function BackLink({ href }: BackLinkProps) {
  return (
    <Link href={href} className={styles.backLink} aria-label="上の階層に戻る">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </Link>
  );
}
