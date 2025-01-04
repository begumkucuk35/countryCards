import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Header from "./components/Header";
import descendingIcon from "./assets/image/arrow-up-a-z-solid.svg";
import ascendingIcon from "./assets/image/arrow-down-a-z-solid.svg";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);

        const uniqueRegions = [
          ...new Set(data.map((country) => country.region)),
        ];
        setRegions(["All", ...uniqueRegions]);
        setDisplayedCountries(
          data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
          )
        );
      });
  }, []);

  

  useEffect(() => {
    const filterCountries = () => {
      let filtered =
        selectedRegion === "All"
          ? [...allCountries]
          : allCountries.filter((country) => country.region === selectedRegion);
  console.log(ascending)
      let sorted = ascending
        ? filtered.sort((a, b) => a.name.common.localeCompare(b.name.common))
        : filtered.sort((a, b) => b.name.common.localeCompare(a.name.common));
  
      setDisplayedCountries(sorted);
    }; 
    
    filterCountries();
  }, [selectedRegion, ascending, allCountries]);

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
          <button
            onClick={() => setAscending(!ascending)}
            className="sort-icon"
          >
            
            <img src={ascending ? ascendingIcon : descendingIcon} alt="" />
          </button>
        </section>
        <section className="card-container">
          {displayedCountries.map((country, index) => (
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
