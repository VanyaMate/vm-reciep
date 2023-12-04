import React from 'react';
import css from './ProductBrand.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import SkeletonText
    from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';
import SkeletonImage
    from '@/components/_ui/_container/Skeleton/Image/SkeletonImage.tsx';


export type ProductBrandSkeletonProps = {
    original?: boolean;
}

const ProductBrandSkeleton: React.FC<ProductBrandSkeletonProps> = (props) => {
    const { original } = props;

    return (
        <div className={ cn(css.container, css.skeleton) }>
            <SkeletonImage className={ css.icon }/>
            <div className={ css.info }>
                <SkeletonText className={ css.title }>Бренд</SkeletonText>
                {
                    original &&
                    <SkeletonText className={ css.notice }>Оригинальный
                        товар
                    </SkeletonText>
                }
            </div>
        </div>
    );
};

export default React.memo(ProductBrandSkeleton);