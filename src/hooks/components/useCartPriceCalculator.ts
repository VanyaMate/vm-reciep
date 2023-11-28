import { DiscountType } from '@/hooks/components/useProductPriceCalculator.ts';
import { useEffect, useMemo, useState } from 'react';


export type CartPriceData = {
    price: number;
    priceWithDiscount: number;
    discountFixed: number;
    discountPercent: number;
}

export type CalculatorPriceProduct = {
    price: number;
    discount: number;
    discountType: DiscountType;
}

export type CalculatorPriceItem = {
    amount: number;
    product: CalculatorPriceProduct;
}

export type UseCartPriceCalculatorProps = {
    products: CalculatorPriceItem[];
}

export const useCartPriceCalculator = function (props: UseCartPriceCalculatorProps): CartPriceData {
    const [ price, setPrice ]                         = useState<number>(0);
    const [ priceWithDiscount, setPriceWithDiscount ] = useState<number>(0);
    const [ discountFixed, setDiscountFixed ]         = useState<number>(0);
    const [ discountPercent, setDiscountPercent ]     = useState<number>(0);

    useEffect(() => {
        let price: number         = 0;
        let discountFixed: number = 0;

        for (let i = 0; i < props.products.length; i++) {
            const item = props.products[i];
            price += item.amount * item.product.price;
            discountFixed += item.amount * (
                item.product.discountType === 'fixed'
                ? item.product.discount
                : item.product.price / 100 * item.product.discount
            );
        }

        price         = Math.floor(price);
        discountFixed = Math.floor(discountFixed);

        const discountPercent   = Math.floor(100 / price * discountFixed);
        const priceWithDiscount = price - discountFixed;

        setPrice(price);
        setPriceWithDiscount(priceWithDiscount);
        setDiscountFixed(discountFixed);
        setDiscountPercent(discountPercent);
    }, [ props ]);

    return useMemo(() => ({
        price,
        priceWithDiscount,
        discountFixed,
        discountPercent,
    }), [ price, priceWithDiscount, discountFixed, discountPercent ]);
};