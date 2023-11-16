import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import css from './ProductShortInfo.module.scss';


export type ProductShortInfoProps = {
    items: DescriptionsProps['items'];
}

const ProductShortDescriptionList: React.FC<ProductShortInfoProps> = (props) => {
    const { items } = props;

    return (
        <Descriptions
            className={ css.container }
            items={ items }
            size={ 'small' }
            column={ 1 }
        />
    );
};

export default React.memo(ProductShortDescriptionList);