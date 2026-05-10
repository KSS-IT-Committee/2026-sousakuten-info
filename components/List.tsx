type ListProp = {
  items: {
    date: Date;
    title: string;
    link?: string;
  }[];
};

export function List({ items }: ListProp) {
  return (
    <div>
      {items.map(({ date, title, link }, i) => {
        if (link) {
          return (
            <a key={i} href={link}>
              <span>{format(date)}</span>
              {title}
            </a>
          );
        } else {
          return (
            <span key={i}>
              <span>{format(date)}</span>
              {title}
            </span>
          );
        }
      })}
    </div>
  );
}

const format = (date: Date) => {
  return date.toLocaleDateString();
};
