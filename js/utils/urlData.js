const key = '69c29afa16095d75381b27ad1495eb93';

export function getWeatherURL(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
}

export function getUVIURL(lon, lat) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${key}`;
}

export function getForecastURL(city) {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;
}
