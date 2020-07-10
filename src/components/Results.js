import React, {useContext, useEffect, useState} from 'react';
import SearchContext from '../context/SearchContext';
import { getCharacters } from '../Api';


/**
 * @description Functional component that queries API based on context selection and displays results
 */
const Results = () => {

	const searchParameters = useContext(SearchContext)[0];
	const [characters, setCharacters] = useState([]);
	useEffect(() => {
		getCharacters(searchParameters).then((results) => {
			setCharacters(results.data.data.allPersons);
		})
	}, [searchParameters]);
	
	return (

		<div className='searchResults'>
			<h2> Results</h2>

			{characters.map( (char) => {
				return <p key={char.id}>{char.name}</p>
			})
			}
		</div>
	)
	
}

export default Results;
