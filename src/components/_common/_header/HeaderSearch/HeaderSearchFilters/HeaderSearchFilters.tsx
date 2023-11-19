import React, { useEffect, useState } from 'react';
import { SearchParam } from '@/hooks/useProductSearchParams.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';


export type OnChangeFilterCallback = (type: SearchParam, value: string) => any;
export type SortOptions = [ keyof Product, 'asc' | 'desc' ] | [];
export type HeaderSearchFiltersProps = {
    onChangeFilter: OnChangeFilterCallback;
}

const HeaderSearchFilters: React.FC<HeaderSearchFiltersProps> = (props) => {
    const defaultLimit: number  = 30;
    const { onChangeFilter }    = props;
    const [ limit, setLimit ]   = useState<number>(defaultLimit);
    const [ offset, setOffset ] = useState<number>(0);
    const [ sort, setSort ]     = useState<SortOptions>([]);

    useEffect(() => {
        if (limit > 0 && limit <= 50) {
            onChangeFilter(SearchParam.LIMIT, limit.toString());
        }
    }, [ limit ]);

    useEffect(() => {
        onChangeFilter(SearchParam.OFFSET, offset.toString());
    }, [ offset ]);

    useEffect(() => {
        onChangeFilter(SearchParam.SORT, sort.join(','));
    }, [ sort ]);

    return (
        <div>
            <input placeholder={ 'limit' }
                   value={ limit || '' }
                   type={ 'number' }
                   onChange={ (e) => setLimit(+e.target.value) }/>
            <input placeholder={ 'offset' }
                   value={ offset || '' }
                   type={ 'number' }
                   onChange={ (e) => setOffset(+e.target.value) }/>
            <select
                onChange={ (e) => setSort(e.target.value.split(',') as SortOptions) }>
                <option defaultChecked value={ '' }>Без сортировки</option>
                <option value={ 'price,asc' }>Самое дешевое</option>
                <option value={ 'price,desc' }>Самое дорогое</option>
            </select>
        </div>
    );
};

export default HeaderSearchFilters;