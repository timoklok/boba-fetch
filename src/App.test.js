import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Correctly renders app', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/boba fetch/i);
  expect(titleElement).toBeInTheDocument();
});
