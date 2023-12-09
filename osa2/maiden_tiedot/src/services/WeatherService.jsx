import axios from "axios";

const API_KEY = import.meta.env.VITE_SOME_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const getWeather = (city) => (
    axios
        .get(`${API_URL}&q=${city}&appid=${API_KEY}`)
        .then(promise => promise.data)
)

export default { getWeather }