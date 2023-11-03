import React from 'react';
import css from './ProductCardInfo.module.scss';


export type ProductCardInfoProps = {
    title: string;
    description: string;
    price: number;
    discount: number;
    currency: string;
}

const ProductCardInfo: React.FC<ProductCardInfoProps> = (props) => {
    const { title, description, price, discount, currency } = props;

    return (
        <div className={ css.container }>
            <p className={ css.title }>{ title }</p>
            <p className={ css.description }>{ description }</p>
            <p className={ css.price }>{ price } { currency }</p>
        </div>
    );
};

export default ProductCardInfo;