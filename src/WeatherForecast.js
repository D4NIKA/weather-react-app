import axios from "axios";
import React, { useState } from "react";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function day(response) {
    let date = new Date(response.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];

    return days[day];
  }

  if (loaded) {
    return (
      <div className="container forecast" id="forecast">
        <div class="row row-cols-5 row-cols-lg-5 g-2 g-lg-3">
          <div class="col">
            <div class="p-3 border bg-light">
              <span class="days">{day()}</span>
              <br />
              <span class="high-temps" id="high-temps">
                {Math.round((forecast[0].temp.max * 9) / 5 + 32)}
              </span>
              º |{" "}
              <span class="low-temps" id="low-temps">
                {Math.round((forecast[0].temp.min * 9) / 5 + 32)}
              </span>
              º<br />
              <br />
              <img src={forecast[0].weather[0].icon} alt="icons" id="icons" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "3ba204fa15dbbaba90617ba765f650d7";
    let lat = props.coordinates.lat;
    let lon = props.coordinates.lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
  }
}
