import React from 'react';
import { Stock } from '@/modules/api/stock/stock-service.types.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductCardHeader.module.scss';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import WishlistButton
    from '@/components/_product/WishlistButton/WishlistButton.tsx';
import { cn } from '@/helpers/classname.react.ts';


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
            <div className={ cn(css.side, css.left) }>
                { topLeft }
            </div>
            <div className={ cn(css.side, css.right) }>
                { topRight }
            </div>
        </Box>
    );
};

export default ProductCardHeader;