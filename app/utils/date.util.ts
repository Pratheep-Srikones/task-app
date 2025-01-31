export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long", // "Thursday"
    year: "numeric", // "2025"
    month: "long", // "January"
    day: "numeric", // "30"
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format
  });
  return formattedDate;
};
