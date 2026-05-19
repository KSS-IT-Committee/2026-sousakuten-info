export const dateFormat = (date_str: Date, sep: string = "/") => {
  const date = new Date(date_str);
  const yyyy = date.getFullYear();
  const mm = ("00" + (date.getMonth() + 1)).slice(-2);
  const dd = ("00" + date.getDate()).slice(-2);
  return `${yyyy}${sep}${mm}${sep}${dd}`;
};
