import React from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductCard from '@/components/_product/ProductCard/ProductCard.tsx';


export type ProductTileProps = {
    product: Product;
}

const ProductTile: React.FC<ProductTileProps> = (props) => {
    const { product } = props;

    return (
        <ProductCard
            product={ product }
            url={ '#' }
        />
    );
};

export default React.memo(ProductTile);