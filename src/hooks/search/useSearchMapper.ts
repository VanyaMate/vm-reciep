import { IMapper } from '@/helpers/mapper/mapper.interface.ts';
import { useMemo } from 'react';
import { SearchSortMapper } from '@/helpers/mapper/search-sort.mapper.ts';
import { SearchItemsMapper } from '@/helpers/mapper/search-items.mapper.ts';
import { SortOptions, UrlSearchItems } from '@/hooks/search/useSearch.ts';


export interface ISearchMapper {
    sort: IMapper<SortOptions, string>;
    items: IMapper<UrlSearchItems, string>;
}

export const useSearchMapper = function (): ISearchMapper {
    const sortMapper: IMapper<SortOptions, string>     = useMemo(() => new SearchSortMapper(), []);
    const itemsMapper: IMapper<UrlSearchItems, string> = useMemo(() => new SearchItemsMapper(), []);

    return useMemo(() => ({
        sort : sortMapper,
        items: itemsMapper,
    }), []);
};