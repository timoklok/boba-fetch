import React , { useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/OptionSelect.scss';
import PropTypes from 'prop-types'

/**
 * @description Functional component that renders select element and updates global context when value changes
 * @component
 * @param string listName 
 * @param array list 
 * @param array currentResult 
 * @param function update 
 * return (
 * 	<OptionSelect listName='name' list={[]} currentResult={[]} function={}/>
 * )
 **/

const OptionSelect = (props) => {

	const { listName, listDisplayName, update, currentResult } = props;
	let { list } = props;

	// @Todo: this is too specific
	if (listName === 'episodeId') {
		list = list.map((item) => {
			return { ...item, 'id': parseInt(item.episodeId), 'name': item.title }
		});
	}
	
	const [currentSelection, setCurrentSlection] = useState("");
	const [isLoading, setLoading] = useState(true);

	// clear loading state when list options are loaded
	useEffect(() => {
		if (isLoading && list.length) {
			setLoading(false);
		}
	}, [list]);

	
	const clearSelection = () => {
		setCurrentSlection(undefined);
		update(listName, undefined);
	};

	const handleChange = (value) => {
		if (!value) value = undefined;
		
		// without truthy check we have to parse the episodeId to Int
		const currentSelectionObject = list.filter((item) =>  (item.id == value));
		setCurrentSlection(currentSelectionObject[0]['name'] );
		update(listName, value);
	}

	const renderOptions = () => {

		return list.map((item) => {
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
			if (!hidden) {
				return <Dropdown.Item key={item.id} eventKey={item.id}>{item.name}</Dropdown.Item>;
			}
			return undefined;
		});
	};

	const renderDropdown = () => {
		if (currentSelection) {
			return false;
		}
		return (
			<DropdownButton variant="outline-light" id="dropdown-basic-button" title={(isLoading) ? 'loading...' : 'select '+ listDisplayName } onSelect={handleChange}>
				{renderOptions()}
			</DropdownButton> 
		)
	}

	const renderSelection = () => {
		if ( ! currentSelection  ) {
			return false;
		}
		return (
			<>
				<span className='filter-option__selected'>{listDisplayName}: {currentSelection}</span>
				<button name='clear selection' className='filter-option__clear' onClick={clearSelection}></button>	
			</>
		);
	}

	return (
		<div className='filter-option'>		
			{renderSelection()}
			{renderDropdown()}	
		</div>
	);

}

OptionSelect.propTypes = {
	listName: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	currentResult: PropTypes.array.isRequired,
	update: PropTypes.func,
};

export default OptionSelect;
