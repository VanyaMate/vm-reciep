import React from 'react';
import { Divider } from 'antd';
import css from './DevComponentsItem.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type DevComponentsItemType =
    'row' | 'col';

export type DevComponentsItemProps = {
    label: string;
    children: React.ReactNode;
    type: DevComponentsItemType;
}

const DevComponentsItem: React.FC<DevComponentsItemProps> = (props) => {
    const { label, type, children } = props;

    return (
        <div className={ cn(
            css.container,
            type === 'row' ? css.row : css.col,
        ) }>
            <Divider>{ label }</Divider>
            <div className={ cn(
                css.children,
                type === 'row' ? css.row : css.col,
            ) }>
                { children }
            </div>
        </div>
    );
};

export default DevComponentsItem;