import React, { useCallback, useContext, useEffect, useState } from 'react';
import CartItems, {
    CartPreOrderBoxItem,
} from '@/components/_cart/CartItems/CartItems.tsx';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { CartItem } from '@/modules/api/cart/cart-service.types.ts';
import {
    CartItemProductType,
} from '@/components/_product/ProductCart/ProductCartItem/ProductCartItem.tsx';
import { CartContext } from '@/contexts/data/CartContext.ts';
import { useCart } from '@/hooks/useCart.ts';


export type CartPageProps = {}

const CartPage: React.FC<CartPageProps> = (props) => {
    const [ loading, setLoading ]           = useState<boolean>(false);
    const {
              products: productsService,
          }                                 = useContext(ServicesContext);
    const { cart }                          = useContext(CartContext);
    const cartController                    = useCart();
    const [ cartProducts, setCartProducts ] = useState<CartPreOrderBoxItem[]>([]);

    useEffect(() => {
        if (cart && !loading) {
            setLoading(true);
            const ids: string[] = cart
                .items
                .map((item) => item.productId);

            productsService
                .findMany((product) => {
                    return ids.some((id) => product.barcode.toString() === id);
                }, { limit: 100 })
                .then((response) => response.list)
                .then((products) => products.map((product) => {
                    return {
                        product: product,
                        amount : cart.items.find((item) => item.productId === product.barcode.toString())?.amount ?? 0,
                    };
                }))
                .then((cartPreOrderBoxItems) => setCartProducts(cartPreOrderBoxItems))
                .then(() => setLoading(false));
        }
    }, [ cart ]);

    const onAmountChange = useCallback((productId: string, amount: number) => {
        return cartController.changeCartItem(productId, amount);
    }, [ cartController ]);

    console.log(cartProducts);

    return (
        <div>
            <CartItems
                products={ cartProducts }
                onAmountChange={ onAmountChange }
                loading={ loading }
            />
        </div>
    );
};

export default React.memo(CartPage);