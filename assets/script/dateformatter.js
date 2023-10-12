function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-us", { month: "short" });
  return `${day} ${month}`;
}

export { formatDate };
