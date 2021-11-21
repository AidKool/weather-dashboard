import { getCoordinatesURL, getWeatherDataURL } from './utils/urlData.js';
import { fetchData } from './utils/fetchData.js';

const form = document.querySelector('.cities form');
const currentWeather = document.querySelector('.today-weather');
const forecast = document.querySelector('.forecast');

form.addEventListener('submit', async function (e) {
  try {
    e.preventDefault();
    const city = e.target.children[1].children[0].value;
    const coords = await getCoordinates(city);
    const weatherData = await getWeatherData(coords);
    const todayWeather = weatherData.slice(0, 1)[0];
    const forecastWeather = weatherData.slice(1);
    displayTodayWeather(todayWeather, city);
    displayWeatherForecast(forecastWeather);
  } catch (e) {
    console.log(e);
  }
});

async function getCoordinates(city) {
  const data = await fetchData(getCoordinatesURL(city));
  return data.coord;
}

async function getWeatherData({ lon, lat }) {
  const rawData = await fetchData(getWeatherDataURL(lon, lat));
  const data = [...rawData.daily].slice(0, 6);
  return data.map((item) => {
    return {
      unixTimestamp: item.dt,
      icon: item.weather[0].icon,
      temp: item.temp.day,
      wind: item.wind_speed,
      humidity: item.humidity,
      uvi: item.uvi,
    };
  });
}

function displayTodayWeather({ unixTimestamp, temp, humidity, wind, uvi, icon }, city) {
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
