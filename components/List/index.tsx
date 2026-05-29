import Link from "next/link";

import { dateFormat } from "@/lib/date-format";

export type ListItems = {
  id: number;
  date: Date;
  title: string;
  param?: string | number;
}[];

type ListProp = {
  items: ListItems;
  emptyMessage: string;
  link?: string;
};

export function List({ items, emptyMessage, link }: ListProp) {
  return (
    <div>
      {items.length !== 0 ? (
        items.map(({ id, date, title, param }) => {
          if (link) {
            return (
              <div key={id}>
                <Link href={`${link}${param ?? ""}`}>
                  <span>{dateFormat(date)}</span>
                  {title}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={id}>
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
