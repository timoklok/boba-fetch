import React, { useEffect, useState} from 'react';
import Character from './Character';
import '../styles/Results.scss';
import '../styles/Loader.scss';
import PropTypes from 'prop-types'


/**
 * Functional component that queries API based on context selection and displays results
 * @component
 * return (
 * 	<Results characters={[]}/>
 * )
 */
const Results = ( props ) => {
	const { characters } = props;

	const [isLoading, setLoading] = useState(true);

	//clear loading state when initial results are loaded
	useEffect(() => {
		if (isLoading && characters.length) {
			setLoading(false);
		}
	}, [characters, isLoading]);

	
	const renderCharacters = () => {
		if (!isLoading) {
			return characters.map((char) => {
				return <Character key={char.id} character={char} />
			})
		}
		return false;
	}
	 
	const renderLoader = () => {
		if (isLoading) {
			return <div className="loader"><div></div><div></div></div>
		}
		return false;
	}

	return (

		<div className='search-results'>
			<h2 className='search-results__count'> Found {characters.length} possible target(s)</h2>

			<div className='search-results__items'>
				{renderCharacters()}
				{renderLoader()}
			</div>
		</div>
	)
	
}

Results.propTypes = {
	characters: PropTypes.array.isRequired,
};


export default Results;
