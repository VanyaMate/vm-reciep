import React from 'react';
import {
    DiscountType,
    useProductPriceCalculator,
} from '@/hooks/components/useProductPriceCalculator.ts';
import css from './ListPriceItem.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ListPriceItemProps = {
    price: number;
    discount: number;
    discountType: DiscountType;
    amount: number;
}

const ListPriceItem: React.FC<ListPriceItemProps> = (props) => {
    const { price, discount, discountType, amount } = props;
    const priceData                                 = useProductPriceCalculator({
        price,
        discount,
        discountType,
    });

    return (
        <div className={ css.container }>
            {
                priceData.discountFixed
                ? <div className={ css.item }>
                    <span
                        className={ css.priceWODiscount }>{ priceData.price } ₽</span>
                    <span
                        className={ css.discount }>- { priceData.discountFixed } ₽</span>
                </div>
                : ''
            }
            <div className={ css.item }>
                <span
                    className={ css.price }>{ priceData.priceWithDiscount } ₽</span>
                <span className={ css.postfix }>за 1 шт.</span>
            </div>
            <div className={ css.item }>
                <span
                    className={ css.price }>{ priceData.priceWithDiscount * amount } ₽</span>
                <span className={ css.postfix }>за { amount } шт.</span>
            </div>
        </div>
    );
};

export default React.memo(ListPriceItem);