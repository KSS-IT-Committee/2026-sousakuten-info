export const timeFormat = (date_str: Date) => {
  const date = new Date(date_str);
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};
