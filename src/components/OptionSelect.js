import React , { useContext, useEffect, useState } from "react";
import SearchContext from '../context/SearchContext';

/**
 * @description Functional component that renders select element and updates global context when value changes
 * @param object props
 */
const OptionSelect = ({ list, listName }) => {

	// @Todo: this is too specific  
	if (listName === 'episodeId') {
		list = list.map((item) => {
			return { ...item, 'id': item.episodeId, 'name': item.title }
		});
	}
	
	const [searchContextItems, setSearchContextItems] = useContext(SearchContext);
	const [options, setOptions] = useState(list);

	const handleChange = (event) => {
		let { value } = event.target;
		if (value === '') value = undefined;
		const searchParameters = { ...searchContextItems['searchParameters'], [listName]: (listName === 'episodeId') ? parseInt(value) : value };
		setSearchContextItems({ ...searchContextItems, searchParameters: searchParameters});
	}

	const updateOptions = (currentResult) => {
		const updatedList = list.map((item) => {
			let hidden = true;

			// only show an option if it is present in the current search result
			for (let i = 0; i < currentResult.length; i++) {
				const character = currentResult[i];

				if (listName === 'episodeId') {
					let isPresent = (character['films'].some(e => e.episodeId === item.id));
					if (isPresent) {
						hidden = false;
						break;
					}
				} else if (listName === 'species') {
					let isPresent = (character['species'].some(e => e.id === item.id));
					if (isPresent) {
						hidden = false;
						break;
					}
				} else {
					if (character.homeworld.id === item.id) {
						hidden = false;
						break;
					}
				}

			}

			return { ...item, 'hidden': hidden };
		});

		setOptions(updatedList);
	}

	useEffect(() => {
		const currentResult = searchContextItems.searchResult;
		updateOptions(currentResult);
	}, [searchContextItems.searchResult]);

	return (<select name={listName} onChange={handleChange}>
		<option value=''>CLEAR</option>;
		{options.map((item) => {
			if (!item.hidden) {
				return <option key={item.id} value={item.id}>{item.name}</option>;
			}
			return undefined;
		})}
	</select> )

}

export default OptionSelect;
