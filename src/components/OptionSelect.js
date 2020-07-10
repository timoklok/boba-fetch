import React , { useContext } from "react";
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
	
	const [ searchContextParameters, setSearchContextParameters] = useContext(SearchContext);

	const handleChange = (event) => {
		const { value } = event.target;
		setSearchContextParameters({ ...searchContextParameters, [listName]: (listName === 'episodeId') ? parseInt(value) : value });
	}

	return (<select name={listName} onChange={handleChange}>
		{list.map((item) => {
			return <option key={item.id} value={item.id}>{item.name}</option>;
		})}
	</select> )

}

export default OptionSelect;
