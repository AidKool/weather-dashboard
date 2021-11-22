import { getCoordinates, getWeatherData } from './utils/getWeatherData.js';
import { displayWeatherData } from './utils/displayWeatherData.js';

const form = document.querySelector('.cities form');

form.addEventListener('submit', async function (e) {
  try {
    e.preventDefault();
    const city = e.target.children[1].children[0].value;
    const coords = await getCoordinates(city);
    const weatherData = await getWeatherData(coords);
    displayWeatherData(weatherData, city);
  } catch (e) {
    console.log(e);
  }
});
