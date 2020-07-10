import React, {useContext, useEffect, useState} from 'react';
import SearchContext from '../context/SearchContext';
import { getCharacters } from '../Api';


/**
 * @description Functional component that queries API based on context selection and displays results
 */
const Results = () => {

	const [searchContextItems, setSearchContextItems] = useContext(SearchContext);
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		getCharacters(searchContextItems.searchParameters).then((results) => {
			setCharacters(results.data.data.allPersons);
			setSearchResult(results);
		})
	}, [searchContextItems.searchParameters]);
	
	const setSearchResult = (results) => {
		setSearchContextItems({ ...searchContextItems, searchResult: results.data.data.allPersons });
	}

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
