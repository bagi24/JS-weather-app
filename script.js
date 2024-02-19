const weatherForm = document.querySelector(".search");
const cityInput = document.querySelector("input");
const container = document.querySelector(".container");

const api = "987baa4af16e48b38d9175305241902 ";

weatherForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
      cityInput.value = "";
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=987baa4af16e48b38d9175305241902 &q=${city}&aqi=no`;

  const response = await fetch(apiUrl);
  console.log(response);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeather(data) {}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error");

  weatherForm.appendChild(errorDisplay);
}

function displayWeatherInfo(data) {
  console.log(data);

  const {
    location: { country, name, lat, lon, localtime },
    current: {
      condition: { code, icon, text },
      temp_c,
      wind_kph,
      humidity,
    },
  } = data;

  console.log(name);

  const lowerData = document.querySelector(".lower-data");
  lowerData.style.visibility = "visible";

  const humidityContainer = document.querySelector(".humidityContainer");
  const windContainer = document.querySelector(".windContainer");

  humidityContainer.style.visibility = "visible";
  windContainer.style.visibility = "visible";

  const cityName = document.querySelector(".location");
  cityName.textContent = `${name}`;
  const temperature = document.querySelector(".temperature");
  if (temperature) {
    temperature.textContent = `${temp_c}°C`;
  } else {
    console.error("Temperature element not found");
  }

  const humidityState = document.querySelector(".humidity");

  if (humidityState) {
    humidityState.textContent = `${humidity}%`;
  }

  const windState = document.querySelector(".wind");
  if (windState) {
    windState.textContent = `${wind_kph}km/h`;
  }

  const weatherState = document.querySelector(".weather-state");
  weatherState.setAttribute("src", icon);

  const wetherInfo = document.querySelector(".wether-info");

  wetherInfo.textContent = `${text}`;
}
