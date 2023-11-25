import React, { useCallback, useState } from 'react';
import css from './DropdownList.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import { cn } from '@/helpers/classname.react.ts';
import Button, { ButtonType } from '@/components/_ui/_button/Button/Button.tsx';


export type DropdownListItem = {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => any;
    type?: ButtonType;
}

export type DropdownListProps = {
    children: React.ReactNode;
    menuItems: DropdownListItem[];
    opened?: boolean;
    full?: boolean;
    className?: string;
    dropdownClassName?: string;
}

const DropdownList: React.FC<DropdownListProps> = (props) => {
    const {
              children,
              menuItems,
              opened,
              full,
              className,
              dropdownClassName,
          }                 = props;
    const [ open, setOpen ] = useState<boolean>(opened ?? false);

    const onClickHandler = useCallback((handler?: () => any) => {
        setOpen(false);
        handler && handler();
    }, []);

    return (
        <div
            className={ cn(css.container, open && css.opened, full && css.full, className) }>
            <div onClick={ () => setOpen((prev) => !prev) }>
                { children }
            </div>
            <Box className={ cn(css.dropdown, dropdownClassName) }>
                {
                    menuItems.map((menuItem, index) => (
                        <Button
                            className={ css.item }
                            styleType={ menuItem.type }
                            key={ index }
                            onClick={ () => onClickHandler(menuItem.onClick) }
                        >
                            <span
                                className={ css.icon }>{ menuItem.icon }</span>
                            { menuItem.label }
                        </Button>
                    ))
                }
            </Box>
        </div>
    );
};

export default React.memo(DropdownList);