import {
  useState,
  useEffect,
  //  useRef
} from "react";
import { fetchWeather } from "./api/weatherapi";
import "./App.css";
import { weatherprops } from "./types/weathertypes";
import { icons } from "./api/icons";
import { ClipLoader } from "react-spinners";

type WeatherCondition = keyof typeof icons;

function App() {
  const [weather, setWeather] = useState<weatherprops | null>(null);
  const [city, setCity] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      if (city) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchWeather(city);
          setWeather(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError("Please enter a valid city name");
          setWeather(null);
        } finally {
          setLoading(false);
        }
      }
    };

    getWeather();
  }, [city]);

  const handleSearch = () => {
    setCity(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setInputValue(newCity);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
         onKeyPress={handleKeyPress}
          placeholder="Enter city"
        />
        <button type="submit" onClick={handleSearch}>Search</button>
      </div>
      {loading && (
        <ClipLoader
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {error && <p>{error}</p>}
      {weather && !loading && (
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
