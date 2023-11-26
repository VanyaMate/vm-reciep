import React, { useCallback, useEffect, useState } from 'react';
import css from './DropdownList.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import { cn } from '@/helpers/classname.react.ts';
import Button, { ButtonType } from '@/components/_ui/_button/Button/Button.tsx';
import {
    DropdownListContext,
} from '@/components/_ui/_dropdown/DropdownList/DropdownListContext.ts';


export type DropdownListItem = {
    label: string;
    value?: string;
    icon?: React.ReactNode;
    onClick?: () => any;
    type?: ButtonType;
}

export type DropdownListProps = {
    children: React.ReactNode;
    menuItems: DropdownListItem[];
    defaultValue?: string;
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
              defaultValue,
          }                 = props;
    const [ open, setOpen ] = useState<boolean>(opened ?? false);
    const [ label, setLabel ] = useState<string>(
        defaultValue !== undefined
        ? menuItems.find((item) => (item.value === defaultValue) || (item.label === defaultValue))?.label ?? ''
        : '',
    );

    const onClickHandler = useCallback((label: string, handler?: () => any) => {
        setOpen(false);
        setLabel(label);
        handler && handler();
    }, []);

    useEffect(() => {
        if (open) {
            const onClick = () => setOpen(false);
            setTimeout(() => {
                window.addEventListener('click', onClick);
            }, 0);
            return () => {
                window.removeEventListener('click', onClick);
            };
        }
    }, [ open ]);

    return (
        <div
            className={ cn(css.container, open && css.opened, full && css.full, className) }>
            <div className={ css.children }
                 onClick={ () => setOpen((prev) => !prev) }
            >
                <DropdownListContext.Provider value={ label }>
                    { children }
                </DropdownListContext.Provider>
            </div>
            <Box className={ cn(css.dropdown, dropdownClassName) }>
                {
                    menuItems.map((menuItem, index) => (
                        <Button
                            className={ css.item }
                            styleType={ menuItem.type }
                            key={ index }
                            onClick={ () => onClickHandler(menuItem.label, menuItem.onClick) }
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