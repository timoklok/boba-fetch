import React from 'react';
import '../styles/Character.scss';
import PropTypes from 'prop-types'

/**
 * Renders the character details
 * @component 
 * @param object character 
 * return (
 * 	<Character character={character} />
 * )
 */
const Character = (props) => {
	const { character } = props;

	const renderFilms = () => {
		return character.films.map((film, i) =>  film.title ).join(", ");
	}

	const renderSpecies = () => {
		return character.species.map((singleSpecies, i) => singleSpecies.name).join(", ");
	}
	
	return (
		<div className='character'>
			<h4 className='character__name'>{character.name}</h4>
			<p className='character-detail'>
				<span className='character-detail__name'>Homeworld</span>
				<span className='character-detail__value'>{character.homeworld.name}</span>
			</p>
			<p className='character-detail'>
				<span className='character-detail__name'>Species</span>
				<span className='character-detail__value'>{renderSpecies()}</span>
			</p>
			<p className='character-detail'>
				<span className='character-detail__name'>Appears in</span>
				<span className='character-detail__value'>{renderFilms()}</span>
			</p >
		</div>
	)
} 

Character.propTypes = {
	character: PropTypes.object.isRequired,
};

export default Character;
