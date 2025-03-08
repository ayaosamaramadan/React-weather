import { useState, useEffect } from "react";
import { fetchWeather } from "./api/weatherapi";
import { fetchForecast } from "./api/forestapi";
import "./App.css";
import { weatherprops, ForecastProps } from "./types/weathertypes";
import { icons } from "./api/icons";
import { ClipLoader } from "react-spinners";

type WeatherCondition = keyof typeof icons;

function App() {
  const [weather, setWeather] = useState<weatherprops | null>(null);
 
  const [city, setCity] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
 const [forecast, setForecast] = useState<ForecastProps[]>([]);
  useEffect(() => {
    const getWeather = async () => {
      if (city) {
        setLoading(true);
        setError(null);
        try {
          const weatherData = await fetchWeather(city);
          const forecastData = await fetchForecast(city);
          setWeather(weatherData);
          setForecast(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            forecastData.list.filter((_: any, index: number) => index % 8 === 0)
          );
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError("Please enter a valid city name");
          setWeather(null);
          setForecast([]);
        } finally {
          setLoading(false);
        }
      }
    };

    getWeather();
  }, [city]);

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      setError("Please enter a valid city name.");
      return;
    }
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
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && (
        <ClipLoader
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && !loading && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main?.temp}°C</p>
          <p>Weather: {weather.weather[0]?.description}</p>
          <img
            src={icons[weather.weather[0]?.main as WeatherCondition]?.iconImg}
            alt={weather.weather[0]?.description}
          />
        </div>
      )}
      {forecast.length > 0 && (
        <div>
          <h2>5-Day Forecast</h2>
          <div className="forecast">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                <p>Temperature: {day.main?.temp}°C</p>
                <p>Weather: {day.weather[0]?.description}</p>
                <img
                  src={icons[day.weather[0]?.main as WeatherCondition]?.iconImg}
                  alt={day.weather[0]?.description}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
