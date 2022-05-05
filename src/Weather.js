import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function Weather() {
  const [ready, setReady] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  function handleResponse(response) {
    setWeatherData({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.main.wind.speed,
      city: response.data.name,
      humidity: response.data.main.humidity,
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
                <img src={require("./icons/03d.png")} alt="Cloudy" id="icon" />
                <br />
                <br />
                <div className="current-temp">Current Temperature</div>
                <h2>
                  <strong>
                    <span className="temperature" id="temperature">
                      {weatherData.currentTemperature}
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
                        {weatherData.tempHighs}
                      </span>
                      ºF
                    </div>
                    <div className="col-4">
                      <div className="col lows">
                        <strong>Lows</strong>
                      </div>
                      <span className="low-temp" id="low-temp">
                        {weatherData.tempLows}
                      </span>
                      ºF
                    </div>
                  </div>
                </div>
                <hr />
                <ul>
                  <li>
                    Feels Like:{" "}
                    <span id="feels-like">{weatherData.feelsLike}</span> ºF
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
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
