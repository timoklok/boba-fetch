import React , { useState, useEffect } from "react";

const OptionSelect = ({ list, listName }) => {

	if (listName === 'films') {
		list = list.map((item) => {
			return { ...item, 'id': item.episodeId, 'name': item.title }
		});
	}
	
	const [ selection, setSelection ] = useState({});
	
	useEffect(() => {
		console.log(selection);
	}, [selection]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setSelection( () => { return{...selection, [listName]: value }});
	}

	return (<select name={listName} onChange={handleChange}>
		{list.map((item) => {
			return <option key={item.id} value={item.id}>{item.name}</option>;
		})}
	</select> )

}

export default OptionSelect;
