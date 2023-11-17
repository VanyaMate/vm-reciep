import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductPurchaseBlock.module.scss';
import { ICartController } from '@/hooks/useCart.ts';
import {
    ProductPriceData,
} from '@/hooks/components/useProductPriceCalculator.ts';
import AddToCartButton
    from '@/components/_product/AddToCartButton/AddToCartButton.tsx';
import ProductPrice
    from '@/components/_product/ProductView/ProductPrice/ProductPrice.tsx';
import { cn } from '@/helpers/classname.react.ts';


export type ProductPurchaseBlock = {
    productId: string;
    className?: string;
    price: ProductPriceData;
    cartController: ICartController;
}

const ProductPurchaseBlock: React.FC<ProductPurchaseBlock> = (props) => {
    const { price, productId, cartController, className } = props;

    return (
        <Box className={ cn(css.container, className) }>
            <ProductPrice priceData={ price }/>
            <AddToCartButton
                productId={ productId }
                cartController={ cartController }
                block
            />
        </Box>
    );
};

export default ProductPurchaseBlock;