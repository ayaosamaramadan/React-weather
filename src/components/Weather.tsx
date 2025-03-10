import { useSelector } from "react-redux";
import { icons } from "../api/icons";
import { RootState } from "../store/store";

type WeatherCondition = keyof typeof icons;

const Weather = () => {
    const { weather} = useSelector(
        (state: RootState) => state.weather
      );
    
    return ( <>
     {
        weather&&(
            <div className="text-black text-center 2xl:mt-20 xl:mt-32 lg:mt-32 md:mt-32 sm:mt-32 2sm:mt-32 p-6 rounded-lg transform transition duration-500 hover:scale-105">
          <img
            src={icons[weather.weather[0]?.main as WeatherCondition]?.iconImg}
            alt={weather.weather[0]?.description}
            className="mx-auto mt-10 w-24 h-24 object-contain"
          />
          <h2 className="text-4xl font-extrabold mb-2 text-purple-900">
            {weather.name}
          </h2>
          <p className="text-2xl mb-2 text-blue-900">{weather.main?.temp}°C</p>
          <p className="text-xl mb-4 capitalize text-gray-800">
            {weather.weather[0]?.description}
          </p>
        </div>
        )
     }
    </> );
}
 
export default Weather;