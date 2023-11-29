import { CartContext, CartContextType } from '@/contexts/data/CartContext.ts';
import { useCallback, useContext, useMemo } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import {
    AuthFormModalContext,
} from '@/contexts/components/AuthFormModalContext.tsx';
import { UserContext } from '@/contexts/data/UserContext.ts';


export type CartCallback = (productId: string, amount: number) => Promise<any>;
export type InCartCallback = (productId: string) => number;

export interface ICartController {
    addToCart: CartCallback;
    removeFromCart: CartCallback;
    changeCartItem: CartCallback;
    inCart: InCartCallback;
}

export const useCart = function (): ICartController {
    const cartContext: CartContextType = useContext(CartContext);
    const { cart: cartService }        = useContext(ServicesContext);
    const authModal                    = useContext(AuthFormModalContext);
    const userContext                  = useContext(UserContext);

    const addToCartCallback: CartCallback      = useCallback(async (productId, amount) => {
        if (userContext.user) {
            return cartService
                .addToCart(productId, amount)
                .then((cart) => cartContext.setCart(cart));
        } else {
            authModal.open();
        }
    }, [ cartContext, cartService ]);
    const removeFromCartCallback: CartCallback = useCallback(async (productId, amount) => {
        return cartService
            .removeFromCart(productId, amount)
            .then((cart) => cartContext.setCart(cart));
    }, [ cartContext, cartService ]);
    const changeCartItemCallback: CartCallback = useCallback(async (productId, amount) => {
        return cartService
            .changeCartItem(productId, amount)
            .then((cart) => cartContext.setCart(cart));
    }, [ cartContext, cartService ]);

    const inCartCallback: InCartCallback = useCallback((productId) => {
        return cartContext.cart?.items.find((item) => item.productId === productId)?.amount ?? 0;
    }, [ cartContext, cartService ]);

    return useMemo(() => ({
        addToCart     : addToCartCallback,
        removeFromCart: removeFromCartCallback,
        changeCartItem: changeCartItemCallback,
        inCart        : inCartCallback,
    }), [ addToCartCallback, removeFromCartCallback, inCartCallback, changeCartItemCallback ]);
};