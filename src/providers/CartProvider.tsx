import React, { useState } from 'react';
import { Cart } from '@/modules/api/cart/cart-service.types.ts';
import { CartContext } from '@/contexts/CartContext.ts';


const CartProvider: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [ cart, setCart ] = useState<Cart | null>(null);

    return (
        <CartContext.Provider value={ { cart, setCart } } { ...props }/>
    );
};

export default CartProvider;