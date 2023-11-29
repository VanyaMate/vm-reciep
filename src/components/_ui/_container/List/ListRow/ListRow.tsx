import React from 'react';
import css from './ListRow.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ListRowItem = React.ReactNode | string;

export type ListRowProps = {
    left: ListRowItem;
    right: ListRowItem;
}

const ListRow: React.FC<ListRowProps> = (props) => {
    const { left, right } = props;

    return (
        <div className={ css.container }>
            <div className={ cn(css.item, css.left) }>{ left }</div>
            <div className={ cn(css.item, css.right) }>{ right }</div>
        </div>
    );
};

export default React.memo(ListRow);