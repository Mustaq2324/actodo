// src/WeatherApp.js
import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '25b8183e5facc724e40b5fe6a05c2223';

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError('Error fetching weather data. Please check the city name and try again.');
    }
  };

  return (
    <div style={{ margin: 'auto', padding: '1rem', maxWidth: '24rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
      />
      <button
        onClick={getWeather}
        style={{
          backgroundColor: '#3490dc',
          color: '#fff',
          padding: '0.5rem',
          borderRadius: '0.25rem',
          cursor: 'pointer',
        }}
      >
        Get Weather
      </button>

      {weatherData && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Weather in {city}</h2>
          <p style={{ fontSize: '0.875rem' }}>Temperature: {weatherData.main.temp} K</p>
          <p style={{ fontSize: '0.875rem' }}>Description: {weatherData.weather[0].description}</p>
        </div>
      )}

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default WeatherApp;
