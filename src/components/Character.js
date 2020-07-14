import React from 'react';
import '../styles/Character.scss';

/**
 * @description Renders the character details
 * @param object props
 */
const Character = ({ character }) => {
	
	return (

		<div className='character'>
			<p>{character.name}</p>
		</div>
	)
} 

export default Character;
