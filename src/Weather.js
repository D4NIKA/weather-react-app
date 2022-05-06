import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather(props) {
  const [ready, setReady] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  function handleResponse(response) {
    setWeatherData({
      currentTemperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      tempHighs: Math.round(response.data.main.temp_max),
      tempLows: Math.round(response.data.main.temp_min),
      feelsLike: Math.round(response.data.main.feels_like),
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
      humidity: response.data.main.humidity,
      icon: `/icons/${response.data.weather[0].icon}.png`,
    });
    setReady(true);
  }

  if (ready) {
    return (
      <div className="weatherApp">
        <div className="background">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="search-bar">
                  <form id="search-form">
                    <div className="input-group">
                      <input
                        type="text"
                        id="search-bar"
                        placeholder="Enter City..."
                        className="form-control"
                        autocomplete="off"
                      />
                      <input
                        type="submit"
                        id="search-button"
                        className="btn btn-primary"
                        value="Search"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <section>
              <background>
                <div className="city" id="city-name">
                  <h1>
                    <strong>{weatherData.city}</strong>
                  </h1>
                </div>
                <h3 id="time">{weatherData.time}</h3>
                <hr />
                <br />
                <h3 id="description">{weatherData.description}</h3>
                <br />
                <img
                  src={weatherData.icon}
                  alt="Weather Icon"
                  id="icon"
                  className="icon"
                />
                <br />
                <br />
                <div className="current-temp">Current Temperature</div>
                <h2>
                  <strong>
                    <span className="temperature" id="temperature">
                      {Math.round(
                        (weatherData.currentTemperature * 9) / 5 + 32
                      )}
                    </span>
                  </strong>
                  <strong>
                    <span className="units">ºF</span>
                  </strong>
                </h2>
                <br />
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-4">
                      <div className="col highs">
                        <strong>Highs</strong>
                      </div>
                      <span className="high-temp" id="high-temp">
                        {Math.round((weatherData.tempHighs * 9) / 5 + 32)}
                      </span>
                      ºF
                    </div>
                    <div className="col-4">
                      <div className="col lows">
                        <strong>Lows</strong>
                      </div>
                      <span className="low-temp" id="low-temp">
                        {Math.round((weatherData.tempLows * 9) / 5 + 32)}
                      </span>
                      ºF
                    </div>
                  </div>
                </div>
                <hr />
                <ul>
                  <li>
                    Feels Like:{" "}
                    <span id="feels-like">
                      {Math.round((weatherData.feelsLike * 9) / 5 + 32)}
                    </span>{" "}
                    ºF
                  </li>
                  <li>
                    Humidity: <span id="humidity">{weatherData.humidity}</span>%
                  </li>
                  <li>
                    Wind: <span id="wind">{weatherData.wind}</span> mph
                  </li>
                </ul>
                <hr />
              </background>
            </section>
            <br />
            <div className="container forecast" id="forecast">
              <script src="index.js"></script>
            </div>
          </div>
        </div>
        <p className="footer">
          <a href="https://github.com/D4NIKA/weather-react-app">
            Open source code
          </a>{" "}
          by Danika Piromgraipakd
        </p>
      </div>
    );
  } else {
    const apiKey = "3ba204fa15dbbaba90617ba765f650d7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
