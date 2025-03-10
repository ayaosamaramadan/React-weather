import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { RootState } from "../store/store";

const Load = () => {

      const { loading } = useSelector(
        (state: RootState) => state.weather
      );
    return ( <>
    <div className="flex justify-center">
          <ClipLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
    
    
    </> );
}
 
export default Load;