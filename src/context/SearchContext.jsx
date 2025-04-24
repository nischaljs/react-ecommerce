import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Navigate to products page with search query
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      handleSearch,
      clearSearch,
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export default SearchContext;