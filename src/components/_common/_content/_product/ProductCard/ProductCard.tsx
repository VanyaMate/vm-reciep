import React from 'react';
import css from './ProductCard.module.scss';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductCardHeader
    from '@/components/_common/_content/_product/ProductCard/ProductCardHeader/ProductCardHeader.tsx';
import ProductCardInfo
    from '@/components/_common/_content/_product/ProductCard/ProductCardInfo/ProductCardInfo.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';


export type ProductCardProps = {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { product } = props;

    return (
        <Box className={ css.container }>
            <ProductCardHeader
                images={ [ product.image_url] }
                stock={ { title: 'sale', id: 'sale', color: 'red' } }
                onAddToWishlist={ async () => {
                } }
            />
            <ProductCardInfo
                title={ product.product_name }
                description={ product.description }
                price={ product.price }
                discount={ 0 }
                currency={ 'Руб' }
            />
        </Box>
    );
};

export default ProductCard;