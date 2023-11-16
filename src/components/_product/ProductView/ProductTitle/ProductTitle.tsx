import React from 'react';
import css from './ProductTitle.module.scss';
import SkeletonText
    from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';


export type ProductTitleProps = {
    children: React.ReactNode | string;
    skeleton?: boolean;
}

const ProductTitle: React.FC<ProductTitleProps> = (props) => {
    const { children, skeleton } = props;

    if (skeleton) {
        return (
            <SkeletonText
                className={ css.container }
            >
                { children }
            </SkeletonText>
        );
    }

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(ProductTitle);