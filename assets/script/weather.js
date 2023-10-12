import { setBackground } from "./setbackground";
import { formatDate } from "./dateformatter";

const inputBtn = document.getElementById("submitBtn");
const inputCity = document.getElementById("inputCity");
const apiKey = import.meta.env.VITE_API_KEY;

document.getElementById("app__city").textContent = "Choose a city to start !";
inputCity.value = "";

let fetchData = async () => {
  try {
    let askedCity = inputCity.value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${askedCity}&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Network connection failed, try again ?!");
    }
    const data = await response.json();
    console.log(data);

    document.getElementById("app__city").textContent = data.city.name;

    document.getElementById("app__date").textContent = formatDate(
      new Date(data.list[0].dt * 1000)
    );

    document.getElementById("app__sky").textContent =
      data.list[0].weather[0].main;
    setBackground(data.list[0].weather[0].main);

    document.getElementById("app__temp").textContent = Math.round(
      data.list[0].main.temp
    );

    document.getElementById("app__mint").textContent =
      "H: " + Math.round(data.list[0].main.temp_min) + "°";

    document.getElementById("app__max").textContent =
      "L: " + Math.round(data.list[0].main.temp_max) + "°";

    const moreInfoToggle = document.getElementById("app__moreinfo");
    moreInfoToggle.innerHTML = "";
    const moreInfoData = [
      { label: "Humidity", value: data.list[0].main.humidity + "%" },
      { label: "Wind", value: data.list[0].wind.speed + "m/s" },
      {
        label: "Feeling",
        value: Math.round(data.list[0].main.feels_like) + "°",
      },
    ];
    for (let i = 0; i < 3; i++) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = `${moreInfoData[i].label} `;
      li.textContent = `${moreInfoData[i].value}`;
      li.appendChild(span);
      moreInfoToggle.appendChild(li);
    }

    const forecastToggle = document.getElementById("app__forecastContainer");
    const forecastInfoData = [];
    const timestamps = [8, 16, 24, 32, 39];
    forecastToggle.innerHTML = "";

    for (const timestamp of timestamps) {
      const weatherData = data.list[timestamp];
      forecastInfoData.push({
        label: formatDate(new Date(weatherData.dt * 1000)),
        value: `${Math.round(weatherData.main.temp)}°`,
        icon: weatherData.weather[0].icon,
      });
    }

    for (let i = 0; i < 5; i++) {
      const forecasts = document.createElement("li");
      const spanDate = document.createElement("span");
      const forecastsSVG = document.createElement("img");
      spanDate.textContent = `${forecastInfoData[i].label}`;
      forecastsSVG.src = ` https://openweathermap.org/img/wn/${forecastInfoData[i].icon}.png`;
      forecasts.textContent = `${forecastInfoData[i].value}`;
      forecasts.appendChild(forecastsSVG);
      forecasts.appendChild(spanDate);
      forecastToggle.appendChild(forecasts);
    }
  } catch (error) {
    console.log("Sorry, an error has occured !", error);
  }
};

inputBtn.addEventListener("click", () => {
  fetchData();
  inputCity.value = "";
});

inputCity.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchData();
    inputCity.value = "";
  }
});

export { fetchData };
