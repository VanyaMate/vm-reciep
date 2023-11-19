import React, { useCallback } from 'react';
import css from './HeaderSearch.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import HeaderSearchInput
    from '@/components/_common/_header/HeaderSearch/HeaderSearchInput/HeaderSearchInput.tsx';
import HeaderSearchFilters
    from '@/components/_common/_header/HeaderSearch/HeaderSearchFilters/HeaderSearchFilters.tsx';
import { SearchParam } from '@/hooks/useProductSearchParams.ts';


export interface ISearchController {
    set (type: SearchParam, value: string): void;

    remove (type: SearchParam): void;
}

export type HeaderSearchProps = {
    controller: ISearchController;
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
    const { controller } = props;
    const onInput        = useCallback((search: string) => {
        controller.set(SearchParam.SEARCH, search);
    }, [ controller ]);
    const onChangeFilter = useCallback((type: SearchParam, value: string) => {
        if (type === SearchParam.SORT) {
            if (value !== '') {
                controller.set(SearchParam.SORT, value);
            } else {
                controller.remove(SearchParam.SORT);
            }
            controller.remove(SearchParam.OFFSET);
        } else if (type === SearchParam.OFFSET) {
            if (value !== '0') {
                controller.set(SearchParam.OFFSET, value);
            } else {
                controller.remove(SearchParam.OFFSET);
            }
        } else if (type === SearchParam.LIMIT) {
            controller.set(SearchParam.LIMIT, value);
        }
    }, [ controller ]);

    return (
        <Box className={ css.container }>
            <HeaderSearchInput/>
            <HeaderSearchFilters onChangeFilter={ onChangeFilter }/>
        </Box>
    );
};

export default HeaderSearch;