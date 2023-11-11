import React from 'react';
import css from './ProductCardInfo.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ProductCardInfoProps = {
    title: string;
    description: string;
    price: number;
    discount: number;
    currency: string;
    skeleton?: boolean;
}

const ProductCardInfo: React.FC<ProductCardInfoProps> = (props) => {
    const { title, description, price, discount, currency, skeleton } = props;

    return (
        <div className={ cn(css.container, skeleton && css.skeleton) }>
            <p className={ css.title }>{ title }</p>
            <p className={ css.description }>{ description }</p>
            <p className={ css.price }>{ price } { currency }</p>
        </div>
    );
};

export default ProductCardInfo;