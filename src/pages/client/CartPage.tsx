import React, { useCallback, useContext, useEffect, useState } from 'react';
import CartPreOrderBox, {
    CartPreOrderBoxItem,
} from '@/components/_cart/CartPreOrderBox/CartPreOrderBox.tsx';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { CartContext } from '@/contexts/data/CartContext.ts';
import { useCart } from '@/hooks/useCart.ts';
import CartPreOrderBoxSkeleton
    from '@/components/_cart/CartPreOrderBox/CartPreOrderBox.skeleton.tsx';


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
                .finally(() => setLoading(false));
        }
    }, [ cart ]);

    const onAmountChange = useCallback((productId: string, amount: number) => {
        return cartController.changeCartItem(productId, amount);
    }, [ cartController ]);

    return (
        <div>
            {
                (cartProducts.length)
                ? <CartPreOrderBox
                    products={ cartProducts }
                    onAmountChange={ onAmountChange }
                    loading={ loading }
                />
                : <CartPreOrderBoxSkeleton
                    amount={ cart?.items.length ?? 0 }
                />
            }
        </div>
    );
};

export default React.memo(CartPage);