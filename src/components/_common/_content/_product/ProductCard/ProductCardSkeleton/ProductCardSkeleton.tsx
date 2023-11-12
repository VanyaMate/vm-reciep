import React from 'react';
import css from '../ProductCard.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import ProductCardHeader
    from '@/components/_common/_content/_product/ProductCard/ProductCardHeader/ProductCardHeader.tsx';
import ProductCardInfo
    from '@/components/_common/_content/_product/ProductCard/ProductCardInfo/ProductCardInfo.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';


const ProductCardSkeleton = () => {
    return (
        <Box className={ css.container }>
            <ProductCardHeader
                images={ [ 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg' ] }
                top={ <></> }
            />
            <ProductCardInfo
                title={ 'default' }
                description={ 'default' }
                price={ 0 }
                discount={ 0 }
                currency={ 'Руб' }
                skeleton
            />
            <Button skeleton>Добавить в корзину</Button>
        </Box>
    );
};

export default ProductCardSkeleton;