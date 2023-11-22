import { Product } from '@/modules/api/product/product-service.types.ts';
import { useContext } from 'react';
import { SearchContext } from '@/contexts/data/SearchContext.ts';


export interface IUrlSearchSetter<Product> {
    setLimit (limit: number): void;

    setPage (page: number): void;

    setSort (sort: [ keyof Product, 'asc' | 'desc' ] | []): void;

    setItem (key: keyof Product, value: string): void;
}

export const useUrlSearchSetter = function (): IUrlSearchSetter<Product> {
    const { setSort, setPage, setItem, setLimit } = useContext(SearchContext);

    const getProductsListUrl = () => {
    };

    return {
        setSort (sort: [ keyof Product, ('asc' | 'desc') ] | []): void {
            setSort(sort);
            setPage(0);
            // go to products page
        },
        setPage (page: number): void {
            setPage(page);
            // go to products page
        },
        setItem (key: keyof Product, value: string): void {
            setItem(key, value);
            setPage(0);
            // go to products page
        },
        setLimit (limit: number): void {
            setLimit(limit);
            setPage(0);
            // go to products page
        },
    };
};