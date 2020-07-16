import React, { useEffect, useState} from 'react';
import Character from './Character';
import '../styles/Results.scss';


/**
 * Functional component that queries API based on context selection and displays results
 * @component
 * return (
 * 	<Results />
 * )
 */
const Results = ( props ) => {
	const { characters } = props;
	
	const [isLoading, setLoading] = useState(true);

	// clear loading state when list options are loaded
	useEffect(() => {
		if (isLoading && characters.length) {
			setLoading(false);
		}
	}, [characters, isLoading]);

	return (

		<div className='search-results'>
			<h2> Found {characters.length} possible target(s)</h2>

			<div className='search-results__items'>
				{characters.map( (char) => {
					return <Character key={char.id} character={char} />
				})
				}
			</div>
		</div>
	)
	
}

export default Results;
