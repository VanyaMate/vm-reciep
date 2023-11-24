import { IMapper } from '@/helpers/mapper/mapper.interface.ts';
import { SortOptions } from '@/hooks/search/useSearch.ts';


export class SearchSortMapper implements IMapper<SortOptions, string> {
    deserialize (data: string): SortOptions {
        if (data) {
            return data.split(',') as SortOptions;
        } else {
            return [];
        }
    }

    serialize (data: SortOptions): string {
        return data.join(',');
    }

}