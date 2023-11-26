import React, { useMemo } from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductView.module.scss';
import ProductSlider
    from '@/components/_product/ProductSlider/ProductSlider.tsx';
import { Divider, Typography } from 'antd';
import type { DescriptionsProps } from 'antd';
import ProductBreadcrumbs
    , {
    BreadcrumbItem,
} from '@/components/_product/ProductView/ProductBreadcrumbs/ProductBreadcrumbs.tsx';
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
import ProductBrand
    from '@/components/_product/ProductView/ProductBrand/ProductBrand.tsx';
import ProductShortInfo
    from '@/components/_product/ProductView/ProductShortInfo/ProductShortInfo.tsx';
import Tag from '@/components/_ui/_container/Tag/Tag.tsx';
import ProductFullDescriptionList
    from '@/components/_product/ProductView/ProductFullDescriptionList/ProductFullDescriptionList.tsx';
import ProductPurchaseBlock
    from '@/components/_product/ProductView/ProductPurchaseBlock/ProductPurchaseBlock.tsx';
import {
    ProductPriceData, useProductPriceCalculator,
} from '@/hooks/components/useProductPriceCalculator.ts';
import {
    getCategoryPageUrl,
    getHomePageUrl,
    PageType,
} from '@/pages/getPage.ts';
import { ISearchController } from '@/hooks/search/useSearch.ts';


export type ProductViewProps = {
    product: Product;
    searchController: ISearchController;
    wishlistController: IWishlistController;
    cartController: ICartController;
}

const ProductView: React.FC<ProductViewProps> = (props) => {
    const {
              product,
              searchController,
              wishlistController,
              cartController,
          }                                                 = props;
    const priceData: ProductPriceData                       = useProductPriceCalculator({
        price       : product.price,
        discount    : product.discount,
        discountType: product.discountType,
        currency    : '₽',
    });
    const shortDescriptionItems: DescriptionsProps['items'] = useMemo(() => {
        return [
            {
                key     : '1',
                label   : 'Калории',
                children: product.calories,
            },
            {
                key     : '10',
                label   : 'Аллергены',
                children: product.allergens,
            },
            {
                key     : '2',
                label   : 'Жиры',
                children: product.fat,
            },
            {
                key     : '3',
                label   : 'Витамин "А"',
                children: product.vitamin_a,
            },
            {
                key     : '4',
                label   : 'Витамин "С"',
                children: product.vitamin_c,
            },
            {
                key     : '5',
                label   : 'Кальций',
                children: product.calcium,
            },
            {
                key     : '6',
                label   : 'Железо',
                children: product.iron,
            },
        ];
    }, [ product ]);
    const descriptionItems: DescriptionsProps['items']      = useMemo(() => [
        {
            key     : '3',
            label   : 'Пищевая ценность',
            children: product.nutritional_facts,
            span    : 4,
        },
        {
            key     : '5',
            label   : 'Ингридиенты',
            children: product.ingredients,
            span    : 4,
        },
        {
            key     : '10',
            label   : 'Страна',
            children: product.manufacturer,
            span    : 2,
        },
        {
            key     : '2',
            label   : 'Производитель',
            children: product.manufacturer,
            span    : 2,
        },
        {
            key     : '16',
            label   : 'Витамин "А"',
            children: product.vitamin_a,
            span    : 2,
        },
        {
            key     : '17',
            label   : 'Витамин "С"',
            children: product.vitamin_c,
            span    : 2,
        },
        {
            key     : '6',
            label   : 'Калории',
            children: product.calories,
            span    : 1,
        },
        {
            key     : '7',
            label   : 'Жиры',
            children: product.fat,
            span    : 1,
        },
        {
            key     : '8',
            label   : 'Углеводы',
            children: product.carbohydrates,
            span    : 1,
        },
        {
            key     : '18',
            label   : 'Кальций',
            children: product.calcium,
            span    : 1,
        },
        {
            key     : '1',
            label   : 'Вес',
            children: product.weight,
            span    : 1,
        },
        {
            key     : '9',
            label   : 'Вес нетто',
            children: product.net_weight,
            span    : 1,
        },
        {
            key     : '11',
            label   : 'Размер порции',
            children: product.serving_size,
            span    : 1,
        },

        {
            key     : '4',
            label   : 'Аллергены',
            children: product.allergens,
            span    : 1,
        },
        {
            key     : '13',
            label   : 'Протеин',
            children: product.protein,
            span    : 1,
        },
        {
            key     : '14',
            label   : 'Сахар',
            children: product.sugar,
            span    : 1,
        },
        {
            key     : '15',
            label   : 'Волокно',
            children: product.fiber,
            span    : 1,
        }, {
            key     : '19',
            label   : 'Железо',
            children: product.iron,
            span    : 1,
        },
    ], [ product ]);

    const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
        const list: BreadcrumbItem[] = [
            {
                url  : searchController.getUrl(`/${ PageType.PRODUCTS }`),
                label: 'Главная',
            },
        ];

        if (product?.category) {
            list.push({
                url  : searchController.getUrl(`/${ PageType.PRODUCTS }`, {
                    items: {
                        category: {
                            value: product.category,
                            type : 'equal',
                        },
                    },
                }),
                label: product.category,
            });
        }
        return list;
    }, [ product, searchController ]);

    return (
        <Box className={ css.container }>
            <ProductBreadcrumbs items={ breadcrumbs }/>
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
            <Divider dashed style={ { marginTop: 4, marginBottom: 4 } }/>
            <div className={ css.bottom }>
                <div className={ css.top }>
                    <div className={ css.left }>
                        <div className={ css.tags }>
                            <Tag backgroundColor={ '#fff' }
                                 textColor={ '#111' }>
                                { product.brand_name }
                            </Tag>
                            {
                                priceData.discount ?
                                <Tag backgroundColor={ '#f55' }
                                     textColor={ '#fff' }>
                                    - { priceData.discountPercent } %
                                </Tag> : ''
                            }
                        </div>
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
                            <ProductBrand
                                url={ searchController.getClearUrl(`/${ PageType.PRODUCTS }`, {
                                    items: {
                                        brand_name: {
                                            value: product.brand_name,
                                            type : 'equal',
                                        },
                                    },
                                }) }
                                icon={ product.brand }
                                title={ product.brand_name }
                                original
                            />
                            <ProductShortInfo
                                items={ shortDescriptionItems }
                            />
                            <Typography.Paragraph
                                ellipsis={ {
                                    rows      : 3,
                                    expandable: true,
                                } }
                            >
                                { product.description }
                            </Typography.Paragraph>
                        </div>
                        <ProductPurchaseBlock
                            productId={ product.barcode.toString() }
                            cartController={ cartController }
                            price={ priceData }
                            className={ css.purchase }
                        />
                    </div>
                </div>
                <div>
                    <ProductFullDescriptionList
                        items={ descriptionItems }
                    />
                </div>
            </div>
        </Box>
    );
};

export default React.memo(ProductView);