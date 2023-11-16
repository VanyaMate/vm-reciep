import React, { useMemo } from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductView.module.scss';
import ProductSlider
    from '@/components/_product/ProductSlider/ProductSlider.tsx';
import { Descriptions, Rate, Typography } from 'antd';
import type { DescriptionsProps } from 'antd';
import AddToCartButton
    from '@/components/_product/AddToCartButton/AddToCartButton.tsx';
import ProductBreadcrumbs
    from '@/components/_product/ProductView/ProductBreadcrumbs/ProductBreadcrumbs.tsx';
import ProductTitle
    from '@/components/_product/ProductView/ProductTitle/ProductTitle.tsx';
import ProductHeaderNavigation
    from '@/components/_product/ProductView/ProductHeaderNavigation/ProductHeaderNavigation.tsx';
import ProductRatingWidget
    from '@/components/_product/ProductView/ProductHeaderNavigation/ProductRatingWidget/ProductRatingWidget.tsx';
import WishlistButton
    from '@/components/_product/WishlistButton/WishlistButton.tsx';
import { IWishlistController } from '@/hooks/useWishlist.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { ICartController } from '@/hooks/useCart.ts';


export type ProductViewProps = {
    product: Product,
    wishlistController: IWishlistController,
    cartController: ICartController,
}

const ProductView: React.FC<ProductViewProps> = (props) => {
    const { product, wishlistController, cartController } = props;
    const descriptionItems: DescriptionsProps['items']    = useMemo(() => [
        {
            key     : '1',
            label   : 'Вес',
            children: product.weight,
            span    : 3,
        },
        {
            key     : '2',
            label   : 'manufacturer',
            children: product.manufacturer,
            span    : 3,
        },
        {
            key     : '3',
            label   : 'nutritional_facts',
            children: product.nutritional_facts,
            span    : 3,
        },
        {
            key     : '4',
            label   : 'allergens',
            children: product.allergens,
            span    : 3,
        },
        {
            key     : '5',
            label   : 'ingredients',
            children: product.ingredients,
            span    : 3,
        },
        {
            key     : '6',
            label   : 'calories',
            children: product.calories,
            span    : 3,
        },
        {
            key     : '7',
            label   : 'fat',
            children: product.fat,
            span    : 3,
        },
        {
            key     : '8',
            label   : 'carbohydrates',
            children: product.carbohydrates,
            span    : 3,
        },
    ], [ product ]);

    /**
     * TODO: /category/ заменить на константу
     */
    return (
        <Box className={ css.container }>
            <ProductBreadcrumbs items={ [
                {
                    url  : '/',
                    label: 'Главная',
                },
                {
                    url  : `/category/${ product.category }`,
                    label: product.category,
                },
            ] }/>
            <ProductTitle>{ product.product_name }</ProductTitle>
            <ProductHeaderNavigation
                left={ <>
                    <ProductRatingWidget rating={ product.rating }
                                         reviews={ product.reviews }/>
                    <WishlistButton showText
                                    productId={ product.barcode.toString() }
                                    wishlistController={ wishlistController }
                    />
                </> }
                right={ <>
                    <div>Код товара: { product.barcode }</div>
                </> }
            />
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
                    <div className={ css.product }>
                        <h2>{ product.brand_name }</h2>
                        <p>Оригинальный товар</p>
                        <Typography.Paragraph
                            ellipsis={ {
                                rows      : 3,
                                expandable: true,
                            } }
                        >
                            { product.description }
                        </Typography.Paragraph>
                    </div>
                    <Box className={ css.purchase }>
                        {
                            cartController &&
                            <AddToCartButton
                                productId={ product.barcode.toString() }
                                cartController={ cartController }
                                block
                            />
                        }
                    </Box>
                </div>
            </div>
            <div>
                <Descriptions
                    title={ 'Подробная информация' }
                    bordered
                    size={ 'small' }
                    items={ descriptionItems }
                />
            </div>
        </Box>
    );
};

export default React.memo(ProductView);