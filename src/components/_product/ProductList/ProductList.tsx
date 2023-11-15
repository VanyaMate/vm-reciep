import React from 'react';
import css from './ProductList.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';


export type ProductListProps = {
    children: React.ReactNode;
}

const ProductList: React.FC<ProductListProps> = (props) => {
    const { children } = props;

    return (
        <Box className={ css.container }>
            { children }
        </Box>
    );
};

export default ProductList;