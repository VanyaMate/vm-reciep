import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductPurchaseBlock.module.scss';
import { ICartController } from '@/hooks/useCart.ts';
import {
    ProductPriceData,
} from '@/hooks/components/useProductPriceCalculator.ts';
import AddToCartButton
    from '@/components/_product/AddToCartButton/AddToCartButton.tsx';


export type ProductPurchaseBlock = {
    productId: string;
    price: ProductPriceData;
    cartController: ICartController;
}

const ProductPurchaseBlock: React.FC<ProductPurchaseBlock> = (props) => {
    const { price, productId, cartController } = props;

    return (
        <Box className={ css.container }>
            {
                price.price
            }
            <AddToCartButton
                productId={ productId }
                cartController={ cartController }
                block
            />
        </Box>
    );
};

export default ProductPurchaseBlock;