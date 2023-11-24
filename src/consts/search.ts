import { SortOptions, UrlSearchItems } from '@/hooks/search/useSearch.ts';


export const DEFAULT_LIMIT: number         = 30;
export const DEFAULT_PAGE: number          = 1;
export const DEFAULT_SORT: SortOptions     = [];
export const DEFAULT_ITEMS: UrlSearchItems = {};

export const URL_LIMIT: string = 'limit';
export const URL_PAGE: string  = 'page';
export const URL_SORT: string  = 'sort';
export const URL_ITEMS: string = 'items';