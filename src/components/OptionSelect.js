import React , { useState, useEffect } from "react";

/**
 * @description Functional component that renders select element and updates global context when value changes
 * @param object props
 */
const OptionSelect = ({ list, listName }) => {

	// @Todo: this is too specific  
	if (listName === 'films') {
		list = list.map((item) => {
			return { ...item, 'id': item.episodeId, 'name': item.title }
		});
	}
	
	const [ selection, setSelection ] = useState({});
	
	// @todo: update global context selection object and fetch new data
	useEffect(() => {
		console.log(selection);
	}, [selection]);

	const handleChange = (event) => {
		const { value } = event.target;
		setSelection( () => { return{...selection, [listName]: value }});
	}

	return (<select name={listName} onChange={handleChange}>
		{list.map((item) => {
			return <option key={item.id} value={item.id}>{item.name}</option>;
		})}
	</select> )

}

export default OptionSelect;
