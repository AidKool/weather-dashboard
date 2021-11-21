const key = '69c29afa16095d75381b27ad1495eb93';

export function getCoordinatesURL(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
}

export function getWeatherDataURL(lon, lat) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${key}`;
}
