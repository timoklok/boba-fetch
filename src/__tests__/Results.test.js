import React from 'react';
import { render } from '@testing-library/react';
import Results from '../components/Results';

test('Correctly renders results component', () => {
	const { getByText } = render(<Results characters={[]} />);
	const textElement = getByText(/found/i);
	expect(textElement).toBeInTheDocument();
});
