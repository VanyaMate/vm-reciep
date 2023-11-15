import React from 'react';
import { Rate } from 'antd';
import css from './ProductRatingWidget.module.scss';


export type ProductRatingWidgetProps = {
    rating: number;
    reviews: number;
    onClick?: () => void;
}

const ProductRatingWidget: React.FC<ProductRatingWidgetProps> = (props) => {
    const { rating, reviews, onClick } = props;

    return (
        <div className={ css.container }>
            <Rate value={ rating } disabled/>
            <div>{ reviews } отзывов</div>
        </div>
    );
};

export default ProductRatingWidget;