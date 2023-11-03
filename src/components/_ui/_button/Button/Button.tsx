import React from 'react';
import css from './Button.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type ButtonProps = {
    primary?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
    const { className, primary, ...other } = props;

    return (
        <button { ...other }
                className={ cn(css.container, className, primary && css.primary) }/>
    );
};

export default Button;