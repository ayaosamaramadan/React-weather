import axios from "axios";

const keyy = "05aef76b4355cdab242f0489ab39d93f";

export const fetchWeather = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${keyy}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
