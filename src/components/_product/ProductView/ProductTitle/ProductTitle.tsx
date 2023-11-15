import React from 'react';
import css from './ProductTitle.module.scss';


export type ProductTitleProps = {
    children: React.ReactNode | string;
}

const ProductTitle: React.FC<ProductTitleProps> = (props) => {
    const { children } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default ProductTitle;