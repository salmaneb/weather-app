
import React from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css'

const App = () => {
  return (
    <div>
      <h1 className='font-[800] text-[20px] pl-[20px] pt-[10px]'>Weather App</h1>
      <WeatherCard latitude={'33.625'} longitude={'73.125'} />
    </div>
  );
};

export default App;
