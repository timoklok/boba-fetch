import React, {useState, useEffect} from 'react';
import './styles/App.scss';
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
  
  const searchContextItems = useState({
    searchParameters: {
      episodeId: undefined,
      homeworld: undefined,
      species: undefined
    }
  });


  return (
    <div className="app">
      <header className="app-header">
        <h1>Boba Fetch</h1>
      </header>
      <main className='app-main'>
        <SearchContextProvider value={searchContextItems}>
          <OptionSelect listName='homeworld' list={planets} />
          <OptionSelect listName='species' list={species} />
          <OptionSelect listName='episodeId' list={films} />
          <Results />
        </SearchContextProvider>
      </main>
    </div>
  );
}

export default App;
