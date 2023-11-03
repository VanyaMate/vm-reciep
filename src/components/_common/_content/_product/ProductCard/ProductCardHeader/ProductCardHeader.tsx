import React from 'react';
import { Stock } from '@/modules/api/stock/stock-service.types.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductCardHeader.module.scss';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import WishlistButton
    from '@/components/_common/_content/_product/WishlistButton/WishlistButton.tsx';


export type ProductCardHeaderProps = {
    images: string[];
    stock: Stock;
    onAddToWishlist: () => Promise<any>;
}

const ProductCardHeader: React.FC<ProductCardHeaderProps> = (props) => {
    const { images, stock, onAddToWishlist } = props;

    return (
        <Box style={ { backgroundImage: `url("${ images[0] }")` } }
             className={ css.container }>
            <Tag backgroundColor={ stock.color } textColor={ '#fff' }>
                sale
            </Tag>
            <WishlistButton/>
        </Box>
    );
};

export default ProductCardHeader;