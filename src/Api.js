import axios from "axios";

const API_URL = 'https://swapi.graph.cool/';

// @todo: add error handling
// @todo: add tests

/**
 * @description Function that retrieves characters that matches all three params provided
 * @param object searchParameters
 * @returns Promise
 */
export const getCharacters = async function (searchParameters) {
	const query = `query findCharacters ($homeworld: ID, $species: ID, $episodeId: Int) {
		allPersons(
			orderBy: name_ASC,
			filter: {
				homeworld: { id: $homeworld },
				species_some: { id: $species },
				films_some: { episodeId: $episodeId  }
			}) {
				id
				name
				homeworld {
					name
					id
				}
				species {
					name
					id
				}
				films {
					title
					episodeId
				}
			}
		}`;

	return await runQuery(query, searchParameters).then( (result) => result.data.data);

}

/**
 * @description Function that retrieves all Star Wars Films
 * @returns Promise
 */
export const getFilms = async function () {
	const query =
		`query allFilms {
		  allFilms{
	    	episodeId
		    title
		  }
		}`
	return await runQuery(query).then((result) => result.data.data);
}

/**
 * @description Function that retrieves all Star Wars Species
 * @returns Promise
 */
export const getSpecies = async function () {
	const query =
		`query allSpecies {
		  allSpecies{
	    	name
		    id
		  }
		}`;

	return await runQuery(query).then((result) => result.data.data);
}

/**
 * @description Function that retrieves all Star Wars Worlds
 * @returns Promise
 */
export const getHomeworlds = async () => {
	const query = `query allPlanets {
		  allPlanets{
	    	name
		    id
		  }
		}`;
	return await runQuery(query).then((result) => result.data.data);
}


/**
 * @description Calls the Star Wars GraphQL
 * @param {object} query 
 * @param {object} variables
 * @returns Promise
 */
export const runQuery = async (query, variables = {}) => {

	if (!query) { throw new Error('Network Error'); }
	
	return await axios.post(API_URL, {
		query: query,
		variables: variables
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	});

};
