import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Forecast from "./Forecast";
import Inputsearch from "./Inputsearch";
import Load from "./Load";
import Weather from "./Weather";

const Theapp = () => {
    const { weather, forecast,  loading, error } = useSelector(
        (state: RootState) => state.weather
      );
      
    return (  <>
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-purple-500 to-cyan-300 text-white flex flex-col items-center justify-center p-4">
      <Inputsearch/>
      {loading && (<Load/>)}
      {error && (<p className="text-red-700 text-center text-lg font-medium">{error}</p>)}
      {weather && !loading && (<Weather/>)}
      {forecast.length > 0 && (<Forecast/>)}
    </div>
    </>);
}
 
export default Theapp;