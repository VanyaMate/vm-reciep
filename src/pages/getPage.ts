import { Options } from '@/modules/api.types.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';


export type PageSearchOptions = Options<Product> & {
    search?: string;
}

export enum PageType {
    HOME     = '/',
    CATEGORY = '/category',
}

export const getProductPageUrl = function (id: string): string {
    return '/product/' + id;
};

export const getHomePageUrl = function (search?: PageSearchOptions): string {
    return '/' + getPageSearchParamsUrl(search);
};

export const getCategoryPageUrl = function (id: string, search?: PageSearchOptions): string {
    return '/category/' + id + getPageSearchParamsUrl(search);
};

export const getCategoriesPageUrl = function (): string {
    return '/category';
};

export const getPageSearchParamsUrl = function (search?: PageSearchOptions): string {
    let url: string = '';

    const params: string[] = [];
    if (search) {
        url += '?';
    }
    if (search?.search) {
        params.push('q=' + search.search);
    }
    if (search?.limit) {
        params.push('l=' + search.search);
    }
    if (search?.offset) {
        params.push('p=' + search.search);
    }
    if (search?.sort) {
        params.push('s=' + search?.sort.join(','));
    }

    return url + params.join('&');
};