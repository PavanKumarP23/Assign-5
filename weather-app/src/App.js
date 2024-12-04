import React from 'react';
import WeatherProvider from './components/WeatherContext';
import WeatherApp from './components/WeatherApp';

const App = () => (
  <WeatherProvider>
    <WeatherApp />
  </WeatherProvider>
);

export default App;
