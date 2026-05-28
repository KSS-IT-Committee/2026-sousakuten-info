import Link from "next/link";

import { dateFormat } from "@/lib/date-format";
import { timeFormat } from "@/lib/time-format";

import styles from "./List.module.css";

export type ListItems = {
  id: number;
  date: Date;
  title: string;
  subtext?: string;
  param?: string | number;
}[];

type ListProp = {
  items: ListItems;
  emptyMessage: string;
  link?: string;
};

export function List({ items, emptyMessage, link }: ListProp) {
  return (
    <div className={styles.list}>
      {items.length !== 0 ? (
        items.map(({ id, date, title, subtext, param }) => {
          if (link) {
            return (
              <Link
                key={id}
                href={`${link}${param}`}
                className={`${styles.link} ${styles.record}`}
              >
                {Record({ date, title, subtext })}
              </Link>
            );
          } else {
            return (
              <div key={id} className={styles.record}>
                {Record({ date, title, subtext })}
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

function Record({
  date,
  title,
  subtext,
}: {
  date: Date;
  title: string;
  subtext?: string;
}) {
  return (
    <>
      <span title={timeFormat(date)} className={styles.date}>
        {dateFormat(date)}
      </span>
      <span title={title} className={styles.title}>
        {title}
      </span>
      {subtext && <span className={styles.subtext}>{subtext}</span>}
    </>
  );
}
