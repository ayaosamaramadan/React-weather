import  { useEffect, useState } from "react";
import { fetchWeather } from "./api/weatherapi";
import "./App.css";
import { weatherprops } from "./types/weathertypes";

function App() {
  const [weather, setWeather] = useState<weatherprops | null>(null);

  // type Weather = {
  //   name: string;
  //   main: {
  //     temp: number | undefined;
  //   };
  //   weather: {
  //     description: string;
  //   }[];
  // };

  useEffect(() => {
    const getweather = async () => {
      try {
        const data = await fetchWeather();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    getweather();
  }, []);

  return (
    <>
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </>
  );
}

export default App;
