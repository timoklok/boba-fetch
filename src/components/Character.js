import React from 'react';
import '../styles/Character.scss';

/**
 * @description Renders the character details
 * @param object character
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
			<h4 className='character__name'>{character.name}</h4>
			<p><span className='character__detail'>Homeworld:</span> {character.homeworld.name}</p>
			<p><span className='character__detail'>Species:</span> { renderSpecies() }</p>
			<p><span className='character__detail'>Appears in:</span> { renderFilms() }</p >
		</div>
	)
} 

export default Character;
