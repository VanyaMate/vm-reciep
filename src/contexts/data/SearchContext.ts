import { createContext } from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { UrlSearch } from '@/hooks/search/useUrlSearchGetter.ts';
import { IUrlSearchSetter } from '@/hooks/search/useUrlSearchSetter.ts';
import {
    SortOptions,
} from '@/components/_common/_header/HeaderSearch/HeaderSearchFilters/HeaderSearchFilters.tsx';


export type SearchContextType = UrlSearch & IUrlSearchSetter<Product>;

export const SearchContext = createContext<SearchContextType>({
    limit: 30,
    page : 0,
    sort : [],
    items: [],
    setLimit (limit: number): void {
    },
    setPage (page: number): void {
    },
    setSort (sort: SortOptions): void {
    },
    setItem (key: keyof Product, value: string): void {
    },
});