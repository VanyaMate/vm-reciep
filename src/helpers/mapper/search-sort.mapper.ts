import { IMapper } from '@/helpers/mapper/mapper.interface.ts';
import {
    SortOptions,
} from '@/components/_common/_header/HeaderSearch/HeaderSearchFilters/HeaderSearchFilters.tsx';


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