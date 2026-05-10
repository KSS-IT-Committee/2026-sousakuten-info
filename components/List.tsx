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
            <div key={i}>
              <a href={link}>
                <span>{format(date)}</span>
                {title}
              </a>
            </div>
          );
        } else {
          return (
            <div key={i}>
              <span key={i}>
                <span>{format(date)}</span>
                {title}
              </span>
            </div>
          );
        }
      })}
    </div>
  );
}

const format = (date: Date) => {
  return new Date(date).toLocaleDateString();
};
