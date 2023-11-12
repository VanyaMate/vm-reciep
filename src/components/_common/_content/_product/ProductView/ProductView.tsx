import React from 'react';
import {
    ProductCardProps,
} from '@/components/_common/_content/_product/ProductCard/ProductCard.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductView.module.scss';
import ProductSlider
    from '@/components/_common/_content/_product/ProductSlider/ProductSlider.tsx';


const ProductView: React.FC<ProductCardProps> = (props) => {
    const { product } = props;

    return (
        <Box className={ css.container }>
            <div className={ css.top }>
                <div className={ css.left }>
                    <ProductSlider
                        images={ [
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            ...product.images,
                        ] }
                    />
                </div>
                <div className={ css.right }>
                    <h1>{ product.product_name }</h1>
                    <p>{ product.description }</p>
                </div>
            </div>
        </Box>
    );
};

export default React.memo(ProductView);