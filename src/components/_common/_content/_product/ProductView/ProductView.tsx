import React, { useMemo } from 'react';
import {
    ProductCardProps,
} from '@/components/_common/_content/_product/ProductCard/ProductCard.tsx';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './ProductView.module.scss';
import ProductSlider
    from '@/components/_common/_content/_product/ProductSlider/ProductSlider.tsx';
import { Descriptions, Rate, Typography } from 'antd';
import type { DescriptionsProps } from 'antd';
import AddToCartButton
    from '@/components/_common/_content/_product/AddToCartButton/AddToCartButton.tsx';


const ProductView: React.FC<ProductCardProps> = (props) => {
    const { product, onAddToCart, inCart }             = props;
    const descriptionItems: DescriptionsProps['items'] = useMemo(() => [
        {
            key     : '1',
            label   : 'Вес',
            children: product.weight,
            span    : 3,
        },
        {
            key     : '2',
            label   : 'manufacturer',
            children: product.manufacturer,
            span    : 3,
        },
        {
            key     : '3',
            label   : 'nutritional_facts',
            children: product.nutritional_facts,
            span    : 3,
        },
        {
            key     : '4',
            label   : 'allergens',
            children: product.allergens,
            span    : 3,
        },
        {
            key     : '5',
            label   : 'ingredients',
            children: product.ingredients,
            span    : 3,
        },
        {
            key     : '6',
            label   : 'calories',
            children: product.calories,
            span    : 3,
        },
        {
            key     : '7',
            label   : 'fat',
            children: product.fat,
            span    : 3,
        },
        {
            key     : '8',
            label   : 'carbohydrates',
            children: product.carbohydrates,
            span    : 3,
        },
    ], [ product ]);

    return (
        <Box className={ css.container }>
            <div className={ css.top }>
                <div className={ css.left }>
                    <ProductSlider
                        images={ [
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            product.image_url,
                            ...product.images,
                        ] }
                    />
                </div>
                <div className={ css.right }>
                    <h2>{ product.product_name }</h2>
                    <Rate value={ product.rating }/>
                    <Typography.Paragraph
                        ellipsis={ {
                            rows      : 3,
                            expandable: true,
                        } }
                    >
                        { product.description }
                    </Typography.Paragraph>
                    {
                        onAddToCart &&
                        <AddToCartButton
                            onAddToCart={ () => onAddToCart(product.barcode.toString()) }
                            amount={ inCart }
                        />
                    }
                </div>
            </div>
            <div>
                <Descriptions
                    title={ 'Подробная информация' }
                    bordered
                    size={ 'small' }
                    items={ descriptionItems }
                />
            </div>
        </Box>
    );
};

export default React.memo(ProductView);