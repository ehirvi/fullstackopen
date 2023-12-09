import { useEffect, useState } from "react"
import CountryService from "../services/CountryService"

const InputField = ({ keyword, handleInputChange }) => {
    return (
        <input type="text" value={keyword} onChange={handleInputChange} />
    )
}

const CountryList = ({ list, setKeyword }) => {
    return (
        <>
            <ul>
                {list.map(country =>
                    <li key={country.name.official}>
                        {country.name.common}
                        <button style={{fontSize: 10}} onClick={() => setKeyword(country.name.common)}>show</button>
                    </li>)}
            </ul>
        </>
    )   
}

const CountryDetails = ({ country }) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h3>languages:</h3>
            <ul>{Object.keys(country.languages).map((value, i) => <li key={value}>{country.languages[value]}</li>)}</ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </>
    )
}

const Countries = () => {
    const [keyword, setKeyword] = useState("")
    const [allCountries, setAllCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        CountryService
            .getAll()
            .then(res => setAllCountries(res))
    }, [])

    useEffect(() => {
        if (keyword.length === 0) {
            setFilteredCountries([])
        } else {
            setFilteredCountries(
                CountryService
                    .getFilteredCountries(allCountries, keyword))
        }
    }, [keyword])

    const handleInputChange = (e) => {
        setKeyword(e.target.value)
    }

    return (
        <>
            <p>find countries:</p>
            <InputField keyword={keyword} handleInputChange={handleInputChange} />
            {
                filteredCountries.length > 10 ?
                    <p>too many matches</p>
                    :
                    filteredCountries.length > 1 ?
                        <CountryList list={filteredCountries} setKeyword={setKeyword} />
                        :
                        filteredCountries.length == 1 ?
                            <CountryDetails country={filteredCountries[0]} />
                            :
                            <p>enter a valid keyword</p>
            }
        </>
    )
}

export default Countries