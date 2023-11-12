import React from 'react';
import {
    ProductCardProps,
} from '@/components/_common/_content/_product/ProductCard/ProductCard.tsx';


const ProductView: React.FC<ProductCardProps> = (props) => {
    const { product } = props;

    return (
        <div>
            <h1>{ product.product_name }</h1>
            <p>{ product.description }</p>
        </div>
    );
};

export default React.memo(ProductView);