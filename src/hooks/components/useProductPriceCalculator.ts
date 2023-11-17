import { useMemo, useState } from 'react';


export type DiscountType = 'fixed' | 'percent';

export type ProductPriceData = {
    price: number;
    discount: number;
    priceWithDiscount: number;
    discountPercent: number;
    discountFixed: number;
    currency: string;
}

export type UseProductPriceCalculatorProps = {
    price: number;
    discount: number;
    discountType: DiscountType;
    currency: string;
}

export const useProductPriceCalculator = function (props: UseProductPriceCalculatorProps): ProductPriceData {
    const { price, discount, discountType, currency } = props;
    const [ discountPercent, setDiscountPercent ]     = useState<number>(0);
    const [ discountFixed, setDiscountFixed ]         = useState<number>(0);
    const priceWithDiscount: number                   = useMemo(() => {
        if (discountType === 'percent') {
            setDiscountPercent(discount);
            const discountFixed: number = Math.floor(price / 100 * discount);
            setDiscountFixed(discountFixed);
            return price - discountFixed;
        } else {
            setDiscountFixed(discount);
            const discountPercent: number = Math.floor(100 / price * discount);
            setDiscountPercent(discountPercent);
            return price - discount;
        }
    }, [ price, discount, discountType ]);

    return {
        price,
        currency,
        discount,
        discountFixed,
        discountPercent,
        priceWithDiscount,
    };
};