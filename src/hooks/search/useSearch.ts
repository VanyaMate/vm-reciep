import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    useSearchStorageParams,
} from '@/hooks/search/useSearchStorageParams.ts';
import { useSearchUrlParams } from '@/hooks/search/useSearchUrlParams.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    DEFAULT_ITEMS,
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    DEFAULT_SORT,
} from '@/consts/search.ts';
import { useNavigate } from 'react-router-dom';


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

export interface ISearchController {
    setLimit (limit: number): void;

    setPage (page: number): void;

    setSort (sort: SortOptions): void;

    setItems (items: UrlSearchItems): void;
}

export const useSearch = function (): [ UrlSearch, ISearchController ] {
    const [ storageParams, storageController ] = useSearchStorageParams();
    const [ urlParams, urlController ]         = useSearchUrlParams();
    const navigate                             = useNavigate();

    const [ limit, setLimit ] = useState<number>(urlParams.limit ?? storageParams.limit);
    const [ page, setPage ]   = useState<number>(urlParams.page ?? storageParams.page);
    const [ sort, setSort ]   = useState<SortOptions>(urlParams.sort ?? storageParams.sort);
    const [ items, setItems ] = useState<UrlSearchItems>(urlParams.items ?? storageParams.items);

    useEffect(() => {
        setLimit(urlParams.limit ?? storageParams.limit);
    }, [ storageParams.limit, urlParams.limit ]);

    useEffect(() => {
        setPage(urlParams.page ?? storageParams.page);
    }, [ storageParams.page, urlParams.page ]);

    useEffect(() => {
        setSort(urlParams.sort ?? storageParams.sort);
    }, [ storageParams.sort, urlParams.sort ]);

    useEffect(() => {
        setItems(urlParams.items ?? storageParams.items);
    }, [ storageParams.items, urlParams.items ]);

    const setLimitCallback = useCallback((limit: number) => {
        storageController.setLimit(limit);
        navigate('/products');
        urlController.setLimit(limit);
        urlController.setPage(0);
        setLimit(limit);
    }, [ navigate, limit, urlController ]);

    const setPageCallback = useCallback((page: number) => {
        navigate('/products');
        urlController.setPage(page);
        setPage(page);
    }, [ navigate, page, urlController ]);

    const setSortCallback = useCallback((sort: SortOptions) => {
        storageController.setSort(sort);
        navigate('/products');
        urlController.setSort(sort);
        urlController.setPage(0);
        setSort(sort);
    }, [ navigate, sort, urlController ]);

    const setItemsCallback = useCallback((items: UrlSearchItems) => {
        storageController.setItems(items);
        navigate('/products');
        urlController.setItems(items);
        urlController.setPage(0);
        setItems(items);
    }, [ items, urlController ]);

    const data: UrlSearch               = useMemo(() => ({
        limit, page, sort, items,
    }), [ limit, page, sort, items ]);
    const controller: ISearchController = useMemo(() => ({
        setLimit: setLimitCallback,
        setPage : setPageCallback,
        setSort : setSortCallback,
        setItems: setItemsCallback,
    }), []);

    return useMemo(() => [ data, controller ], [ data, controller ]);
};