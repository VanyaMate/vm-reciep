import React from 'react';
import {
    ProductPriceData,
} from '@/hooks/components/useProductPriceCalculator.ts';
import css from './ProductPrice.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ProductPriceProps = {
    priceData: ProductPriceData;
    small?: boolean;
    skeleton?: boolean;
}

const ProductPrice: React.FC<ProductPriceProps> = (props) => {
    const { priceData, small, skeleton } = props;

    if (priceData.discount !== 0) {
        return (
            <div className={ cn(css.container, small && css.small) }>
                <div className={ css.top }>
                    <div
                        className={ cn(css.price, css.withDiscount) }
                    >
                        { priceData.priceWithDiscount } { priceData.currency }
                    </div>
                </div>
                <div className={ css.bottom }>
                    <div
                        className={ css.original }
                    >
                        { priceData.price } { priceData.currency }
                    </div>
                    <div className={ css.discount }>
                        - { priceData.discountFixed } { priceData.currency }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={ cn(css.container, small && css.small) }>
            <div
                className={ css.price }>{ priceData.price } { priceData.currency }</div>
        </div>
    );
};

export default ProductPrice;