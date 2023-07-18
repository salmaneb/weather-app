import { configureStore } from '@reduxjs/toolkit';
import WeatherSlice from './redux/WeatherSlice';
const store = configureStore({
  reducer: {
    weather:WeatherSlice
  }
});
export default store;