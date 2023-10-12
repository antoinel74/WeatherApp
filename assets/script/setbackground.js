const setBackground = (condition) => {
  const appContainer = document.getElementById("app");
  appContainer.classList.remove(
    "clouds",
    "rain",
    "clear",
    "drizzle",
    "mist",
    "snow"
  );

  switch (condition.toLowerCase()) {
    case "clouds":
      appContainer.classList.add("clouds");
      break;
    case "rain":
      appContainer.classList.add("rain");
      break;
    case "clear":
      appContainer.classList.add("clear");
      break;
    case "drizzle":
      appContainer.classList.add("drizzle");
      break;
    case "mist":
      appContainer.classList.add("mist");
      break;
    case "snow":
      appContainer.classList.add("snow");
      break;
  }
};

export { setBackground };
