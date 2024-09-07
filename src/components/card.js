import React, { Component } from "react";
import "./card.css";
import { fetchWeather } from "../api/weather";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      weather: null,
      error: null,
      backgroundClass: "", // New state for background class
    };
  }

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  handleCheckWeather = async () => {
    try {
      const data = await fetchWeather(this.state.location);
      this.setState({ weather: data, error: null });
      this.setBackgroundClass(data.weather[0].description); // Set background class based on weather description
    } catch (error) {
      this.setState({
        error: error.message,
        weather: null,
        backgroundClass: "",
      });
    }
  };

  setBackgroundClass = (description) => {
    let backgroundClass = "";
    if (description.includes("rain")) {
      backgroundClass = "rainy";
    } else if (description.includes("clear")) {
      backgroundClass = "sunny";
    } else if (description.includes("clouds")) {
      backgroundClass = "broken";
    } else if (description.includes("snow")) {
      backgroundClass = "snowy";
    } else if (description.includes("overcast")) {
      backgroundClass = "overcast";
    } else if (description.includes("thunderstorm")) {
      backgroundClass = "thunder";
    } else if (description.include("drizzle")) {
      backgroundClass = "drizzle";
    }

    this.setState({ backgroundClass });
  };

  render() {
    const { location, weather, error, backgroundClass } = this.state;

    // Safely get the country code if present
    const locationParts = location.split(",");
    const country = locationParts[1]
      ? locationParts[1].trim().toUpperCase()
      : "";

    return (
      <>
        <div className={`Container ${backgroundClass}`}>
          <div className="Card">
            <div className="title">Weather Checker</div>
            <input
              type="text"
              placeholder="Input your city and country"
              value={location}
              onChange={this.handleLocationChange}
              className="city-input"
            />
            <button className="check-button" onClick={this.handleCheckWeather}>
              Check the Weather
            </button>
            {weather && (
              <div className="weather-temps">
                <h2 className="country">
                  {weather.name}
                  {country && `, ${country}`}
                </h2>
                <p>{weather.weather[0].description}</p>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
            )}
            {error && <div>Error: {error}</div>}
          </div>
        </div>
      </>
    );
  }
}

export default Card;
