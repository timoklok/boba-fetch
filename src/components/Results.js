import React, {useContext, useEffect, useState} from 'react';
import SearchContext from '../context/SearchContext';
import { getCharacters } from '../Api';
import Character from './Character';
import '../styles/Results.scss';


/**
 * Functional component that queries API based on context selection and displays results
 * @component
 * return (
 * 	<Results />
 * )
 */
const Results = () => {

	const [characters, setCharacters] = useState([]);

	// todo: move this, let results only render?
	const [searchContextItems, setSearchContextItems] = useContext(SearchContext);
	useEffect(() => {
		getCharacters(searchContextItems.searchParameters).then((results) => {
			setCharacters(results.allPersons);
			setSearchResult(results);
		})
	}, [searchContextItems.searchParameters]);
	
	const setSearchResult = (results) => {
		setSearchContextItems({ ...searchContextItems, searchResult: results.allPersons });
	}

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
