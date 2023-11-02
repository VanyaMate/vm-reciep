import React from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';


export type ProductCardProps = {
    product: Product;
    addToCartButton: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { product, addToCartButton } = props;

    return (
        <div>
            [{ product.barcode }]
            <h2>{ product.product_name }</h2>
            <p>{ product.description }</p>
            <p>{ product.price }</p>
            { addToCartButton }
        </div>
    );
};

export default ProductCard;