import React, { useMemo } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import css from './ProductShortInfo.module.scss';
import { Product } from '@/modules/api/product/product-service.types.ts';


export type ListWithValuesProps = {
    product: Product;
}

const ListWithValues: React.FC<ListWithValuesProps> = (props) => {
    const { product }                                       = props;
    const shortDescriptionItems: DescriptionsProps['items'] = useMemo(() => {
        return [
            {
                key     : '1',
                label   : 'Калории',
                children: product.calories,
            },
            {
                key     : '10',
                label   : 'Аллергены',
                children: product.allergens,
            },
            {
                key     : '2',
                label   : 'Жиры',
                children: product.fat,
            },
            {
                key     : '3',
                label   : 'Витамин "А"',
                children: product.vitamin_a,
            },
            {
                key     : '4',
                label   : 'Витамин "С"',
                children: product.vitamin_c,
            },
            {
                key     : '5',
                label   : 'Кальций',
                children: product.calcium,
            },
            {
                key     : '6',
                label   : 'Железо',
                children: product.iron,
            },
        ];
    }, [ product ]);

    return (
        <Descriptions
            className={ css.container }
            items={ shortDescriptionItems }
            size={ 'small' }
            column={ 1 }
        />
    );
};

export default React.memo(ListWithValues);