import React from 'react';
import { useSearch } from '@/hooks/search/useSearch.ts';
import { SearchContext } from '@/contexts/data/SearchContext.ts';


const SearchProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const { children } = props;
    const search       = useSearch();

    return (
        <SearchContext.Provider value={ search }>
            { children }
        </SearchContext.Provider>
    );
};

export default SearchProvider;