import axios from "axios";

const API_URL = 'https://swapi.graph.cool/';

// @todo: add error handling
// @todo: add tests

/**
 * @description Function that retrieves characters that matches all three params provided
 * @param {*} episodeId
 * @param {*} homeworld
 * @param {*} species
 * @returns Promise
 */
export const getCharacters = async function (episodeId, homeworld, species) {

	const query = `query findCharacters ($homeworld: String!, $species: String!, $episodeId: Int!) {
		allPersons(
			orderBy: name_ASC,
			filter: {
				homeworld: { name: $homeworld },
				species_some: { name: $species },
				films_some: { episodeId: $episodeId  }
			}) {
				id
				name
				homeworld {
					name
				}
				species {
					name
				}
			}
		}`;

	const variables = {
		episodeId: episodeId,
		homeworld: homeworld,
		species: species
	};

	return runQuery(query, variables);

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
	return runQuery(query);

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

	return runQuery(query);
}

/**
 * @description Function that retrieves all Star Wars Worlds
 * @returns Promise
 */
export const getHomeworlds = () => {
	const query = `query allPlanets {
		  allPlanets{
	    	name
		    id
		  }
		}`;
	return runQuery(query);
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
