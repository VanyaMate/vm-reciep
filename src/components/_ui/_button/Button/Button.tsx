import React from 'react';
import css from './Button.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { Badge } from 'antd';


export type ButtonType =
    'primary' |
    'second' |
    'main' |
    'default' |
    'danger';

export type ButtonProps = {
    styleType?: ButtonType;
    amount?: number;
    loading?: boolean;
    skeleton?: boolean;
    square?: boolean;
    block?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
    const {
              className,
              amount,
              styleType,
              loading,
              skeleton,
              square,
              block,
              ...other
          } = props;

    return (
        <Badge { ...other }
               count={ amount ?? 0 }
               color={ 'red' }
               className={ cn(
                   css.container,
                   className,
                   styleType === 'primary' && css.primary,
                   styleType === 'second' && css.second,
                   styleType === 'main' && css.main,
                   styleType === 'danger' && css.danger,
                   skeleton && css.skeleton,
                   loading && css.loading,
                   square && css.square,
                   block && css.block,
               ) }
        />
    );
};

export default React.memo(Button);