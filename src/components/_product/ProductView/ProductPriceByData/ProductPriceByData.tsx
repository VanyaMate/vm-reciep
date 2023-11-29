import React, { useMemo } from 'react';
import {
    ProductPriceData,
} from '@/hooks/components/useProductPriceCalculator.ts';
import css from './ProductPriceByData.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ProductPriceByDataProps = {
    priceData: ProductPriceData;
    amount?: number;
    small?: boolean;
    skeleton?: boolean;
    postfix?: boolean;
}

const ProductPriceByData: React.FC<ProductPriceByDataProps> = (props) => {
    const { priceData, small, amount, skeleton, postfix } = props;
    const saveAmount                                      = useMemo(() => amount ?? 1, [ amount ]);
    const savePostfix                                     = useMemo(() => postfix ?? true, [ postfix ]);

    if (priceData.discountFixed !== 0) {
        return (
            <div className={ cn(css.container, small && css.small) }>
                <div className={ css.top }>
                    <div
                        className={ cn(css.price, css.withDiscount) }
                    >
                        { priceData.priceWithDiscount * saveAmount } ₽
                        {
                            savePostfix &&
                            <div
                                className={ css.amount }>за { saveAmount } шт.</div>
                        }
                    </div>
                </div>
                <div className={ css.bottom }>
                    <div
                        className={ css.original }
                    >
                        { priceData.price * saveAmount } ₽
                    </div>
                    <div className={ css.discount }>
                        - { priceData.discountFixed * saveAmount } ₽
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={ cn(css.container, small && css.small) }>
            <div
                className={ css.price }>{ priceData.price * saveAmount } ₽
                {
                    savePostfix &&
                    <div className={ css.amount }>за { saveAmount } шт.</div>
                }
            </div>
        </div>
    );
};

export default React.memo(ProductPriceByData);