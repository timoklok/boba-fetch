import axios from 'axios';
import { runQuery, getFilms } from './Api';

jest.mock('axios');

describe('getFilms', () => {
	it('fetches successfully data from an API', done => {
		const mockresult = {
			data: {
				data: [
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
		axios.post.mockImplementationOnce(
			() => Promise.resolve(mockresult)
		);

		getFilms().then((results) => {
			expect(results).toBe(mockresult.data.data);
			expect(axios.post).toHaveBeenCalledTimes(1);
			//expect(axios.post).toHaveBeenCalledWith(
			//	"https://swapi.graph.cool/"
			//);
			done();
		});

	});

});
