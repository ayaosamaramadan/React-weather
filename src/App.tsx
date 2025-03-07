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
  const [forecast, setForecast] = useState<ForecastProps[]>([]);
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
    <div className="text-black min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white flex flex-col items-center justify-center p-4">
      <div className="mb-4 w-full max-w-md">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter city"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button
        onClick={handleSearch}
        className="w-full mt-3 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Search
      </button>
      </div>
      {loading && (
      <div className="flex justify-center">
        <ClipLoader
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
      </div>
      )}
      {error && <p className="text-red-500 text-center text-lg font-medium">{error}</p>}
      {weather && !loading && (
      <div className="text-black text-center">
        <h2 className="text-3xl font-bold mb-2">{weather.name}</h2>
        <p className="text-xl mb-2">{weather.main?.temp}°C</p>
        <p className="text-xl mb-4 capitalize">{weather.weather[0]?.description}</p>
        <img
        src={icons[weather.weather[0]?.main as WeatherCondition]?.iconImg}
        alt={weather.weather[0]?.description}
        className="mx-auto mb-4 w-20 h-20 object-contain"
        />
      </div>
      )}
      {forecast.length > 0 && (
      <div className="mt-6 w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
          key={index}
          className="forecast-day p-4 bg-white rounded-md shadow-md"
          >
          <p className="text-lg font-semibold">
            {new Date(day.dt_txt).toLocaleDateString()}
          </p>
          <p className="text-lg">Temperature: {day.main?.temp}°C</p>
          <p className="text-lg capitalize">Weather: {day.weather[0]?.description}</p>
          <img
            src={icons[day.weather[0]?.main as WeatherCondition]?.iconImg}
            alt={day.weather[0]?.description}
            className="mx-auto mt-2 w-16 h-16 object-contain"
          />
          </div>
        ))}
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
