import React, { useMemo } from 'react';
import css
    from '@/components/_product/ProductView/ProductBreadcrumbs/ProductBreadcrumbs.module.scss';
import SkeletonText
    from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';


const ProductBreadcrumbsSkeleton = () => {
    const breadcrumbs: React.ReactNode[] = useMemo(() => {
        const breadcrumbs: React.ReactNode[] = [];

        for (let i = 0; i < 2; i++) {
            breadcrumbs.push(
                <SkeletonText key={ i }>default</SkeletonText>,
            );
            breadcrumbs.push(
                <div className={ css.divider } key={ i + 'div' }>/</div>,
            );
        }

        breadcrumbs.pop();

        return breadcrumbs;
    }, []);

    return (
        <div className={ css.container }>
            { breadcrumbs }
        </div>
    );
};

export default ProductBreadcrumbsSkeleton;