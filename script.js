const getElement = selector => document.querySelector(selector);

const APIKey = '1344a75e45dc4dc0b52212250252101';

const cityInputValue = getElement('#city-input');

const searchButton = getElement('#search-button');
const cityName = getElement('.city-name');
const tempCity = getElement('.temp');
const weatherDesc = getElement('.description');
const weatherIcon = getElement('#weather-icon');

const fetchWeatherData = async city => {
  try {
    const response =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no
`);
    const data = await response.json();
    createDisplayData(data);
    console.log(data);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return;
  }
};

//display
const createDisplayData = data => {
  const { location, current } = data;
  cityName.textContent = location.name;
  tempCity.textContent = `${current.temp_c}°C`;
  weatherDesc.textContent = current.condition.text;
  weatherIcon.src = `https:${current.condition.icon}`;
  date.textContent = new Date().toLocaleDateString();
};

searchButton.addEventListener('click', () => {
  const city = cityInputValue.value;

  if (!city) {
    alert('Please enter a city name');
    return;
  }
  cityInputValue.value = '';

  fetchWeatherData(city);
});

fetchWeatherData('Tbilisi');
createDisplayData();
