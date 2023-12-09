import axios from "axios";

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => (
    axios
        .get(API_URL)
        .then(promise => promise.data)
)

const getFilteredCountries = (countries, keyword) => (
    countries.filter(country => country.name.common
        .toLowerCase()
        .includes(keyword.toLowerCase()))
)

export default { getAll, getFilteredCountries }