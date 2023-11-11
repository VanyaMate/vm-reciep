import React from 'react';
import { Stock } from '@/modules/api/stock/stock-service.types.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductCardHeader.module.scss';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import WishlistButton
    from '@/components/_common/_content/_product/WishlistButton/WishlistButton.tsx';


export type ProductCardHeaderProps = {
    images: string[];
    top: React.ReactNode;
}

const ProductCardHeader: React.FC<ProductCardHeaderProps> = (props) => {
    const { images, top } = props;

    return (
        <Box
            style={ { backgroundImage: `url("${ images[0] }")` } }
            className={ css.container }
        >
            { top }
        </Box>
    );
};

export default ProductCardHeader;