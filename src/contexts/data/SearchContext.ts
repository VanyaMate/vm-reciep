import { createContext } from 'react';
import {
    ISearchController,
    SortOptions,
    UrlSearch, UrlSearchItems,
} from '@/hooks/search/useSearch.ts';
import {
    DEFAULT_ITEMS,
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    DEFAULT_SORT,
} from '@/consts/search.ts';


export type SearchContextType = [ UrlSearch, ISearchController ];

export const SearchContext = createContext<SearchContextType>([
    {
        limit: DEFAULT_LIMIT,
        page : DEFAULT_PAGE,
        sort : DEFAULT_SORT,
        items: DEFAULT_ITEMS,
    }, {
        setLimit (limit: number): void {
        },
        setItems (items: UrlSearchItems): void {
        },
        setSort (sort: SortOptions): void {
        },
        setPage (page: number): void {
        },
    },
]);