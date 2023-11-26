import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    useSearchStorageParams,
} from '@/hooks/search/useSearchStorageParams.ts';
import { useSearchUrlParams } from '@/hooks/search/useSearchUrlParams.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchNavigate } from '@/hooks/search/useSearchNavigate.ts';
import { DEFAULT_PAGE } from '@/consts/search.ts';
import * as url from 'url';
import { PageType } from '@/pages/getPage.ts';


export type UrlSearchItemType =
    'range' | 'equal' | 'match';

export type UrlSearchItem = {
    value: string;
    type: UrlSearchItemType;
}

export type UrlSearchItems = {
    [Key in keyof Product]?: UrlSearchItem
}

export type SortOptions = [ keyof Product, 'asc' | 'desc' ] | [];

export type UrlSearch = {
    limit: number;
    page: number;
    sort: SortOptions;
    items: UrlSearchItems;
}

export type SearchGetUrl = (url: string, options?: Partial<UrlSearch>) => string;

export interface ISearchController {
    setLimit (limit: number): void;

    setPage (page: number): void;

    setSort (sort: SortOptions): void;

    setItems (items: UrlSearchItems): void;

    setItem (key: keyof Product, item: UrlSearchItem): void;

    getUrl: SearchGetUrl;

    getClearUrl: SearchGetUrl;
}

export const useSearch = function (): [ UrlSearch, ISearchController ] {
    const [ storageParams, storageController ] = useSearchStorageParams();
    const [ urlParams, urlController ]         = useSearchUrlParams();
    const navigator                            = useSearchNavigate();

    const [ limit, setLimit ] = useState<number>(urlParams.limit ?? storageParams.limit);
    const [ page, setPage ]   = useState<number>(urlParams.page ?? storageParams.page);
    const [ sort, setSort ]   = useState<SortOptions>(urlParams.sort ?? storageParams.sort);
    const [ items, setItems ] = useState<UrlSearchItems>(urlParams.items ?? storageParams.items);

    const data: UrlSearch = useMemo(() => ({
        limit, page, sort, items,
    }), [ limit, page, sort, items ]);

    useEffect(() => {
        setLimit(urlParams.limit ?? storageParams.limit);
        setPage(urlParams.page ?? storageParams.page);
        setSort(urlParams.sort ?? storageParams.sort);
        setItems(urlParams.items ?? storageParams.items);
    }, [ storageParams, urlParams ]);

    const setLimitCallback = useCallback((limit: number) => {
        storageController.setLimit(limit);
        navigator.navigate(`/${ PageType.PRODUCTS }`, {
            ...data,
            limit,
            page: DEFAULT_PAGE,
        });
    }, [ navigator, data, storageController ]);

    const setPageCallback = useCallback((page: number) => {
        navigator.navigate(`/${ PageType.PRODUCTS }`, { ...data, page });
    }, [ navigator, data ]);

    const setSortCallback = useCallback((sort: SortOptions) => {
        storageController.setSort(sort);
        navigator.navigate(`/${ PageType.PRODUCTS }`, {
            ...data,
            sort,
            page: DEFAULT_PAGE,
        });
    }, [ navigator, data, storageController ]);

    const setItemsCallback = useCallback((items: UrlSearchItems) => {
        storageController.setItems(items);
        navigator.navigate(`/${ PageType.PRODUCTS }`, {
            ...data,
            items,
            page: DEFAULT_PAGE,
        });
    }, [ navigator, data, storageController ]);

    const setItemCallback = useCallback((key: keyof Product, item: UrlSearchItem) => {
        const items: UrlSearchItems = { ...data.items };
        if (item.value) {
            items[key] = item;
        } else {
            delete items[key];
        }
        setItemsCallback(items);
    }, [ navigator, data, setItemsCallback ]);

    const getUrl = useCallback((url: string, options?: Partial<UrlSearch>) => navigator.url(url, {
            items: { ...data.items, ...(options?.items ?? {}) },
            limit: options?.limit ?? data.limit,
            sort : options?.sort ?? data.sort,
            page : options?.page ?? data.page,
        },
    ), [ navigator, data ]);

    const getClearUrl = useCallback((url: string, options?: Partial<UrlSearch>) => navigator.url(url, {
        ...data, ...(options ?? {}),
    }), [ navigator, data ]);

    const controller: ISearchController = useMemo(() => ({
        setLimit: setLimitCallback,
        setPage: setPageCallback,
        setSort: setSortCallback,
        setItems: setItemsCallback,
        setItem: setItemCallback,
        getUrl: getUrl,
        getClearUrl: getClearUrl,
    }), [ setLimitCallback, setPageCallback, setSortCallback, setItemsCallback, setItemCallback, getUrl, getClearUrl ]);

    return useMemo(() => [ data, controller ], [ data, controller ]);
};