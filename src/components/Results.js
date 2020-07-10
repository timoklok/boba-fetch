import React, {useContext, useEffect, useState} from 'react';
import SearchContext from '../context/SearchContext';
import { getCharacters } from '../Api';


/**
 * @description Functional component that queries API based on context selection and displays results
 */
const Results = () => {

	const searchParameters = useContext(SearchContext)[0];
	
	useEffect(() => {
		getCharacters(searchParameters).then((results) => {
			console.log(results);
		})
	}, [searchParameters]);
	
	return (

		<div className='searchResults'>
			<h2> Results</h2>
		</div>
	)
	
}

export default Results;
