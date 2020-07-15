import React from 'react';
import { render } from '@testing-library/react';
import Character from '../components/Character';

test('Correctly renders character component', () => {

	const character = {
		name: "test character",
		homeworld: 'test world',
		species: [{ name: 'test name' }],
		films: [{ title: 'test name' }]
	}
	const { getByText } = render(<Character character={character}/>);
	const detailElement = getByText(/homeworld/i);
	expect(detailElement).toBeInTheDocument();
});
