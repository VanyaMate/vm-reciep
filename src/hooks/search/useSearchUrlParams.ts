import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import {
    ISearchMapper,
    useSearchMapper,
} from '@/hooks/search/useSearchMapper.ts';
import {
    SortOptions,
    UrlSearch,
    UrlSearchItems,
} from '@/hooks/search/useSearch.ts';
import { URL_ITEMS, URL_LIMIT, URL_PAGE, URL_SORT } from '@/consts/search.ts';


export interface ISearchUrlController {
    setLimit (limit: number): void;

    setPage (page: number): void;

    setSort (sort: SortOptions): void;

    setItems (items: UrlSearchItems): void;
}

export const useSearchUrlParams = function (): [ Partial<UrlSearch>, ISearchUrlController ] {
    const mapper: ISearchMapper       = useSearchMapper();
    const [ urlParams, setUrlParams ] = useSearchParams();

    const limit: number | null = useMemo(() => {
        const urlLimit: string | null = urlParams.get(URL_LIMIT);
        return Number(urlLimit) || null;
    }, [ urlParams ]);

    const page: number | null = useMemo(() => {
        const urlPage: string | null = urlParams.get(URL_PAGE);
        return Number(urlPage) || null;
    }, [ urlParams ]);

    const sort: SortOptions | null = useMemo(() => {
        const sort: string | null = urlParams.get(URL_SORT);
        if (sort) {
            return mapper.sort.deserialize(sort);
        } else {
            return null;
        }
    }, [ urlParams ]);

    const items: UrlSearchItems | null = useMemo(() => {
        const items: string | null = urlParams.get(URL_ITEMS);
        if (items) {
            return mapper.items.deserialize(items);
        } else {
            return null;
        }
    }, [ urlParams ]);

    const setLimit = useCallback((limit: number) => {
        setUrlParams((prev) => {
            if ((limit >= 10) && (limit <= 50)) {
                prev.set(URL_LIMIT, limit.toString());
            } else {
                prev.delete(URL_LIMIT);
            }
            return prev;
        });
    }, [ setUrlParams ]);

    const setPage = useCallback((page: number) => {
        setUrlParams((prev) => {
            if (page > 1) {
                prev.set(URL_PAGE, page.toString());
            } else {
                prev.delete(URL_PAGE);
            }
            return prev;
        });
    }, [ setUrlParams ]);

    const setSort = useCallback((sort: SortOptions) => {
        urlParams.set(URL_SORT, mapper.sort.serialize(sort));
    }, [ urlParams ]);

    const setItems = useCallback((items: UrlSearchItems) => {
        urlParams.set(URL_ITEMS, mapper.items.serialize(items));
    }, [ urlParams ]);

    const data: Partial<UrlSearch>         = useMemo(() => {
        const response: Partial<UrlSearch> = {};

        if (limit) response.limit = limit;
        if (page) response.page = page;
        if (sort) response.sort = sort;
        if (items) response.items = items;

        return response;
    }, [ limit, page, sort, items ]);
    const controller: ISearchUrlController = useMemo(() => ({
        setLimit, setPage, setSort, setItems,
    }), [ setLimit, setPage, setSort, setItems ]);

    return useMemo(() => [ data, controller ], [ data, controller ]);
};