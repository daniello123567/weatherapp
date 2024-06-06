import searchIcon from '../Assets/search.png'
import clear from '../Assets/clear.png'
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import Skeleton from '../Assets/skeleton.gif'
import { useState, useEffect, useRef } from 'react'

function Weather() {
  const [weatherData, setWeatherData] = useState();
  const Allicons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow
  };
  const searchQuery = useRef();
  const search = async (city) => {
    if (city == "") {
      alert('enter a city name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const data = await response.json();
      const icon = Allicons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
      console.log(weatherData);
    } catch (error) {
      setWeatherData(false);

      console.log(error);
    }
  }
  useEffect(() => {
    search("new york")
  }, []);



  return (
    <div className="weather">
      <div className="search-bar">
        <input  ref={searchQuery} type="text" placeholder="search:eg 'london'" />
        <img onClick={() => {
          searchQuery.current.value && setWeatherData(false);
          search(searchQuery.current.value)

        }} className="search-img" src={searchIcon} alt="" />
      </div>
      {weatherData ? <>

        <img src={weatherData && weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData && weatherData.temperature}&deg;C</p>
        <p className='city'>{weatherData && weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity} alt="" />
            <div>
              <p>{weatherData && weatherData.humidity} %</p>
              <span>humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={weatherData && wind} alt="" />
            <div>
              <p>{weatherData && weatherData.windspeed} km/h</p>
              <span>wind speed</span>
            </div>
          </div>


        </div>
      </> : <div className='loader'>
         <div className='weather-icon1'>
        <img className='skele' src={Skeleton} alt="" />
         </div>
        <p className='temperature temp1'><img className='temp' src={Skeleton} alt="" />&deg;C</p>
          <div><img  className='name' src={Skeleton} alt="" /></div>
        <div className="weather-data f1">
          <div className="col">
            <img src={humidity} alt="" />
            <div>
              <p><img className='humidity' src={Skeleton} alt="" /> %</p>
              <span>humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={weatherData && wind} alt="" />
            <div>
              <p><img className='humidity h1' src={Skeleton} alt="" /> km/h</p>
              <span>wind speed</span>
            </div>
          </div>


        </div></div>}

    </div>
  )
}

export default Weather;
