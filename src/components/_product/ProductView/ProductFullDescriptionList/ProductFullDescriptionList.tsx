import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';

export type ProductFullDescriptionListProps = {
    items: DescriptionsProps['items'];
}

const ProductFullDescriptionList: React.FC<ProductFullDescriptionListProps> = (props) => {
    const { items } = props;

    return (
        <Descriptions
            title={ 'Подробная информация' }
            bordered
            items={ items }
            size={ 'default' }
            column={ 4 }
        />
    );
};

export default React.memo(ProductFullDescriptionList);