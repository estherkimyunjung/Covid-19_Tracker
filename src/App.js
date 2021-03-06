import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import "./App.css";

function App() {
  // STATE: use React HOOKS to write a variable
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  // USEEFFECT: base on a given condition it will run once when the component loads and not again
  useEffect(() => {
    //async -> send a request, wait for it, do something with input

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States
            value: country.countryInfo.iso2, //USA
          }));

          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="app_header">
        {/* Title + Select input dropdown field */}
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {/* Loop through all the contries and add show a drop down list of the options */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* InfoBoxs */}
      <div className="app_status">
        {/* InfoBoxs title ="Coronavirus cases*/}
        <InfoBox title="Coronavirus Cases" cases={2020} total={4000} />
        {/* InfoBoxs title ="Coronavirus recoveries*/}
        <InfoBox title="Recovered" cases={2002} total={402200} />
        {/* InfoBoxs title ="Coronavirus deaths*/}
        <InfoBox title="Deaths" cases={123} total={400} />
      </div>

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
