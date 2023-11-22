import React, { useEffect, useState } from 'react';
import { SearchContext } from '@/contexts/data/SearchContext.ts';
import { useSearchParams } from 'react-router-dom';
import { UrlSearchItem } from '@/hooks/search/useUrlSearchGetter.ts';
import {
    SortOptions,
} from '@/components/_common/_header/HeaderSearch/HeaderSearchFilters/HeaderSearchFilters.tsx';
import { Product } from '@/modules/api/product/product-service.types.ts';


const SearchProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const SAVED_LIMIT: string = '__mp__saved-limit';
    const SAVED_SORT: string  = '__mp__saved-sort';
    const SAVED_ITEMS: string = '__mp__saved-items';

    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ limit, setLimit ]               = useState<number>(30);
    const [ page, setPage ]                 = useState<number>(0);
    const [ sort, setSort ]                 = useState<SortOptions>([]);
    const [ items, setItems ]               = useState<UrlSearchItem[]>([]);

    const convertStringToItems = function (stringItems: string): UrlSearchItem[] {
        return stringItems.split('^^').map((item) => {
            const [ label, value ] = item.split('::');
            return { label, value };
        });
    };

    useEffect(() => {
        const savedLimit: string | null = localStorage.getItem(SAVED_LIMIT);
        const savedSort: string | null  = localStorage.getItem(SAVED_SORT);
        const savedItems: string | null = sessionStorage.getItem(SAVED_ITEMS);

        if (savedItems) setItems(convertStringToItems(savedItems));
        if (savedSort) setSort(savedSort.split(',') as SortOptions);
        if (savedLimit) setLimit(Number(savedLimit));
    }, []);

    useEffect(() => {
        const searchItems = searchParams.get('search');
        const searchLimit = searchParams.get('limit');
        const searchSort  = searchParams.get('sort');
        const searchPage  = searchParams.get('page');

        if (searchItems) {

        }
    }, [ searchParams ]);

    return (
        <SearchContext.Provider value={ {
            limit,
            page,
            sort,
            items,
            setSort (sort: [ keyof Product, ('asc' | 'desc') ] | []): void {
            },
            setPage (page: number): void {
            },
            setLimit (limit: number): void {
            },
            setItem (key: keyof Product, value: string): void {
            },
        } }>
            { children }
        </SearchContext.Provider>
    );
};

export default SearchProvider;