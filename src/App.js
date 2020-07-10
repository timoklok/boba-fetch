import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { getFilms, getHomeworlds, getSpecies } from './Api';
import OptionSelect from './components/OptionSelect';
import Results from './components/Results';
import { SearchContextProvider } from './context/SearchContext';

function App() {


  // get all static list from api tot populate selection dropdowns
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getHomeworlds().then((results) => {
      setPlanets(results.data.data.allPlanets);
    })

    getFilms().then((results) => {
      setFilms(results.data.data.allFilms);
    })

    getSpecies().then((results) => {
      setSpecies(results.data.data.allSpecies);
    })
  }, []);
  //
  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Boba Fetch</h1>

        <SearchContextProvider value={"testValue"}>
          <OptionSelect listName='planets' list={planets} />
          <OptionSelect listName='species' list={species} />
          <OptionSelect listName='films' list={films} />
          <Results />
        </SearchContextProvider>
      </header>
    </div>
  );
}

export default App;
