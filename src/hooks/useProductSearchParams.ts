import { PageSearchOptions } from '@/pages/getPage.ts';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { Options } from '@/modules/api.types.ts';


export type ProductSearchParams = { [Key in keyof PageSearchOptions]: string };

export const useProductSearchParams = function (): [ string, Options<Product> ] {
    const [ urlParams, setUrlParams ]    = useSearchParams();
    const searchParams: Options<Product> = {};
    let search: string                   = '';

    const searchQuery: string | null = urlParams.get('q');
    const limitQuery: string | null  = urlParams.get('l');
    const offsetQuery: string | null = urlParams.get('p');
    const sortQuery: string | null   = urlParams.get('s');

    if (searchQuery) {
        search = searchQuery;
    }
    if (limitQuery) {
        searchParams.limit = Number(limitQuery);
    }
    if (offsetQuery) {
        searchParams.offset = Number(offsetQuery);
    }
    if (sortQuery) {
        const sortParams: string[] = sortQuery.split(',');
        if (sortParams.length === 2) {
            searchParams.sort = sortParams as [ keyof Product, 'asc' | 'desc' ];
        }
    }

    return [ search, searchParams ];
};