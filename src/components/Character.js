import React from 'react';

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
