import React from 'react';
import css from './ProductCardInfo.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { Link } from 'react-router-dom';


export type ProductCardInfoProps = {
    productId: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    currency: string;
    skeleton?: boolean;
}

const ProductCardInfo: React.FC<ProductCardInfoProps> = (props) => {
    const {
              title,
              description,
              price,
              discount,
              currency,
              productId,
              skeleton,
          } = props;

    return (
        <div className={ cn(css.container, skeleton && css.skeleton) }>
            <Link to={ '/product/' + productId }
                  className={ css.title }>{ title }</Link>
            <p className={ css.description }>{ description }</p>
            <p className={ css.price }>{ price } { currency }</p>
        </div>
    );
};

export default ProductCardInfo;