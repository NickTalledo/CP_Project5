import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchFilteredCountries = async () => {
      if (selectedCurrency) {
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/currency/${selectedCurrency}`
          );
          const data = await response.json();
          setFilteredCountries(data);
        } catch (error) {
          console.error("Error fetching filtered countries: ", error);
          setFilteredCountries([]);
        }
      } else {
        setFilteredCountries(countries);
      }
    };

    fetchFilteredCountries();
  }, [selectedCurrency, countries]);

  useEffect(() => {
    // Apply filters based on selected region, currency, and search term
    let filteredResults = countries;

    if (selectedCurrency) {
      filteredResults = countries.filter((country) =>
        Object.values(country.currencies || {}).some(
          (currency) => currency.code === selectedCurrency
        )
      );
    }

    if (selectedRegion) {
      filteredResults = filteredResults.filter(
        (country) => country.region === selectedRegion
      );
    }

    if (searchTerm) {
      filteredResults = filteredResults.filter((country) =>
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(filteredResults);
  }, [selectedCurrency, selectedRegion, searchTerm, countries]);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD"];

  const uniqueRegions = new Set(
    filteredCountries.map((country) => country.region)
  ).size;

  const regionCounts = {};
  filteredCountries.forEach((country) => {
    const region = country.region || "Unknown";
    regionCounts[region] = (regionCounts[region] || 0) + 1;
  });

  const totalCountriesPerRegion = Object.entries(regionCounts).map(
    ([region, count]) => `${region}: ${count}`
  );

  return (
    <div className="dashboard">
      <h1>Country Dashboard</h1>

      <input
        type="text"
        placeholder="Search by country name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <label htmlFor="regionFilter">Filter by Region:</label>
      <select
        id="regionFilter"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <label htmlFor="currencyFilter">Filter by Currency:</label>
      <select
        id="currencyFilter"
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        <option value="">All Currencies</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <div className="stats">
        Total Number of Countries: {filteredCountries.length}
      </div>
      <div className="stats">Number of Unique Regions: {uniqueRegions}</div>

      <div className="stats">
        Total Countries Per Region: {totalCountriesPerRegion.join(", ")}
      </div>

      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.official}>
            {country.name.official} - Region: {country.region}, Currency:{" "}
            {selectedCurrency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
