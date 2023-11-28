import React from 'react';
import ProductCartItem, {
    CartItemAmountChangeHandler,
    CartItemProductType,
} from '@/components/_product/ProductCart/ProductCartItem/ProductCartItem.tsx';
import { getProductPageUrl } from '@/pages/getPage.ts';
import css from './CartItems.module.scss';
import {
    useCartPriceCalculator,
} from '@/hooks/components/useCartPriceCalculator.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import ListWithValues
    from '@/components/_product/ProductView/ProductShortInfo/ProductShortInfo.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import ProductPrice
    from '@/components/_product/ProductView/ProductPrice/ProductPrice.tsx';


export type CartPreOrderBoxItem = {
    product: CartItemProductType;
    amount: number;
}

export type CartPreOrderBoxProps = {
    products: CartPreOrderBoxItem[];
    onAmountChange: CartItemAmountChangeHandler;
}

const CartPreOrderBox: React.FC<CartPreOrderBoxProps> = (props) => {
    const { products, onAmountChange } = props;
    const cartPriceData                = useCartPriceCalculator({
        products: products,
    });

    return (
        <div className={ css.container }>
            <h2>
                Корзина
                ( { products.reduce((acc, item) => acc += item.amount, 0) } )
            </h2>
            <div className={ css.cart }>
                <div className={ css.list }>
                    {
                        products.map((item) => (
                            <ProductCartItem
                                key={ item.product.barcode }
                                product={ item.product }
                                amount={ item.amount }
                                url={ getProductPageUrl(item.product.barcode.toString()) }
                                onAmountChange={ onAmountChange }
                            />
                        ))
                    }
                </div>
                <div className={ css.info }>
                    <Button
                        className={ css.button }
                        block
                        styleType={ 'primary' }
                    >Оформить заказ</Button>
                    <Box className={ css.box }>
                        <ListWithValues
                            items={ products.map((item) => {
                                return {
                                    label   : <div key={ item.product.barcode }>
                                        <div>{ item.product.product_name }</div>
                                        <br/>
                                        <div>{ item.product.price } Р</div>
                                    </div>,
                                    children: item.amount,
                                    key     : item.product.barcode,
                                };
                            }) }
                        />
                        <ProductPrice
                            priceData={ cartPriceData }
                            postfix={ false }
                        />
                        <div>[price]: { cartPriceData.price }</div>
                        <div>[price-w
                            discount]: { cartPriceData.priceWithDiscount }</div>
                        <div>[discount
                            fixed]: { cartPriceData.discountFixed }</div>
                        <div>[discount
                            percent]: { cartPriceData.discountPercent }</div>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CartPreOrderBox);