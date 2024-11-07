

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const apiKey = "88df75af6163436c424cccb69c3d178b";
  const [data, setData] = useState({});
  const [city, setCity] = useState(""); // state for the input field
  const [loading, setLoading] = useState(false); // state for loading
  const [error, setError] = useState(null); // state for error

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    setLoading(true);
    setError(null);
    
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setError("City not found, please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getWeatherDetails("delhi");
  }, []);

  const handleSearch = () => {
    if (city) {
      getWeatherDetails(city);
    }
  };

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="col-md-12 text-center mt-5">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : (
          <div className="shadow rounded weatherResultBox">
            <img
              className="weatherIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="weather icon"
            />
            <h5 className="weatherCity">{data?.name}</h5>
            <h6 className="weatherTemp">
              {((data?.main?.temp) - 273.15).toFixed(2)}°C
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
