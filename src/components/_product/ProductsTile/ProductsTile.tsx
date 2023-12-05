import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductsTile.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ProductsTileProps = {
    children: React.ReactNode;
    className?: string;
}

const ProductsTile: React.FC<ProductsTileProps> = (props) => {
    const { children, className } = props;

    return (
        <div className={ cn(className, css.container) }>
            { children }
        </div>
    );
};

export default React.memo(ProductsTile);