import React, { useCallback, useMemo, useState } from 'react';
import { Category } from '@/modules/api/category/category-service.types.ts';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import css from './HeaderCategoriesSelector.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import { cn } from '@/helpers/classname.react.ts';


export type HeaderCategoriesSelectorProps = {
    selected: Category | null;
    categories: Category[];
    onCategoryChange: (category: Category | null) => any;
}

const HeaderCategoriesSelector: React.FC<HeaderCategoriesSelectorProps> = (props) => {
    const { selected, categories, onCategoryChange } = props;
    const [ opened, setOpened ]                      = useState<boolean>(false);

    const onMainButtonClick = useCallback(() => {
        setOpened((prev) => !prev);
    }, []);

    const onSecondButtonClick = useCallback(() => {
        setOpened(false);
        if (selected?.title) {
            onCategoryChange(null);
        } else {
            // open
        }
    }, [ selected ]);

    const onCategoryClick = useCallback((category: Category) => {
        setOpened(false);
        onCategoryChange(category);
    }, [ onCategoryChange, opened ]);

    return (
        <div className={ css.container }>
            <Button
                styleType={ selected?.title ? 'primary'
                                            : 'second' }
                className={ css.main }
                onClick={ onMainButtonClick }
            >{ selected?.title ?? 'Категории' }</Button>
            <Button
                styleType={ selected?.title ? 'main'
                                            : 'second' }
                square
                onClick={ onSecondButtonClick }
            >X</Button>
            <Box className={ cn(css.dropdown, opened && css.opened) }>
                {
                    categories.map((category) => (
                        <Button
                            styleType={ 'default' }
                            key={ category.title }
                            block
                            disabled={ selected?.title === category.title }
                            onClick={ () => onCategoryClick(category) }
                        >
                            { category.title }
                        </Button>
                    ))
                }
            </Box>
        </div>
    );
};

export default HeaderCategoriesSelector;