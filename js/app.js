import { getWeatherURL, getForecastURL, getUVIURL } from './utils/urlData.js';
import { fetchData } from './utils/fetchData.js';

const form = document.querySelector('.cities form');
const currentWeather = document.querySelector('.current-weather');
const forecast = document.querySelector('.forecast');

form.addEventListener('submit', async function (e) {
  try {
    e.preventDefault();
    const city = e.target.children[1].children[0].value;
    const currentWeatherData = await getCurrentWeather(city);
    const { lon, lat } = currentWeatherData.coords;
    console.log(lon, ' ', lat);
    const weatherForecast = await getWeatherForecast(lon, lat);

    displayCurrentWeather(currentWeatherData);
    displayWeatherForecast(weatherForecast);
  } catch (e) {
    console.log(e);
  }
});

async function getWeatherForecast(lon, lat) {
  const forecastData = await fetchData(getForecastURL(lon, lat));
  const data = [...forecastData.daily].slice(1, 6);
  return data.map((item) => {
    return {
      unixTimestamp: item.dt,
      icon: item.weather[0].icon,
      temp: item.temp.day,
      wind: item.wind_speed,
      humidity: item.humidity,
    };
  });
}

function displayWeatherForecast(weatherForecast) {
  forecast.innerHTML = `
    <header><h2>5 day forecast</h2></header>
      <ul class="forecast-list">
        ${weatherForecast
          .map((day) => {
            const date = moment.unix(day.unixTimestamp).format('Do MMMM YYYY');
            return `
            <li class="forecast-card">
              <h3>${date}</h3>
              <ul>
                <li><img src="http://openweathermap.org/img/wn/${day.icon}.png" alt="weather icon" /></li>
                <li>temp: ${day.temp} °c</li>
                <li>wind: ${day.wind} <span class="lowercase">m/s</span></li>
                <li>humidity: ${day.humidity}%</li>
              </ul>
            </li>
          `;
          })
          .join('')}
      </ul>
    `;
}

async function getCurrentWeather(city) {
  const weatherData = await fetchData(getWeatherURL(city));
  const { lon, lat } = weatherData.coord;
  const { temp, humidity } = weatherData.main;
  const wind = weatherData.wind.speed;
  const icon = weatherData.weather[0].icon;
  const unixTimestamp = weatherData.dt;
  const uviData = await fetchData(getUVIURL(lon, lat));
  const uvi = uviData.current.uvi;

  return {
    city,
    unixTimestamp,
    icon,
    temp,
    humidity,
    wind,
    uvi,
    coords: {
      lon,
      lat,
    },
  };
}

function displayCurrentWeather({ city, unixTimestamp, temp, humidity, wind, uvi, icon }) {
  const date = moment.unix(unixTimestamp).format('Do MMMM YYYY');

  currentWeather.innerHTML = `
    <h2>${city}, ${date}</h2>
      <ul>
        <li><img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" /></li>
        <li>temp: ${temp} °c</li>
        <li>wind: ${wind} <span class="lowercase">m/s</span></li>
        <li>humidity: ${humidity}%</li>
        <li><span class="capitalize">uv</span> index: ${uvi}</li>
      </ul>
    `;
  currentWeather.classList.remove('hidden');
}
