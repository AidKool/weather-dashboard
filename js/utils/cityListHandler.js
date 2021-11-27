import { clearBtn } from './clearHistory.js';

let cities = JSON.parse(localStorage.getItem('cities')) || [];
const citiesList = document.querySelector('.cities-list');

window.addEventListener('DOMContentLoaded', function () {
  citiesList.innerHTML = `
    ${cities
      .map((city) => {
        return `<li class="city-item" data-city="${city}">${city}</li>`;
      })
      .join('')}
    `;
  showClearBtn();
});

export function addCityToList(city) {
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
    const cityElement = document.createElement('li');
    cityElement.setAttribute('data-city', city);
    cityElement.classList.add('city-item');
    cityElement.textContent = city;
    citiesList.appendChild(cityElement);
    showClearBtn();
  }
}

function showClearBtn() {
  clearBtn.classList.remove('hidden');
}
