import Link from "next/link";

import { dateFormat } from "@/lib/date-format";
import { timeFormat } from "@/lib/time-format";

import styles from "./List.module.css";

type ListProp = {
  items: {
    id: number;
    date: Date;
    title: string;
  }[];
  emptyMessage: string;
  link?: string;
};

export function List({ items, emptyMessage, link }: ListProp) {
  return (
    <div className={styles.list}>
      {items.length !== 0 ? (
        items.map(({ id, date, title }, i) => {
          if (link) {
            return (
              <Link
                key={i}
                href={`${link}${id}`}
                className={`${styles.link} ${styles.record}`}
              >
                <span title={timeFormat(date)} className={styles.date}>
                  {dateFormat(date)}
                </span>
                <span className={styles.title}>{title}</span>
              </Link>
            );
          } else {
            return (
              <div key={i} className={styles.record}>
                <span className={styles.date}>{dateFormat(date)}</span>
                <span className={styles.title}>{title}</span>
              </div>
            );
          }
        })
      ) : (
        <div className={styles.emptyMessage}>{emptyMessage}</div>
      )}
    </div>
  );
}
