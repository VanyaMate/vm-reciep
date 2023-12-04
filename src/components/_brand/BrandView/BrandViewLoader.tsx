import React from 'react';
import css from './BrandView.module.scss';
import SkeletonImage from '@/components/_ui/_container/Skeleton/Image/SkeletonImage.tsx';
import SkeletonText from '@/components/_ui/_container/Skeleton/Text/SkeletonText.tsx';


export type BrandViewLoaderProps = {}

const BrandViewLoader: React.FC<BrandViewLoaderProps> = (props) => {
    const {} = props;

    return (
        <div className={ css.header }>
            <div className={ css.brand }>
                <SkeletonImage className={ css.avatar }/>
                <div className={ css.info }>
                    <SkeletonText className={ css.title }>Title</SkeletonText>
                    <SkeletonText className={ css.description }>Description</SkeletonText>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BrandViewLoader);