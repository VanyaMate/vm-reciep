import React, { useCallback } from 'react';
import css from './ProductCard.module.scss';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductCardHeader
    from '@/components/_product/ProductCard/ProductCardHeader/ProductCardHeader.tsx';
import ProductCardInfo
    from '@/components/_product/ProductCard/ProductCardInfo/ProductCardInfo.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import WishlistButton
    from '@/components/_product/WishlistButton/WishlistButton.tsx';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import AddToCartButton
    from '@/components/_product/AddToCartButton/AddToCartButton.tsx';
import { ICartController } from '@/hooks/useCart.ts';
import { IWishlistController } from '@/hooks/useWishlist.ts';


export type AddToCartCallback = (productId: string) => Promise<any>;
export type WishlistCallback = (productId: string) => Promise<any>;

export type ProductCardProps = {
    product: Product;
    cartController: ICartController;
    wishlistController: IWishlistController;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const {
              product,
              wishlistController,
              cartController,
          } = props;

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
                            wishlistController &&
                            <WishlistButton
                                productId={ product.barcode.toString() }
                                wishlistController={ wishlistController }
                            />
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
                cartController &&
                <AddToCartButton
                    productId={ product.barcode.toString() }
                    cartController={ cartController }
                />
            }
        </Box>
    );
};

export default ProductCard;