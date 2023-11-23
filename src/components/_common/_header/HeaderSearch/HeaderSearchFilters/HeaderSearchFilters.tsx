import React from 'react';
import {
    ISearchController,
    SortOptions,
    UrlSearch,
} from '@/hooks/search/useSearch.ts';


export type HeaderSearchFiltersProps = {
    data: UrlSearch;
    controller: ISearchController;
}

const HeaderSearchFilters: React.FC<HeaderSearchFiltersProps> = (props) => {
    const { data, controller } = props;

    return (
        <div>
            <input
                value={ data.limit }
                placeholder={ 'limit' }
                onChange={ (event) => controller.setLimit(+event.target.value) }
                type={ 'number' }
            />
            <input
                value={ data.page }
                placeholder={ 'page' }
                onChange={ (event) => controller.setPage(+event.target.value) }
                type={ 'number' }
            />
            <select value={ data.sort.join(',') }
                    onChange={ (event) => controller.setSort(event.target.value.split(',') as SortOptions) }>
                <option value={ '' }>Не выбрано</option>
                <option value={ 'price,asc' }>Дешевле</option>
                <option value={ 'price,desc' }>Дороже</option>
            </select>
        </div>
    );
};

export default HeaderSearchFilters;