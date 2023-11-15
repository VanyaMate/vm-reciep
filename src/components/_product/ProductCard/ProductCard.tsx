import React, { useCallback } from 'react';
import css from './ProductCard.module.scss';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductCardHeader
    from '@/components/_product/ProductCard/ProductCardHeader/ProductCardHeader.tsx';
import ProductCardInfo
    from '@/components/_product/ProductCard/ProductCardInfo/ProductCardInfo.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import WishlistButton
    from '@/components/_product/WishlistButton/WishlistButton.tsx';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import AddToCartButton
    from '@/components/_product/AddToCartButton/AddToCartButton.tsx';


export type AddToCartCallback = (productId: string) => Promise<any>;
export type WishlistCallback = (productId: string) => Promise<any>;

export type ProductCardProps = {
    product: Product;
    inWishlist?: boolean;
    inCart?: number;
    onAddToCart?: AddToCartCallback;
    onAddToWishlist?: WishlistCallback;
    onRemoveFromWishlist?: WishlistCallback;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const {
              product,
              onAddToWishlist,
              onAddToCart,
              onRemoveFromWishlist,
              inWishlist,
              inCart,
          } = props;

    const onAddToWishlistHandler      = useCallback(async () => {
        if (onAddToWishlist) {
            return onAddToWishlist(product.barcode.toString());
        }
    }, [ onAddToWishlist, product ]);
    const onRemoveFromWishlistHandler = useCallback(async () => {
        if (onRemoveFromWishlist) {
            return onRemoveFromWishlist(product.barcode.toString());
        }
    }, [ onAddToWishlist, product ]);
    const onAddToCartHandler          = useCallback(async () => {
        if (onAddToCart) {
            return onAddToCart(product.barcode.toString());
        }
    }, [ onAddToCart, product ]);

    return (
        <Box className={ css.container }>
            <ProductCardHeader
                images={ [ product.image_url ] }
                top={
                    <>
                        {
                            product.brand_name &&
                            <Tag backgroundColor={ '#f55' }
                                 textColor={ '#fff' }>
                                { product.brand_name }
                            </Tag>
                        }
                        {
                            onAddToWishlist &&
                            <WishlistButton
                                onAddToWishlist={ onAddToWishlistHandler }
                                onRemoveFromWishlist={ onRemoveFromWishlistHandler }
                                inWishlist={ inWishlist }/>
                        }
                    </>
                }
            />
            <ProductCardInfo
                productId={ product.barcode.toString() }
                title={ product.product_name }
                description={ product.description }
                price={ product.price }
                discount={ 0 }
                currency={ 'Руб' }
            />
            {
                onAddToCart &&
                <AddToCartButton
                    onAddToCart={ onAddToCartHandler }
                    amount={ inCart ?? 0 }
                />
            }
        </Box>
    );
};

export default ProductCard;