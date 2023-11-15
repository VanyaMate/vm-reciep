import React from 'react';
import css from './ProductHeaderNavigation.module.scss';


export type ProductHeaderNavigationProps = {
    left: React.ReactNode;
    right: React.ReactNode;
}

const ProductHeaderNavigation: React.FC<ProductHeaderNavigationProps> = (props) => {
    const { left, right } = props;

    return (
        <div className={ css.container }>
            <div className={ css.left }>{ left }</div>
            <div className={ css.right }>{ right }</div>
        </div>
    );
};

export default ProductHeaderNavigation;