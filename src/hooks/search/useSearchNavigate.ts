import { UrlSearch } from '@/hooks/search/useSearch.ts';
import {
    ISearchMapper,
    useSearchMapper,
} from '@/hooks/search/useSearchMapper.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import {
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    DEFAULT_SORT, URL_ITEMS, URL_LIMIT, URL_PAGE, URL_SORT,
} from '@/consts/search.ts';
import { useCart } from '@/hooks/useCart.ts';


export interface ISearchNavigateController {
    navigate (url: string, options: UrlSearch): void;

    url (url: string, options: UrlSearch): string;
}

export const useSearchNavigate = function (): ISearchNavigateController {
    const mapper: ISearchMapper      = useSearchMapper();
    const navigate                   = useNavigate();
    const { pathname, search, hash } = useLocation();

    const currentUrl = useMemo(() => {
        return `${ pathname }${ search }${ hash }`;
    }, [ pathname, search, hash ]);

    const getUrl = useCallback((url: string, options: UrlSearch) => {
        let search: string[] = [];

        if (Object.keys(options.items).length) {
            search.push(`${ URL_ITEMS }=${ mapper.items.serialize(options.items) }`);
        }

        if (options.limit !== DEFAULT_LIMIT) {
            search.push(`${ URL_LIMIT }=${ options.limit.toString() }`);
        }

        if (options.page !== DEFAULT_PAGE) {
            search.push(`${ URL_PAGE }=${ options.page.toString() }`);
        }

        if (options.sort.length === 2) {
            search.push(`${ URL_SORT }=${ mapper.sort.serialize(options.sort) }`);
        }

        const navigateUrl: string = url + (search.length
                                           ? '?' + search.join('&')
                                           : '');

        return navigateUrl;
    }, []);

    const navigateCallback = useCallback((url: string, options: UrlSearch) => {
        const newUrl: string = getUrl(url, options);
        if (newUrl !== currentUrl) {
            navigate(getUrl(url, options));
        }
    }, [ navigate, getUrl, currentUrl ]);

    return useMemo(() => ({
        navigate: navigateCallback,
        url     : getUrl,
    }), [ navigateCallback, getUrl ]);
};