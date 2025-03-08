import axios from "axios";
import { keyy } from "./weatherapi";

export const fetchForecast = async (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${keyy}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      throw error;
    }
  };