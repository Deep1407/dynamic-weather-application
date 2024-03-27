
import { useState } from "react"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import search_icon from "../assets/search.png"
import snow_icon from "../assets/snow.png"
import sunny_icon from "../assets/sunny.png"
import wind_icon from "../assets/wind.png"
import './WeatherApp.css'

interface WeatherApp {
  value : string;
  cityInput : any
}
const WeatherApp = () => {
  let api_key = "f06e86312844f6d7803616a08d1c4055"
  const[wicon,setWicon] = useState(cloud_icon)

  const search = async () =>{
    const element:any = document.getElementsByClassName("cityInput") 
    if(element[0].value === "")
    {
       return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent")
    const wind = document.getElementsByClassName("wind-percent")
    const temperature = document.getElementsByClassName("weather-temp")
    const location = document.getElementsByClassName("weather-location")

    humidity[0].innerHTML = data.main.humidity+" %";
    wind[0].innerHTML = data.wind.speed+" km/h";
    temperature[0].innerHTML = data.main.temp+" *c";
    location[0].innerHTML = data.name;

    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
    {
      setWicon(sunny_icon)
    }
    else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
    {
      setWicon(cloud_icon)
    }
    else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
    {
      setWicon(drizzle_icon)
    }
    else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
    {
      setWicon(snow_icon)
    }
    else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
    {
      setWicon(rain_icon)
    }
    else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
    {
      setWicon(snow_icon)
    }
    else{
      setWicon(sunny_icon)
    }
  }
  return (
    <>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="search" />
          <div className="search-icon" onClick={()=>{search()}}>
            <img src={search_icon} alt="search-icon" width="30px" height="30px" />
          </div>
        </div>
        <div className="weather-show-wrap">
          <div className="weather-image">
            <img src={cloud_icon} alt="drizzle-icon" width="200px" height="200px" />
          </div>
          <div className="weather-temp">24*C</div>
          <div className="weather-location">Kolkata</div>
        </div>
        <div className="data-container">
          <div className="humidity-wrap">
            <div className="element">
              <img src={humidity_icon} alt="humidity-icon" className="icon" width="80px" height="80px" />
            </div>
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="wind-speed-wrap">
            <div className="element">
              <img src={wind_icon} alt="wind-icon" className="icon" width="80px" height="80px" />
            </div>
            <div className="data">
              <div className="wind-percent">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default WeatherApp
