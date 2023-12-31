import React from 'react';
import css from './HeaderSearch.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import HeaderSearchInput
    from '@/components/_common/_header/HeaderSearch/HeaderSearchInput/HeaderSearchInput.tsx';
import HeaderSearchFilters
    from '@/components/_common/_header/HeaderSearch/HeaderSearchFilters/HeaderSearchFilters.tsx';
import { ISearchController, UrlSearch } from '@/hooks/search/useSearch.ts';


export type HeaderSearchProps = {
    data: UrlSearch;
    controller: ISearchController;
}

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
    const { data, controller } = props;

    return (
        <Box className={ css.container }>
            <HeaderSearchInput
                value={ data.items.product_name?.value ?? '' }
                onChange={ (value) => {
                    if (value) {
                        data.items.product_name = {
                            value, type: 'match',
                        };
                    } else {
                        delete data.items.product_name;
                    }

                    controller.setItems(data.items);
                } }
            />
            <HeaderSearchFilters data={ data } controller={ controller }/>
        </Box>
    );
};

export default HeaderSearch;