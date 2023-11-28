import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import css from './ProductShortInfo.module.scss';


export type ListWithValuesProps = {
    items: DescriptionsProps['items'];
}

const ListWithValues: React.FC<ListWithValuesProps> = (props) => {
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

export default React.memo(ListWithValues);