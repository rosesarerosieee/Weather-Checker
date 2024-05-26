const API_KEY = '7c58d942ae9c58bb192c41a4fe76a8b2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (location) => {
    const response = await fetch(`${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch the weather data');
    }
    const data = await response.json();
    return data;
};

export const fetchForecast = async (location) => {
    const response = await fetch(`${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch the forecast data');
    }
    const data = await response.json();
    return data;
};
