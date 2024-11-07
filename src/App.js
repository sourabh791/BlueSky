import logo from './logo.svg';
// import "bootstrap/dist/css/bootstrap.min.css"
// import './App.css';

// import {useEffect, useState} from "react";
// import axios from 'axios';


// function App() {

// const apiKey ="88df75af6163436c424cccb69c3d178b"
// const [data, setData] = useState({})

// const getWeatherDetails = (cityName)=>{
//   if(!cityName) return
//   const apiURl= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
//   axios.get(apiURl).then((res)=>{
//     console.log("response",res.data)
//     setData(res.data)
//   }).catch((err) => {
//     console.log("err", err)
//   })
// }

// useEffect(()=>{
//   getWeatherDetails("delhi")
// },[])

//   return (
//     <div className="col-md-12">
//       <div className="weatherBg">
//         <h1 className="heading">Weather App</h1>
//         <div className="d-grid gap-3 col-4 mt-4">
//           <input type="text" className="fore-control" />
//           <button className="btn btn-primary" type="button">Search</button>
//         </div>


//       </div>
//       <div className="col-md-12 text-center mt-5">
//         <div className="shadow rounded weatherResultBox">
//           <img className="weatherIcon"
//             src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

//           <h5 className="weatherCity">{data?.name}</h5>
//           <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';

// import { useEffect, useState } from "react";
// import axios from 'axios';

// function App() {

//   const apiKey = "88df75af6163436c424cccb69c3d178b";
//   const [data, setData] = useState({});
//   const [city, setCity] = useState("delhi"); // Default city
//   const [loading, setLoading] = useState(false);

//   // Fetch weather details
//   const getWeatherDetails = (cityName) => {
//     if (!cityName) return;
    
//     const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`; // Adding 'units=metric' for Celsius
//     setLoading(true); // Set loading state to true while waiting for the API response
//     axios.get(apiURL).then((res) => {
//       setData(res.data); // Store the response data
//       setLoading(false); // Set loading state to false once data is fetched
//     }).catch((err) => {
//       console.log("Error fetching weather data:", err);
//       setLoading(false);
//     });
//   }

//   // Run once on component mount
//   useEffect(() => {
//     getWeatherDetails(city);
//   }, [city]); // Run whenever the city changes

//   // Handle search button click
//   const handleSearch = () => {
//     getWeatherDetails(city); // Trigger API call with the current city
//   }

//   // Handle input change
//   const handleInputChange = (event) => {
//     setCity(event.target.value); // Update the city state with user input
//   }

//   return (
//     <div className="col-md-12">
//       <div className="weatherBg">
//         <h1 className="heading">Weather App</h1>
//         <div className="d-grid gap-3 col-4 mt-4">
//           <input
//             type="text"
//             className="form-control"
//             value={city}
//             onChange={handleInputChange} // Update city on input change
//             placeholder="Enter city"
//           />
//           <button
//             className="btn btn-primary"
//             type="button"
//             onClick={handleSearch} // Trigger search on button click
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="col-md-12 text-center mt-5">
//         <div className="shadow rounded weatherResultBox">
//           {loading ? (
//             <div>Loading...</div> // Show loading message
//           ) : (
//             <>
//               {data.main ? ( // Check if data is available
//                 <>
//                   <img
//                     className="weatherIcon"
//                     src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} // Dynamically load weather icon
//                     alt="weather icon"
//                   />
//                   <h5 className="weatherCity">{data.name}</h5>
//                   <h6 className="weatherTemp">{data.main.temp} °C</h6>
//                   <p>{data.weather[0].description}</p> {/* Display weather description */}
//                 </>
//               ) : (
//                 <p>No weather data found for this city.</p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

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
