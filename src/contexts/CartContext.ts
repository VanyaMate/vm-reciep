import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import { createContext } from 'react';


export type CartContextType = {
    cart: Cart | null;
    setCart: (cart: Cart | null) => void;
}

export const CartContext = createContext<CartContextType>({
    cart   : null,
    setCart: () => {
    },
});