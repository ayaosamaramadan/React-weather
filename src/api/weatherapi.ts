import axios from "axios";

const keyy = "05aef76b4355cdab242f0489ab39d93f";
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=egypt&appid=${keyy}`;

export const fetchWeather = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};