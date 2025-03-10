import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../reducers/weatherSlice";

const Inputsearch = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setCity(inputValue));
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
      <div className="fixed top-5 mb-4 w-full mx-5 max-w-md">
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
          className="w-full mt-3 p-3 bg-blue-600 text-white rounded-md hover:bg-purple-500 bg-opacity-20 transition duration-300"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Inputsearch;
