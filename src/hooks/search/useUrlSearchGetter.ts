import { useContext } from 'react';
import { SearchContext } from '@/contexts/data/SearchContext.ts';
import {
    SortOptions
} from '@/components/_common/_header/HeaderSearch/HeaderSearchFilters/HeaderSearchFilters.tsx';


export type UrlSearchItem = {
    label: string;
    value: string;
}

export type UrlSearch = {
    limit: number;
    page: number;
    sort: SortOptions;
    items: UrlSearchItem[];
}

export const useUrlSearchGetter = function (): UrlSearch {
    const { limit, page, sort, items } = useContext(SearchContext);

    return {
        limit,
        page,
        sort,
        items,
    };
};