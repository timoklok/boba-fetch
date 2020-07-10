import React from 'react';

const SearchContext = React.createContext([
	{},
	() => {},
]);

export const SearchContextProvider = SearchContext.Provider;

export default SearchContext;
