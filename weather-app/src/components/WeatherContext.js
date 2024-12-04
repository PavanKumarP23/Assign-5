import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, loading, setLoading, error, setError }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
