import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchWeatherData } from "./reducers/weatherSlice";
import "./App.css";
import Theapp from "./components/Theapp";

function App() {
  
  const dispatch = useDispatch<AppDispatch>();
  const { city } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeatherData(city));
    }
  }, [city, dispatch]);

  return <Theapp />;
}

export default App;
