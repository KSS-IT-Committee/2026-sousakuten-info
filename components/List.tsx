import { DateFormat } from "@/lib/DateFormat";

type ListProp = {
  items: {
    id: number;
    date: Date;
    title: string;
  }[];
  link?: string;
};

export function List({ items, link }: ListProp) {
  return (
    <div>
      {items.map(({ id, date, title }, i) => {
        if (link) {
          return (
            <div key={i}>
              <a href={`${link}${id}`}>
                <span>{DateFormat(date)}</span>
                {title}
              </a>
            </div>
          );
        } else {
          return (
            <div key={i}>
              <span key={i}>
                <span>{DateFormat(date)}</span>
                {title}
              </span>
            </div>
          );
        }
      })}
    </div>
  );
}
