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
    const newPrice: number                            = useMemo(() => Math.floor(price), [ price ]);
    const [ discountPercent, setDiscountPercent ]     = useState<number>(0);
    const [ discountFixed, setDiscountFixed ]         = useState<number>(0);
    const priceWithDiscount: number                   = useMemo(() => {
        if (discountType === 'percent') {
            setDiscountPercent(discount);
            const discountFixed: number = Math.floor(newPrice / 100 * discount);
            setDiscountFixed(discountFixed);
            return Math.floor(newPrice - discountFixed);
        } else {
            setDiscountFixed(discount);
            const discountPercent: number = Math.floor(100 / newPrice * discount);
            setDiscountPercent(discountPercent);
            return Math.floor(newPrice - discount);
        }
    }, [ newPrice, discount, discountType ]);

    return {
        price: newPrice,
        currency,
        discount,
        discountFixed,
        discountPercent,
        priceWithDiscount,
    };
};