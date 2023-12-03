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
import ListWithValues
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
import { Brand } from '@/modules/api/brand/brand-service.types.ts';
import ProductShortInfo
    from '@/components/_product/ProductView/ProductShortInfo/ProductShortInfo.tsx';
import ProductInfo
    from '@/components/_product/ProductView/ProductInfo/ProductInfo.tsx';


export type ProductViewProps = {
    product: Product;
    brand: Brand | null;
    brandUrl: string;
    brandLoading: boolean;
    searchController: ISearchController;
    wishlistController: IWishlistController;
    cartController: ICartController;
}

const ProductView: React.FC<ProductViewProps> = (props) => {
    const {
              product,
              brand,
              brandUrl,
              brandLoading,
              searchController,
              wishlistController,
              cartController,
          }                           = props;
    const priceData: ProductPriceData = useProductPriceCalculator({
        price       : product.price,
        discount    : product.discount,
        discountType: product.discountType,
    });

    return (
        <Box className={ css.container }>
            <ProductBreadcrumbs
                product={ product }
                searchController={ searchController }
            />
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
                            {
                                product.brand_name &&
                                <Tag backgroundColor={ '#fff' }
                                     textColor={ '#111' }>
                                    { product.brand_name }
                                </Tag>
                            }
                            {
                                priceData.discountPercent ?
                                <Tag backgroundColor={ '#f55' }
                                     textColor={ '#fff' }>
                                    - { priceData.discountPercent } %
                                </Tag> : ''
                            }
                        </div>
                        <ProductSlider
                            images={ [
                                ...product.images,
                                product.image_url,
                                product.image_url,
                                product.image_url,
                                product.image_url,
                                product.image_url,
                                product.image_url,
                                product.image_url,
                                product.image_url,
                                product.image_url,
                            ] }
                        />
                    </div>
                    <div className={ css.right }>
                        <div className={ css.product }>
                            {
                                brand &&
                                <ProductBrand
                                    url={ brandUrl }
                                    icon={ brand.avatar }
                                    title={ brand.title }
                                    original
                                />
                            }
                            <ProductShortInfo product={ product }/>
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
                    <ProductInfo product={ product }/>
                </div>
            </div>
        </Box>
    );
};

export default React.memo(ProductView);