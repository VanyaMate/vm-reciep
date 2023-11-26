import React from 'react';
import { Stock } from '@/modules/api/stock/stock-service.types.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductCardHeader.module.scss';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import WishlistButton
    from '@/components/_product/WishlistButton/WishlistButton.tsx';


export type ProductCardHeaderProps = {
    images: string[];
    topLeft: React.ReactNode;
    topRight: React.ReactNode;
}

const ProductCardHeader: React.FC<ProductCardHeaderProps> = (props) => {
    const { images, topLeft, topRight } = props;

    return (
        <Box
            style={ { backgroundImage: `url("${ images[0] }")` } }
            className={ css.container }
        >
            <div className={ css.side }>
                { topLeft }
            </div>
            <div className={ css.side }>
                { topRight }
            </div>
        </Box>
    );
};

export default ProductCardHeader;