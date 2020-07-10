import React, {useContext} from 'react';
import SearchContext from '../context/SearchContext';


/**
 * @description Functional component that queries API based on context selection and displays results
 */
const Results = () => {

	const searchParameters = useContext(SearchContext);

	return (

		<div className='searchResults'>
			<h2> Results</h2>
			<span>{searchParameters}</span>
		</div>
	)
	
}

export default Results;
