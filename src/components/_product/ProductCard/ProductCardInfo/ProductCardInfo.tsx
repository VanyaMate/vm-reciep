import React from 'react';
import css from './ProductCardInfo.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { Link } from 'react-router-dom';
import ProductPrice
    from '@/components/_product/ProductView/ProductPriceByData/ProductPriceByData.tsx';
import {
    ProductPriceData, useProductPriceCalculator,
} from '@/hooks/components/useProductPriceCalculator.ts';
import { getProductPageUrl } from '@/pages/getPage.ts';


export type ProductCardInfoProps = {
    productId: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    currency: string;
    skeleton?: boolean;
}

const ProductCardInfo: React.FC<ProductCardInfoProps> = (props) => {
    const {
              title,
              description,
              price,
              discount,
              currency,
              productId,
              skeleton,
          }                           = props;
    const priceData: ProductPriceData = useProductPriceCalculator({
        price       : price,
        discount,
        discountType: 'percent',
    });

    return (
        <div className={ cn(css.container, skeleton && css.skeleton) }>
            <Link to={ getProductPageUrl(productId) }
                  className={ css.title }>{ title }</Link>
            <p className={ css.description }>{ description }</p>
            <ProductPrice priceData={ priceData } small/>
        </div>
    );
};

export default ProductCardInfo;