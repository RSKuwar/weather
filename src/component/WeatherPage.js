import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './WeatherPage.css'; // Import CSS file for styling

const WeatherPage = () => {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'e1f7fe1b64c3a79a324bb7b751985d3b';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [cityName]);

  const getWeatherIconUrl = (weatherCode) => {
    // Construct the URL based on the provided weather code
    return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
  };

  return (
    <div className="weather-page">
      {weatherData ? (
        <div className="weather-info">
          <h2>{weatherData.name} Weather</h2>
          <div className="weather-icon">
            {weatherData.weather && weatherData.weather[0] && weatherData.weather[0].icon && (
              <img
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt={weatherData.weather[0].description}
              />
            )}
          </div>
          {weatherData.main && (
            <div>
              <p>Temperature: {weatherData.main.temp} K</p>
              <p>Weather Description: {weatherData.weather[0].description}</p>
              <p>Feels Like: {weatherData.main.feels_like} K</p>
              <p>Minimum Temperature: {weatherData.main.temp_min} K</p>
              <p>Maximum Temperature: {weatherData.main.temp_max} K</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
            </div>
          )}
          {weatherData.visibility && (
            <p>Visibility: {weatherData.visibility} meters</p>
          )}
          {weatherData.wind && (
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          )}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherPage;