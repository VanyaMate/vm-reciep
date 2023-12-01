import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductsTile.module.scss';


export type ProductsTileProps = {
    children: React.ReactNode;
}

const ProductsTile: React.FC<ProductsTileProps> = (props) => {
    const { children } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(ProductsTile);