import React from 'react';
import css from './ProductCard.module.scss';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductCardHeader
    from '@/components/_product/ProductCard/ProductCardHeader/ProductCardHeader.tsx';
import ProductCardInfo
    from '@/components/_product/ProductCard/ProductCardInfo/ProductCardInfo.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import { getRandomInt } from '@/helpers/random.ts';
import { Link } from 'react-router-dom';
import { cn } from '@/helpers/classname.react.ts';
import { getProductPageUrl } from '@/pages/getPage.ts';
import ProductPrice
    from '@/components/_product/ProductView/ProductPriceByData/ProductPriceByData.tsx';
import {
    ProductPriceData,
    useProductPriceCalculator,
} from '@/hooks/components/useProductPriceCalculator.ts';


export type ProductCardProps = {
    product: Product;
    url: string;
    skeleton?: boolean;
    topLeft?: React.ReactNode;
    topRight?: React.ReactNode;
    footer?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const {
              product,
              url,
              skeleton,
              topLeft,
              topRight,
              footer,
          } = props;

    const priceData: ProductPriceData = useProductPriceCalculator({
        price       : product.price,
        discount    : product.discount,
        discountType: product.discountType,
    });

    return (
        <Box className={ css.container }>
            <ProductCardHeader
                images={ [ product.image_url ] }
                topLeft={ topLeft }
                topRight={ topRight }
            />
            <div className={ cn(css.bottom, skeleton && css.skeleton) }>
                <Link to={ url }
                      className={ css.title }>{ product.product_name }</Link>
                <p className={ css.description }>{ product.description }</p>
                <ProductPrice priceData={ priceData } small/>
            </div>
            { footer }
        </Box>
    );
};

export default React.memo(ProductCard);