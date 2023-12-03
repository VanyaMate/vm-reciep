import React, { useMemo } from 'react';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ListWithValues
    from '@/components/_product/ProductView/ProductShortInfo/ProductShortInfo.tsx';
import { Descriptions, DescriptionsProps } from 'antd';


export type ProductInfoProps = {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = (props) => {
    const { product } = props;
    const descriptionItems: DescriptionsProps['items'] = useMemo(() => [
        {
            key     : '3',
            label   : 'Пищевая ценность',
            children: product.nutritional_facts,
            span    : 4,
        },
        {
            key     : '5',
            label   : 'Ингридиенты',
            children: product.ingredients,
            span    : 4,
        },
        {
            key     : '10',
            label   : 'Страна',
            children: product.manufacturer,
            span    : 2,
        },
        {
            key     : '2',
            label   : 'Производитель',
            children: product.manufacturer,
            span    : 2,
        },
        {
            key     : '16',
            label   : 'Витамин "А"',
            children: product.vitamin_a,
            span    : 2,
        },
        {
            key     : '17',
            label   : 'Витамин "С"',
            children: product.vitamin_c,
            span    : 2,
        },
        {
            key     : '6',
            label   : 'Калории',
            children: product.calories,
            span    : 1,
        },
        {
            key     : '7',
            label   : 'Жиры',
            children: product.fat,
            span    : 1,
        },
        {
            key     : '8',
            label   : 'Углеводы',
            children: product.carbohydrates,
            span    : 1,
        },
        {
            key     : '18',
            label   : 'Кальций',
            children: product.calcium,
            span    : 1,
        },
        {
            key     : '1',
            label   : 'Вес',
            children: product.weight,
            span    : 1,
        },
        {
            key     : '9',
            label   : 'Вес нетто',
            children: product.net_weight,
            span    : 1,
        },
        {
            key     : '11',
            label   : 'Размер порции',
            children: product.serving_size,
            span    : 1,
        },

        {
            key     : '4',
            label   : 'Аллергены',
            children: product.allergens,
            span    : 1,
        },
        {
            key     : '13',
            label   : 'Протеин',
            children: product.protein,
            span    : 1,
        },
        {
            key     : '14',
            label   : 'Сахар',
            children: product.sugar,
            span    : 1,
        },
        {
            key     : '15',
            label   : 'Волокно',
            children: product.fiber,
            span    : 1,
        }, {
            key     : '19',
            label   : 'Железо',
            children: product.iron,
            span    : 1,
        },
    ], [ product ]);

    return (
        <Descriptions
            title={ 'Подробная информация' }
            bordered
            items={ descriptionItems }
            size={ 'default' }
            column={ 4 }
        />
    );
};

export default React.memo(ProductInfo);