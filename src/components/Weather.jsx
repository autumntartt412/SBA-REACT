import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import sunny_icon from '../assets/clear.png'
import cloudy_icon from '../assets/cloud.png'
import sprinkle_icon from '../assets/drizzle.png'
import rainy_icon from '../assets/rain.png'
import snowy_icon from '../assets/snow.png'
// import windy_icon from '../assets/wind.png'
import hazy_icon from '../assets/humidity.png'


const Weather = () => {

    const inputRef = useRef()

    // const [weatherData, SetWeatherData] = useState(false);
    const [weatherData, SetWeatherData] = useState(null);
    


    const weatherIcons = {
        // https://openweathermap.org/img/wn/10d@2x.png
        "01d": sunny_icon,
        "01n": sunny_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": sprinkle_icon,
        "04n": sprinkle_icon,
        "09d": rainy_icon,
        "09n": rainy_icon,
        "010d": rainy_icon,
        "010n": rainy_icon,
        "013d": snowy_icon,
        "013n": snowy_icon,
    }

    const search = async(city) => {
        if(city === "") {
            alert("Please Enter City Name!");
            return city;
        }
        try { 
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID} `;


           const response = await fetch(url);
           const data = await response.json();

            if(!response.ok) {
                alert(data.message);
                return response;
            }

           console.log(data);

           const icon = weatherIcons[data.weather[0].icon] || sunny_icon;
           SetWeatherData({
            humidity: data.main.humidity,
            feelsLike: data.main.feels_like,
            temp: Math.floor(data.main.temp),
            location: data.name,
            description: data.weather.description,
            icon: icon
           })
        } catch (error) {
           SetWeatherData(false);
           console.error("Error fetching data");
        }
    }
    useEffect(() => {
        // search("");
    }, [])
    return (
        <>
            <div className="weather">
                <div className='search-box'>
                    <input ref={inputRef} type="text" placeholder='Search' />
                    <img src={search_icon} onClick={ () => search(inputRef.current.value) } alt="magifying glass" />
                </div>

            {weatherData?<>
                <img src={weatherData.icon} className='weather_icon' alt="sunshine" />
                <h1 className='temp'>{weatherData.temp}</h1>
                <h2 className='location'>{weatherData.location} °F</h2>
                <div className='weather-data'>
                    <div className='col'>
                        {/* <img src={hazy_icon} alt="haze" /> */}
                        <div>
                            <h1>☀️😎</h1>
                            <span>Humidity:</span>
                            <h1>{weatherData.humidity} °F</h1>
                        </div>
                    </div>
                    <div className='col'>
                        {/* <img src={sunny_icon} alt="sunny" /> */}
                        <h1>🤔</h1>
                        <div>
                        <span>Feels Like:</span>
                            <h1>{weatherData.feelsLike} °F</h1>     
                        </div>
                    </div>
                </div>
            </>:<></>} 
         </div>
    </>
    )
}

export default Weather


// ☔⛈️ ❄️⛄ 🌁🌫️ ☀️😎 ⛅😶‍🌫️ 🤔
// "https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=fbedc48e7a192a0a6d8591add0ae7414"
//  API = `fbedc48e7a192a0a6d8591add0ae7414` 