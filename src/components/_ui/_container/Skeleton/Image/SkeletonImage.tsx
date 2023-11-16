import React from 'react';
import css from './SkeletonImage.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type SkeletonImageProps = {
    className?: string;
    fixed?: boolean;
}

const SkeletonImage: React.FC<SkeletonImageProps> = (props) => {
    const { className, fixed } = props;

    return (
        <div className={ cn(css.container, className, fixed && css.fixed) }/>
    );
};

export default SkeletonImage;