import React from 'react';
import css from './SkeletonText.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type SkeletonTextProps = {
    className?: string;
    children: React.ReactNode;
}

const SkeletonText: React.FC<SkeletonTextProps> = (props) => {
    const { className, children } = props;
    return (
        <div className={ cn(css.container, className) }>
            { children }
        </div>
    );
};

export default React.memo(SkeletonText);