import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { icons } from "../api/icons";

type WeatherCondition = keyof typeof icons;

const Forecast = () => {
     const { forecast} = useSelector(
            (state: RootState) => state.weather
          );
        
    return (  <>{
        forecast&&(
            <div className="text-black mt-6 w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="forecast-day p-4 bg-white bg-opacity-20 rounded-md shadow-md"
              >
                <p className="text-lg font-semibold">
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <p className="text-lg">Temperature: {day.main?.temp}°C</p>
                <p className="text-lg capitalize">
                  Weather: {day.weather[0]?.description}
                </p>
                <img
                  src={icons[day.weather[0]?.main as WeatherCondition]?.iconImg}
                  alt={day.weather[0]?.description}
                  className="mx-auto mt-2 w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        )
    }</>);
}
 
export default Forecast;