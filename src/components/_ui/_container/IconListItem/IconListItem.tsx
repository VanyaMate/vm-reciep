import React from 'react';
import css from './IconListItem.module.scss';
import Button, {
    ButtonProps,
} from '@/components/_ui/_button/Button/Button.tsx';
import { cn } from '@/helpers/classname.react.ts';


export type IconListItemProps = {
    icon: React.ReactNode;
    label: string;
} & ButtonProps;

const IconListItem: React.FC<IconListItemProps> = (props) => {
    const { icon, label, className, ...other } = props;

    return (
        <Button className={ cn(css.container, className) } { ...other }>
            <div className={ css.icon }>{ icon }</div>
            <div className={ css.label }>{ label }</div>
        </Button>
    );
};

export default IconListItem;