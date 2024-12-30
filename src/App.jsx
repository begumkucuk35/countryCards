import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Header from "./components/Header";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,population"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllCountries(data);
      });
  }, []);
  return (
    <>
      <Header />
      <main>
        <section className="card-container">
          {allCountries.map((country, index) => (
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
