import { getAndDisplayWeatherData } from './utils/displayWeatherData.js';
import { addCityToList } from './utils/cityListHandler.js';

const form = document.querySelector('.cities form');
const citiesList = document.querySelector('.cities-list');

citiesList.addEventListener('click', async function (e) {
  const city = e.target.dataset.city;
  if (city) {
    await getAndDisplayWeatherData(city);
  }
});

form.addEventListener('submit', async function (e) {
  try {
    e.preventDefault();
    const city = e.target.children[1].children[0].value.trim().toLowerCase();
    e.target.children[1].children[0].value = '';
    await getAndDisplayWeatherData(city);
    addCityToList(city);
  } catch (e) {
    console.log(e);
  }
});
