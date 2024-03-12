import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>
        find countries: <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  );
};

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <p>
            capital: {country.capital} <br />
            area: {country.area}
          </p>
          <h2>Languages</h2>
          <ul>
            <li>
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "Languages not available"}
            </li>
          </ul>
          <img
            src={country.flags.png}
            alt={country.name.common}
            style={{ width: "50px" }}
          />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    const newFilteredCountries = countries.filter(
      (country) =>
        country.name &&
        country.name.common &&
        filter &&
        typeof country.name.common === 'string' &&
        typeof filter === 'string' &&
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(newFilteredCountries);
  }, [countries, filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filter === "" ? (
        <p>Tap a country</p>
      ) : filteredCountries.length === 0 ? (
        <p>Aucun pays ne correspond à votre recherche.</p>
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </div>
  );
};

export default App;
