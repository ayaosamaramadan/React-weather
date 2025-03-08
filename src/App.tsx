import  { useState } from "react";
import { fetchWeather } from "./api/weatherapi";
import "./App.css";
import { weatherprops } from "./types/weathertypes";

function App() {
  const [weather, setWeather] = useState<weatherprops | null>(null);
  const [city, setCity] = useState<string>("");

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
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
        </div>
      )}
    </>
  );
}

export default App;
