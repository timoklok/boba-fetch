import React, {useState, useEffect} from 'react';
import './styles/App.scss';
import { getFilms, getHomeworlds, getSpecies, getCharacters } from './components/Api';
import OptionSelect from './components/OptionSelect';
import Results from './components/Results';


function App() {

  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [results, setResults] = useState([]);

  const [searchParameters, setSearchParameters] = useState({
      episodeId: undefined,
      homeworld: undefined,
      species: undefined
    });
  

  // get all static list from api tot populate selection dropdowns on mount
  useEffect(() => {
    getHomeworlds().then((results) => {
      if (results && results.allPlanets) {
        setPlanets(results.allPlanets);
      } else {
        throw new Error("no results for Planets");
      }
    });

    getFilms().then((results) => {
      if (results && results.allFilms) {
        // episodeId doesnt use 'id' and 'name', but 'episodeId' and 'title', remap them for clarity 
        results.allFilms = results.allFilms.map((item) => {
          return { ...item, 'id': parseInt(item.episodeId), 'name': item.title }
        });

        setFilms(results.allFilms);
      } else {
        throw new Error("no results for Films");
      }

    });

    getSpecies().then((results) => {
      if (results && results.allSpecies) {
        setSpecies(results.allSpecies);
      } else {
        throw new Error("no results for Species");
      }
    });

    // start with a complete character list
    getCharacters(searchParameters).then((results) => {
      if (results && results.allPersons) {
        setResults(results.allPersons);
      } else {
        throw new Error("no results for Persons");
      }
    });

  }, []);
  

  // set search parameters when dropdown option is selected
  const updateSearchParameters = (listName, value) => {
    if (listName === 'episodeId') {
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
          <OptionSelect listName='homeworld' listDisplayName='homeworld' list={planets} update={updateSearchParameters} currentResult={results} />
          <OptionSelect listName='species' listDisplayName='species'list={species} update={updateSearchParameters} currentResult={results} />
          <OptionSelect listName='episodeId' listDisplayName='episode' list={films} update={updateSearchParameters} currentResult={results} />
          </div>
          <Results characters={results}/>
      </main>
    </div>
  );
}

export default App;
