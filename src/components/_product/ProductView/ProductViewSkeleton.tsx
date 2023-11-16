import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductView.module.scss';
import ProductBreadcrumbsSkeleton
    from '@/components/_product/ProductView/ProductBreadcrumbs/ProductBreadcrumbsSkeleton.tsx';
import ProductTitle
    from '@/components/_product/ProductView/ProductTitle/ProductTitle.tsx';
import ProductHeaderNavigation
    from '@/components/_product/ProductView/ProductHeaderNavigation/ProductHeaderNavigation.tsx';
import SkeletonText
    from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';
import SkeletonImage
    from '@/components/_ui/_container/Skeleton/Image/SkeletonImage.tsx';
import { cn } from '@/helpers/classname.react.ts';
import { Divider } from 'antd';


const ProductViewSkeleton = () => {
    return (
        <Box className={ css.container }>
            <ProductBreadcrumbsSkeleton/>
            <ProductTitle skeleton>Длинное название продукта</ProductTitle>
            <ProductHeaderNavigation
                left={
                    <>
                        <SkeletonText>5 звезд и 1000 отзывов</SkeletonText>
                        <SkeletonText>Сердечко в избранное</SkeletonText>
                    </>
                }
                right={
                    <>
                        <SkeletonText>Код товара: 123891273891278</SkeletonText>
                    </>
                }
            />
            <Divider dashed style={ { marginTop: 4, marginBottom: 4 } }/>
            <div className={ css.top }>
                <div className={ css.left }>
                    <SkeletonImage className={ cn(css.slider, css.skeleton) }
                                   fixed/>
                </div>
            </div>
        </Box>
    );
};

export default ProductViewSkeleton;