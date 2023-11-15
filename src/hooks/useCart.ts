import { CartContext, CartContextType } from '@/contexts/data/CartContext.ts';
import { useCallback, useContext } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';


export type CartCallback = (productId: string, amount: number) => Promise<any>;
export type InCartCallback = (productId: string) => number;

export interface ICartController {
    addToCart: CartCallback;
    removeFromCart: CartCallback;
    inCart: InCartCallback;
}

export const useCart = function (): ICartController {
    const cartContext: CartContextType = useContext(CartContext);
    const { cart: cartService }        = useContext(ServicesContext);

    const addToCartCallback: CartCallback      = useCallback((productId, amount) => {
        return cartService
            .addToCart(productId, amount)
            .then((cart) => cartContext.setCart(cart));
    }, [ cartContext, cartService ]);
    const removeFromCartCallback: CartCallback = useCallback((productId, amount) => {
        return cartService
            .removeFromCart(productId, amount)
            .then((cart) => cartContext.setCart(cart));
    }, [ cartContext, cartService ]);
    const inCartCallback: InCartCallback       = useCallback((productId) => {
        return cartContext.cart?.items.find((item) => item.productId === productId)?.amount ?? 0;
    }, [ cartContext, cartService ]);

    return {
        addToCart     : addToCartCallback,
        removeFromCart: removeFromCartCallback,
        inCart        : inCartCallback,
    };
};