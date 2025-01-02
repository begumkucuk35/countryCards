import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Header from "./components/Header";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);

        const uniqueRegions = [
          ...new Set(data.map((country) => country.region)),
        ];
        setRegions(["All", ...uniqueRegions]);
      });
  }, []);

  const filterCountries = () =>{
   return selectedRegion === "All" ? allCountries : allCountries.filter((country) => country.region === selectedRegion);
  }
  console.log(regions);
  return (
    <>
      <Header />
      <main>
        <section className="region-tabs">
          {regions.map((region, index) => (
            <button key={index} onClick={() => setSelectedRegion(region)}>
              {region}
            </button>
          ))}
        </section>
        <section className="card-container">
        {filterCountries().map((country, index) => (
            <Cards
              key={index}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
