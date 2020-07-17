import React, {useState, useEffect} from 'react';
import './styles/App.scss';
import { getFilms, getHomeworlds, getSpecies, getCharacters } from './Api';
import OptionSelect from './components/OptionSelect';
import Results from './components/Results';

function App() {

  // get all static list from api tot populate selection dropdowns
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [results, setResults] = useState([]);

  const [searchParameters, setSearchParameters] = useState({
      episodeId: undefined,
      homeworld: undefined,
      species: undefined
    });
  

  // get all lists on mount
  useEffect(() => {
    getHomeworlds().then((results) => {
      setPlanets(results.allPlanets);
    })

    getFilms().then((results) => {
      setFilms(results.allFilms);
    })

    getSpecies().then((results) => {
      setSpecies(results.allSpecies);
    })

    getCharacters(searchParameters).then((results) => {
      setResults(results.allPersons);
    });

  }, []);
  

  // set search parameters when option is selected
  const updateSearchParameters = (listName, value) => {
    if (listName == 'episodeId') {
      value = (value) ? parseInt(value) : undefined;
    }
    setSearchParameters({ ...searchParameters, [listName]: value });
  };

  // get new results when search parameters have changed
  useEffect(() => {
    getCharacters(searchParameters).then((results) => {
      setResults(results.allPersons);
    });
  }, [searchParameters]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className='title'>Boba Fetch</h1>
        <p className='description'>
          A Star Wars character locator
        </p>
      </header>
      <main className='app-main'>
          <div className='filter-options'>		
            <OptionSelect listName='homeworld' list={planets} update={updateSearchParameters} currentResult={results} />
            <OptionSelect listName='species' list={species} update={updateSearchParameters} currentResult={results} />
            <OptionSelect listName='episodeId' list={films} update={updateSearchParameters} currentResult={results} />
          </div>
          <Results characters={results}/>
      </main>
    </div>
  );
}

export default App;
