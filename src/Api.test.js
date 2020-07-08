import axios from 'axios';

import { runQuery, getHomeworlds } from './Api';

jest.mock('axios');

describe('getHomeworlds', () => {
	it('fetches successfully data from an API', async () => {
		const data = {
			data: {
				hits: [
					{
						objectID: '1',
						title: 'a',
					},
					{
						objectID: '2',
						title: 'b',
					},
				],
			},
		};
		const query = `query allFilms {
		  allFilms{
	    	episodeId
		    title
		  }
		}`;
		axios.post.mockImplementationOnce(() => Promise.resolve(data));
		await expect(getHomeworlds(query)).resolves.toEqual(data);

	});

});
