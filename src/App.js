import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { getFilms, getHomeworlds, getSpecies } from './Api';

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
        
        <select name="planet" value={''} onChange={ console.log('planet selected')}>
          {planets.map((planet) => {
            return <option key={planet.id} value={planet.id}>{planet.name}</option>;
          })}
        </select>

        <select name="species" value={''} onChange={console.log('species selected')}>
          {species.map((species) => {
            return <option key={species.id} value={species.id}>{species.name}</option>;
          })}
        </select>

        <select name="film" value={''} onChange={console.log('film selected')}>
          {films.map((film) => {
            return <option key={film.episodeId} value={film.episodeId}>{film.title}</option>;
          })}
        </select>

      </header>
    </div>
  );
}

export default App;
