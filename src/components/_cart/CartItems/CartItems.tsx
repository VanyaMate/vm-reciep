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
import Button from '@/components/_ui/_button/Button/Button.tsx';
import List from '@/components/_ui/_container/List/List.tsx';
import ListRow from '@/components/_ui/_container/List/ListRow/ListRow.tsx';
import ProductPriceByData
    from '@/components/_product/ProductView/ProductPriceByData/ProductPriceByData.tsx';
import ProductPrice
    from '@/components/_product/ProductView/ProductPrice/ProductPrice.tsx';
import ListPriceItem
    from '@/components/_ui/_container/List/items/ListPriceItem/ListPriceItem.tsx';
import { cn } from '@/helpers/classname.react.ts';


export type CartPreOrderBoxItem = {
    product: CartItemProductType;
    amount: number;
}

export type CartPreOrderBoxProps = {
    products: CartPreOrderBoxItem[];
    onAmountChange: CartItemAmountChangeHandler;
    loading?: boolean;
}

const CartPreOrderBox: React.FC<CartPreOrderBoxProps> = (props) => {
    const { products, onAmountChange, loading } = props;
    const cartPriceData                         = useCartPriceCalculator({
        products: products,
    });

    return (
        <div className={ cn(css.container, loading && css.loading) }>
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
                        styleType={ loading ? 'second' : 'primary' }
                        disabled={ loading }
                    >Оформить заказ</Button>
                    <Box className={ css.box }>
                        <List>
                            {
                                products.map((item) => (
                                    <ListRow
                                        key={ item.product.barcode }
                                        left={ item.product.product_name }
                                        right={
                                            <ListPriceItem
                                                price={ item.product.price }
                                                discount={ item.product.discount }
                                                discountType={ item.product.discountType }
                                                amount={ item.amount }
                                            />
                                        }
                                    />
                                ))
                            }
                        </List>
                        <ProductPriceByData
                            priceData={ cartPriceData }
                            postfix={ false }
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CartPreOrderBox);