import React from 'react';
import { Badge } from 'antd';
import { cn } from '@/helpers/classname.react.ts';
import css from './BadgeButton.module.scss';


export type BadgeButtonProps = {
    amount: number;
    icon: React.ReactNode;
    skeleton?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const BadgeButton: React.FC<BadgeButtonProps> = (props) => {
    const { amount, icon, className, skeleton, ...other } = props;

    return (
        <Badge { ...other }
               count={ amount }
               className={ cn(css.container, className, skeleton && css.skeleton) }
               color={ 'red' }>
            <div className={ cn(css.icon, skeleton && 'gradient') }>
                { icon }
            </div>
        </Badge>
    );
};

export default BadgeButton;