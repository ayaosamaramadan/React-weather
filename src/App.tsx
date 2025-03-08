import  { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);

  type Weather = {
    name: string;
    main: {
      temp: number | undefined;
    };
    weather: {
      description: string;
    }[];
  };

  useEffect(() => {
    const keyy = "05aef76b4355cdab242f0489ab39d93f";
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=egypt&appid=${keyy}`;

    axios
      .get(url)
      .then((response) => setWeather(response.data))
      .catch((error) => console.error("Error fetching weather data:", error));
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
