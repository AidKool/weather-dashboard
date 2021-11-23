import { getCoordinates, getWeatherData } from './getWeatherData.js';

const currentWeather = document.querySelector('.today-weather');
const forecast = document.querySelector('.forecast');

export async function getAndDisplayWeatherData(city) {
  const coords = await getCoordinates(city);
  const weatherData = await getWeatherData(coords);
  displayWeatherData(weatherData, city);
}

function displayWeatherData(weatherData, city) {
  const todayWeather = weatherData.slice(0, 1)[0];
  const forecastWeather = weatherData.slice(1);
  displayTodayWeather(todayWeather, city);
  displayWeatherForecast(forecastWeather);
}

function displayTodayWeather({ unixTimestamp, temp, humidity, wind, uvi, icon }, city) {
  const date = moment.unix(unixTimestamp).format('DD/MM/YYYY');

  currentWeather.innerHTML = `
    <h2>${city}, ${date}</h2>
      <ul>
        <li><img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" /></li>
        <li>temp: ${Math.round(temp)} °c</li>
        <li>wind: ${wind} <span class="lowercase">m/s</span></li>
        <li>humidity: ${humidity}%</li>
        <li="uvi"><span class="uppercase">uv</span> index: <span class="uvi">${uvi}</span></li>
      </ul>
    `;
  colourUVI();
  currentWeather.classList.remove('hidden');
}

function displayWeatherForecast(weatherForecast) {
  forecast.innerHTML = `
    <header><h2>5 day forecast</h2></header>
      <ul class="forecast-list">
        ${weatherForecast
          .map((day) => {
            const date = moment.unix(day.unixTimestamp).format('DD/MM/YYYY');
            return `
            <li class="forecast-card">
              <h3>${date}</h3>
              <ul>
                <li><img src="http://openweathermap.org/img/wn/${day.icon}.png" alt="weather icon" /></li>
                <li>temp: ${Math.round(day.temp)} °c</li>
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

function colourUVI() {
  const uviElement = document.querySelector('.uvi');
  const uvi = Number(uviElement.textContent);

  /* Source for UV index colours: https://www.bbc.com/news/explainers-53178988 */
  if (uvi <= 2) {
    uviElement.classList.add('uvi-low');
  } else if (uvi <= 5) {
    uviElement.classList.add('uvi-medium');
  } else if (uvi <= 7) {
    uviElement.classList.add('uvi-high');
  } else if (uvi <= 10) {
    uviElement.classList.add('uvi-very-high');
  } else {
    uviElement.classList.add('uvi-extremely-high');
  }
}
