const formatDate = (date, dateStyle = "medium", locales = "vi") => {
  return new Intl.DateTimeFormat(locales, { dateStyle }).format(new Date(date));
};
export {
  formatDate as f
};
