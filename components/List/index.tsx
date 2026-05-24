import Link from "next/link";

import { dateFormat } from "@/lib/date-format";

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
    <div>
      {items.length !== 0 ? (
        items.map(({ id, date, title }, i) => {
          if (link) {
            return (
              <div key={i}>
                <Link href={`${link}${id}`}>
                  <span>{dateFormat(date)}</span>
                  {title}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={i}>
                <span>
                  <span>{dateFormat(date)}</span>
                  {title}
                </span>
              </div>
            );
          }
        })
      ) : (
        <div>{emptyMessage}</div>
      )}
    </div>
  );
}
