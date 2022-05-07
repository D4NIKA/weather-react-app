import React from "react";

export default function WeatherForecastDay(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun.", "Mon.", "Tues.", "Wed", "Thur.", "Fri.", "Sat."];

    return days[day];
  }

  function icons() {
    let icon = `/icons/${props.data.weather[0].icon}.png`;
    return icon;
  }

  return (
    <div>
      <div class="p-3 border bg-light">
        <span className="days">{day()}</span>
        <br />
        <span className="high-temps" id="high-temps">
          {Math.round((props.data.temp.max * 9) / 5 + 32)}
        </span>
        º |{" "}
        <span className="low-temps" id="low-temps">
          {Math.round((props.data.temp.min * 9) / 5 + 32)}
        </span>
        º<br />
        <br />
        <img src={icons()} alt="icons" id="icons" />
      </div>
    </div>
  );
}
