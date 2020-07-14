import React from 'react';
import '../styles/Character.scss';

/**
 * @description Renders the character details
 * @param object props
 */
const Character = ({ character }) => {
	
	const renderFilms = () => {
		return character.films.map((film, i) =>  film.title ).join(", ");
	}

	const renderSpecies = () => {
		return character.species.map((singleSpecies, i) => singleSpecies.name).join(", ");
	}
	
	return (

		<div className='character'>
			<h4>{character.name}</h4>
			<p>Homeworld: {character.homeworld.name}</p>
			<p>Species: { renderSpecies() }</p>
			<p>Appears in: { renderFilms() }</p >
		</div>
	)
} 

export default Character;
