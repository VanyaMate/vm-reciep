import React from 'react';
import css from './Box.module.scss';
import { cn } from '@/helpers/classname.react.ts';


const Box: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { className, ...other } = props;

    return (
        <div className={ cn(className, css.container) } { ...other }/>
    );
};

export default Box;