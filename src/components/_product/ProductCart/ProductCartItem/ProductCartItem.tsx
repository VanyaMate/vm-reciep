import React, { useCallback, useState } from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import css from './ProductCartItem.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import { Link } from 'react-router-dom';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import Input from '@/components/_ui/_input/Input/Input.tsx';
import { cn } from '@/helpers/classname.react.ts';
import { DeleteOutlined } from '@ant-design/icons';
import ProductPrice
    from '@/components/_product/ProductView/ProductPriceByData/ProductPriceByData.tsx';
import {
    useProductPriceCalculator,
} from '@/hooks/components/useProductPriceCalculator.ts';


export type CartItemProductType = Pick<Product, 'product_name' | 'image_url' | 'quantity' | 'price' | 'discount' | 'discountType' | 'barcode'>;
export type CartItemAmountChangeHandler = (productId: string, amount: number) => Promise<any>;

export type ProductCartItemProps = {
    product: CartItemProductType;
    url: string;
    amount: number;
    onAmountChange: CartItemAmountChangeHandler;
}

const ProductCartItem: React.FC<ProductCartItemProps> = (props) => {
    const { product, amount, url, onAmountChange } = props;
    const [ loading, setLoading ]                  = useState<boolean>(false);
    const priceData                                = useProductPriceCalculator({
        price       : product.price,
        discount    : product.discount,
        discountType: product.discountType,
    });

    const onChange = useCallback((value: number) => {
        setLoading(true);
        onAmountChange(product.barcode.toString(), value).finally(() => setLoading(false));
    }, [ product, onAmountChange ]);

    const increment = useCallback(() => {
        onChange(amount + 1);
    }, [ amount, onChange ]);

    const decrement = useCallback(() => {
        onChange(amount - 1);
    }, [ amount, onChange ]);

    const deleteItem = useCallback(() => {
        onChange(0);
    }, [ onChange ]);

    return (
        <Box className={ css.container }>
            <div className={ css.product }>
                <img
                    className={ css.image }
                    src={ product.image_url }
                    alt={ product.product_name }
                />
                <div className={ css.info }>
                    <Link
                        to={ url }
                        className={ css.title }
                    >
                        { product.product_name }
                    </Link>
                    <ProductPrice
                        priceData={ priceData }
                        amount={ amount }
                        small
                    />
                    <div className={ css.quantity }>
                        На складе { product.quantity } шт.
                    </div>
                </div>
            </div>
            <div className={ css.right }>
                <div className={ css.amountControl }>
                    <Button
                        className={ css.item }
                        onClick={ increment }
                        loading={ loading }
                    >+</Button>
                    <Input
                        className={ cn(css.item, css.input) }
                        defaultValue={ amount.toString() }
                        onValueChange={ (value) => {
                            onChange(parseInt(value));
                        } }
                        loading={ loading }
                    />
                    <Button
                        className={ css.item }
                        onClick={ decrement }
                        loading={ loading }
                    >-</Button>
                </div>
                <div className={ css.actionsControl }>
                    <Button
                        className={ css.item }
                        styleType={ 'danger' }
                        loading={ loading }
                        onClick={ deleteItem }
                    >
                        <DeleteOutlined/>
                    </Button>
                </div>
            </div>
        </Box>
    );
};

export default React.memo(ProductCartItem);