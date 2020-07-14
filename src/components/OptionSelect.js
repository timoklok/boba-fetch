import React , { useContext, useEffect, useState } from "react";
import SearchContext from '../context/SearchContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import '../styles/OptionSelect.scss';

/**
 * @description Functional component that renders select element and updates global context when value changes
 * @param object props
 */
const OptionSelect = ({ list, listName }) => {

	// @Todo: this is too specific  
	if (listName === 'episodeId') {
		list = list.map((item) => {
			return { ...item, 'id': parseInt(item.episodeId), 'name': item.title }
		});
	}
	
	const [searchContextItems, setSearchContextItems] = useContext(SearchContext);
	const [options, setOptions] = useState(list);
	const [currentSelection, setCurrentSlection] = useState("");

	const clearSelection = () => {
		setCurrentSlection(undefined);
		const searchParameters = { ...searchContextItems['searchParameters'], [listName]: undefined };
		setSearchContextItems({ ...searchContextItems, searchParameters: searchParameters });
	};

	// set searchparameters in context object on selecting a option
	const handleChange = (value) => {
		if (!value) value = undefined;
		
		// without truthy check we have to parse the episodeId to Int
		const currentSelectionObject = list.filter((item) =>  (item.id == value));
		setCurrentSlection(currentSelectionObject[0]['name'] );

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

	const renderDropdown = () => {
		if (currentSelection) {
			return false;
		}
		return (
			<DropdownButton id="dropdown-basic-button" title={(currentSelection) ? currentSelection : 'select'} onSelect={handleChange}>
				{options.map((item) => {
					if (!item.hidden) {
						return <Dropdown.Item key={item.id} eventKey={item.id}>{item.name}</Dropdown.Item>;
					}
					return undefined;
				})}
			</DropdownButton> 
		)
	}

	const renderSelection = () => {
		if ( ! currentSelection  ) {
			return false;
		}
		return (
			<p>{currentSelection}
				<Button onClick={clearSelection} variant="primary">clear</Button>
			</p>
		);
	}

	return (
		<div>		
			{renderSelection()}
			{renderDropdown()}
			
		</div>
	);

}

export default OptionSelect;
