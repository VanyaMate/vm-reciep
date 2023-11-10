import React, { useCallback } from 'react';
import css from './ProductCard.module.scss';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductCardHeader
    from '@/components/_common/_content/_product/ProductCard/ProductCardHeader/ProductCardHeader.tsx';
import ProductCardInfo
    from '@/components/_common/_content/_product/ProductCard/ProductCardInfo/ProductCardInfo.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';


export type AddToCartCallback = (productId: string) => Promise<any>;
export type AddToWishlistCallback = (productId: string) => Promise<any>;

export type ProductCardProps = {
    product: Product;
    onAddToCart?: AddToCartCallback;
    onAddToWishlist?: AddToWishlistCallback;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const { product, onAddToWishlist, onAddToCart } = props;
    const onAddToWishlistHandler                    = useCallback(async () => {
        if (onAddToWishlist) {
            return onAddToWishlist(product.barcode.toString());
        }
    }, [ onAddToWishlist, product ]);
    const onAddToCartHandler                        = useCallback(() => {
        if (onAddToCart) {
            return onAddToCart(product.barcode.toString());
        }
    }, [ onAddToCart, product ]);

    return (
        <Box className={ css.container }>
            <ProductCardHeader
                images={ [ product.image_url ] }
                stock={ { title: 'sale', id: 'sale', color: 'red' } }
                onAddToWishlist={ onAddToWishlist && onAddToWishlistHandler }
            />
            <ProductCardInfo
                title={ product.product_name }
                description={ product.description }
                price={ product.price }
                discount={ 0 }
                currency={ 'Руб' }
            />
            {
                onAddToCart && <Button
                    styleType={ 'primary' }
                    onClick={ onAddToCartHandler }
                >
                    Добавить в корзину
                </Button>
            }
        </Box>
    );
};

export default ProductCard;