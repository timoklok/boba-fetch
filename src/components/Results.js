import React, {useContext, useEffect} from 'react';
import SearchContext from '../context/SearchContext';


/**
 * @description Functional component that queries API based on context selection and displays results
 */
const Results = () => {

	const searchParameters = useContext(SearchContext)[0];

	useEffect(() => {
		console.log(searchParameters);
	}, [searchParameters]);
	
	return (

		<div className='searchResults'>
			<h2> Results</h2>
		</div>
	)
	
}

export default Results;
