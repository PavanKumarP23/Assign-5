import React, { useContext, useState } from 'react';
import { WeatherContext } from './WeatherContext';
import styles from './WeatherDisplay.module.css';

const WeatherApp = () => {
  const { weatherData, setWeatherData, loading, setLoading, error, setError } = useContext(WeatherContext);
  const [city, setCity] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`);
      if (!response.ok) throw new Error('City Not Found');
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f8ff', minHeight: '100vh', padding: '20px' }}>
      <header
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ margin: 0 }}>Weather App</h1>
      </header>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '12px',
            marginRight: '10px',
            border: '2px solid #ccc',
            borderRadius: '6px',
            width: '250px',
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: '12px 20px',
            backgroundColor: '#e64412',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Search
        </button>
      </div>
      {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>}
      {error && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'red', fontWeight: 'bold' }}>{error}</p>
      )}
      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2 style={{ color: '#007bff', marginBottom: '10px' }}>{weatherData.name}</h2>
          <p style={{ fontSize: '18px', margin: '5px 0' }}>
            <strong>Temperature:</strong> {Math.round(weatherData.main.temp - 273.15)}°C
          </p>
          <p style={{ fontSize: '18px', margin: '5px 0' }}>
            <strong>Weather:</strong> {weatherData.weather[0].description}
          </p>
          <p style={{ fontSize: '18px', margin: '5px 0' }}>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
          <p style={{ fontSize: '18px', margin: '5px 0' }}>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
