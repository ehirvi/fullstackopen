import { useEffect, useState } from "react"
import WeatherService from "../services/WeatherService"

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        WeatherService
            .getWeather(city)
            .then(weather => {
                setWeatherData(weather),
                    setLoaded(true)
            })
    }, [])


    return (
        <>
            <h3>weather in {city}</h3>
            {
                loaded ?
                    <>
                        <p>temperature: {weatherData.main.temp} Celcius</p>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
                        <p>wind: {weatherData.wind.speed} m/s</p>
                    </>
                    :
                    <p>loading...</p>
            }
        </>
    )

}


export default Weather