import { useCallback, useMemo, useState } from 'react';
import {
    ISearchMapper,
    useSearchMapper,
} from '@/hooks/search/useSearchMapper.ts';
import {
    DEFAULT_ITEMS,
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    DEFAULT_SORT,
} from '@/consts/search.ts';
import {
    SortOptions,
    UrlSearch,
    UrlSearchItems,
} from '@/hooks/search/useSearch.ts';


export interface ISearchStorageController {
    setLimit (value: number): void;

    setSort (value: SortOptions): void;

    setItems (value: UrlSearchItems): void;
}

export const useSearchStorageParams = function (): [ UrlSearch, ISearchStorageController ] {
    const SAVED_LIMIT: string = '__mp__search-limit';
    const SAVED_ITEMS: string = '__mp__search-items';
    const SAVED_SORT: string  = '__mp__search-sort';

    const mapper: ISearchMapper = useSearchMapper();

    const page: number        = useMemo(() => DEFAULT_PAGE, []);
    const [ limit, setLimit ] = useState<number>(Number(localStorage.getItem(SAVED_LIMIT) ?? DEFAULT_LIMIT));
    const [ sort, setSort ]   = useState(mapper.sort.deserialize(localStorage.getItem(SAVED_SORT) ?? ''));
    const [ items, setItems ] = useState(() => {
        const savedItemsString: string | null = sessionStorage.getItem(SAVED_ITEMS);
        if (savedItemsString) {
            return mapper.items.deserialize(savedItemsString);
        } else {
            return DEFAULT_ITEMS;
        }
    });

    const setLimitCallback = useCallback((value: number) => {
        localStorage.setItem(SAVED_LIMIT, `${ value }`);
        setLimit(value);
    }, [ limit ]);
    const setSortCallback  = useCallback((value: SortOptions) => {
        localStorage.setItem(SAVED_SORT, mapper.sort.serialize(value));
        setSort(value);
    }, [ sort ]);
    const setItemsCallback = useCallback((value: UrlSearchItems) => {
        sessionStorage.setItem(SAVED_ITEMS, mapper.items.serialize(value));
        setItems(value);
    }, [ items ]);

    const data: UrlSearch                      = useMemo(() => ({
        limit, page, sort, items,
    }), [ limit, page, sort, items ]);
    const controller: ISearchStorageController = useMemo(() => ({
        setLimit: setLimitCallback,
        setSort : setSortCallback,
        setItems: setItemsCallback,
    }), [ setLimitCallback, setSortCallback, setItemsCallback ]);

    return useMemo(() => {
        return [
            data,
            controller,
        ];
    }, [ data, controller ]);
};