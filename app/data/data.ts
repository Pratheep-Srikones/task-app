const text = "Boost your productivity today!";
const words = text
  .split(" ")
  .map((word) => ({
    text: word,
    className: "text-blue-500 dark:text-blue-500",
  }));

export const description = words;
