import React from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import css from './ProductList.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import ProductCard
    from '@/components/_common/_content/_product/ProductCard/ProductCard.tsx';


export type ProductListProps = {
    products: Product[];
    onAddToCart?: (productId: string) => Promise<any>;
    onAddToWishlist?: (productId: string) => Promise<any>;
}

const ProductList: React.FC<ProductListProps> = (props) => {
    const { products, onAddToCart, onAddToWishlist } = props;

    return (
        <Box className={ css.container }>
            {
                products.map((product) => (
                    <ProductCard product={ product }
                                 key={ product.barcode }
                                 onAddToCart={ onAddToCart }
                                 onAddToWishlist={ onAddToWishlist }
                    />
                ))
            }
        </Box>
    );
};

export default ProductList;