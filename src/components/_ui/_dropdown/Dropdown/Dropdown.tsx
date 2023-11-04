import React from 'react';
import css from './Dropdown.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';


export type DropdownPosition =
    'top-left' |
    'top-right' |
    'bottom-left' |
    'bottom-right';

export type DropdownProps = {
    position: DropdownPosition;
    opened: boolean;
    children: React.ReactNode;
    className?: string;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
    const { position, opened, className, children } = props;

    return (
        <Box className={ cn(
            css.container,
            position === 'bottom-left' && css.bottom_left,
        ) }>
            { children }
        </Box>
    );
};

export default Dropdown;