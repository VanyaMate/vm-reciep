import React, { useMemo } from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './CartPreOrderBox.module.scss';
import ProductCartItem
    from '@/components/_product/ProductCart/ProductCartItem/ProductCartItem.tsx';
import { getProductPageUrl } from '@/pages/getPage.ts';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import List from '@/components/_ui/_container/List/List.tsx';
import ListRow from '@/components/_ui/_container/List/ListRow/ListRow.tsx';
import ListPriceItem
    from '@/components/_ui/_container/List/items/ListPriceItem/ListPriceItem.tsx';
import ProductPriceByData
    from '@/components/_product/ProductView/ProductPriceByData/ProductPriceByData.tsx';
import ProductCartItemSkeleton
    from '@/components/_product/ProductCart/ProductCartItem/ProductCartItem.skeleton.tsx';
import SkeletonText
    from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';
import ProductPrice
    from '@/components/_product/ProductView/ProductPrice/ProductPrice.tsx';


export type CartPreOrderBoxSkeletonProps = {
    amount: number;
}

const CartPreOrderBoxSkeleton: React.FC<CartPreOrderBoxSkeletonProps> = (props) => {
    const { amount }    = props;
    const items: null[] = useMemo(() => new Array(amount).fill(null), [ amount ]);

    return (
        <Box className={ css.container }>
            <h2 className={ css.title }>
                Корзина
                <span className={ css.amount }>
                { amount }
                </span>
            </h2>
            <div className={ css.cart }>
                <div className={ css.list }>
                    {
                        items.map((item, index) => (
                            <ProductCartItemSkeleton/>
                        ))
                    }
                </div>
                <div className={ css.info }>
                    <Button
                        className={ css.button }
                        block
                        skeleton
                    >Оформить заказ</Button>
                    <Box className={ css.box }>
                        <List>
                            {
                                items.map((item, index) => (
                                    <ListRow
                                        key={ index }
                                        left={
                                            <SkeletonText>Название</SkeletonText> }
                                        right={
                                            <ListPriceItem
                                                price={ 0 }
                                                discount={ 0 }
                                                discountType={ 'fixed' }
                                                amount={ 1 }
                                            />
                                        }
                                    />
                                ))
                            }
                        </List>
                        <ProductPrice
                            price={ 0 }
                            discount={ 0 }
                            discountType={ 'fixed' }
                            postfix={ false }
                        />
                    </Box>
                </div>
            </div>
        </Box>
    );
};

export default React.memo(CartPreOrderBoxSkeleton);