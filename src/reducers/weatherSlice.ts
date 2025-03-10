// filepath: c:\Windows\System32\React-weather\src\store\weatherSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../api/weatherapi";
import { fetchForecast } from "../api/forestapi";
import { weatherprops, ForecastProps } from "../types/weathertypes";

interface WeatherState {
  weather: weatherprops | null;
  forecast: ForecastProps[];
  city: string;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: null,
  forecast: [],
  city: "",
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string, { rejectWithValue }) => {
    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      return {
        weather: weatherData,
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        forecast: forecastData.list.filter((_: any, index: number) => index % 8 === 0),
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Please enter a valid city name");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weather = action.payload.weather;
        state.forecast = action.payload.forecast;
        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.weather = null;
        state.forecast = [];
        state.loading = false;
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;