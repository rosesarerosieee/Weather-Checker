const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchWeather = async (location) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the weather data");
  }
  const data = await response.json();
  return data;
};

export const fetchForecast = async (location) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the forecast data");
  }
  const data = await response.json();
  return data;
};
