export const formatDateForLocal = (date: string): string => {
  const localDate = new Date(Number(date));
  return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

export const formatDateTimeUS = (date: string | number): string => {
  return new Date(Number(date)).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
