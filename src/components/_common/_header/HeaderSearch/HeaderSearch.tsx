import React from 'react';
import css from './HeaderSearch.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';


const HeaderSearch = () => {
    return (
        <Box className={ css.container }>
            Categories | Search | Filters
        </Box>
    );
};

export default HeaderSearch;