import React from 'react';
import css from './ProductCartItem.module.scss';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import SkeletonImage
    from '@/components/_ui/_container/Skeleton/Image/SkeletonImage.tsx';
import SkeletonText
    from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';
import ProductPrice
    from '@/components/_product/ProductView/ProductPrice/ProductPrice.tsx';


export type ProductCartItemSkeletonProps = {}

const ProductCartItemSkeleton: React.FC<ProductCartItemSkeletonProps> = (props) => {
    const {} = props;

    return (
        <Box className={ css.container }>
            <div className={ css.product }>
                <SkeletonImage
                    className={ css.image }
                />
                <div className={ css.info }>
                    <SkeletonText
                        className={ css.title }>Название</SkeletonText>
                    <ProductPrice
                        price={ 0 }
                        discount={ 0 }
                        discountType={ 'fixed' }
                        small
                    />
                    <SkeletonText className={ css.quantity }>
                        На складе шт.
                    </SkeletonText>
                </div>
            </div>
            <div className={ css.right }>
                <div className={ css.amountControl }>
                    <Button
                        className={ css.item }
                        skeleton
                    >+</Button>
                    <Button
                        className={ css.item }
                        skeleton
                    >+</Button>
                    <Button
                        className={ css.item }
                        skeleton
                    >+</Button>
                </div>
                <div className={ css.actionsControl }>
                    <Button
                        className={ css.item }
                        skeleton
                    >+</Button>
                </div>
            </div>
        </Box>
    );
};

export default React.memo(ProductCartItemSkeleton);