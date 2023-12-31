import React, { useMemo } from 'react';
import {
    DiscountType,
    useProductPriceCalculator,
} from '@/hooks/components/useProductPriceCalculator.ts';
import css from './ProductPrice.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ProductPriceProps = {
    price: number;
    discount: number;
    discountType: DiscountType;
    amount?: number;
    small?: boolean;
    skeleton?: boolean;
    postfix?: boolean;
}

const ProductPrice: React.FC<ProductPriceProps> = (props) => {
    const {
              price,
              discountType,
              discount,
              small,
              amount,
              skeleton,
              postfix,
          }           = props;
    const priceData   = useProductPriceCalculator({
        price, discountType, discount,
    });
    const saveAmount  = useMemo(() => amount ?? 1, [ amount ]);
    const savePostfix = useMemo(() => postfix ?? true, [ postfix ]);

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

export default React.memo(ProductPrice);