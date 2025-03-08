import { useState, useEffect } from "react";
import { fetchWeather } from "./api/weatherapi";
import "./App.css";
import { weatherprops } from "./types/weathertypes";
import { icons } from "./api/icons";

type WeatherCondition = keyof typeof icons;

function App() {
  const [weather, setWeather] = useState<weatherprops | null>(null);
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    const getWeather = async () => {
      if (city) {
      
        try {
          const data = await fetchWeather(city);
          setWeather(data);
        } catch (error) {
          console.error("error fetching weather data:", error);
        }
      }
    };

    getWeather();
  }, [city]);

  const handleSearch = () => {
    if (city.trim() === "") {
      return;
    }
    setCity(city);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={icons[weather.weather[0].main as WeatherCondition]?.iconImg}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </>
  );
}

export default App;
