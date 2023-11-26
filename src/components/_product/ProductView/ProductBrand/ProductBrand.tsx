import React from 'react';
import css from './ProductBrand.module.scss';
import { Link } from 'react-router-dom';
import AnimatedImageBox
    from '@/components/_ui/_container/AnimatedImageBox/AnimatedImageBox.tsx';


export type ProductBrandProps = {
    icon: string;
    url: string;
    title: string;
    original?: boolean;
}

const ProductBrand: React.FC<ProductBrandProps> = (props) => {
    const { icon, url, title, original } = props;

    return (
        <Link to={ url } target={ '_blank' } className={ css.container }>
            <AnimatedImageBox
                w={ 40 }
                h={ 40 }
                seconds={ 5 }
                className={ css.icon }
                src={ icon }
            />
            <div className={ css.info }>
                <div className={ css.title }>{ title }</div>
                { original &&
                    <div className={ css.notice }>Оригинальный товар</div> }
            </div>
        </Link>
    );
};

export default ProductBrand;