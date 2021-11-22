import { fetchData } from './fetchData.js';

const key = '69c29afa16095d75381b27ad1495eb93';

export async function getCoordinates(city) {
  const coordinatesURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  const data = await fetchData(coordinatesURL);
  return data.coord;
}

export async function getWeatherData({ lon, lat }) {
  const weatherDataURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`;
  const rawData = await fetchData(weatherDataURL);
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
