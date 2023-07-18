import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
};


export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (coordinates, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch weather data');
    }
  }
);

const WeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = {
          temperature: action.payload.daily.temperature_2m_max[0], 
          weathercode: action.payload.daily.weathercode[0], 
        };
        state.forecast = action.payload.daily.time.map((date, index) => ({
          date,
          temperature_2m_max: action.payload.daily.temperature_2m_max[index],
          temperature_2m_min: action.payload.daily.temperature_2m_min[index],
          weathercode: action.payload.daily.weathercode[index],
        }));
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default WeatherSlice.reducer;
