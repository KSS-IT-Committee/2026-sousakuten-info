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
                <a href={`${link}${id}`}>
                  <span>{dateFormat(date)}</span>
                  {title}
                </a>
              </div>
            );
          } else {
            return (
              <div key={i}>
                <span key={i}>
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
