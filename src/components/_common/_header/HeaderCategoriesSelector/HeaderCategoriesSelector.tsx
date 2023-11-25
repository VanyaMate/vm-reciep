import React, { useCallback, useMemo, useState } from 'react';
import { Category } from '@/modules/api/category/category-service.types.ts';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import css from './HeaderCategoriesSelector.module.scss';
import DropdownList
    , {
    DropdownListItem,
} from '@/components/_ui/_dropdown/DropdownList/DropdownList.tsx';


export type HeaderCategoriesSelectorProps = {
    selected: Category | null;
    categories: Category[];
    onCategoryChange: (category: Category | null) => any;
    loading?: boolean;
}

const HeaderCategoriesSelector: React.FC<HeaderCategoriesSelectorProps> = (props) => {
    const { selected, categories, onCategoryChange, loading } = props;
    const [ opened, setOpened ]                               = useState<boolean>(false);

    const onMainButtonClick = useCallback(() => {
        setOpened((prev) => !prev);
    }, []);

    const onSecondButtonClick = useCallback(() => {
        setOpened(false);
        if (selected?.title) {
            onCategoryChange(null);
        }
    }, [ selected ]);

    const onCategoryClick = useCallback((category: Category) => {
        setOpened(false);
        onCategoryChange(category);
    }, [ onCategoryChange, opened ]);

    const menuItems: DropdownListItem[] = useMemo(() => {
        return categories.map((category) => ({
            label  : category.title,
            onClick: () => onCategoryClick(category),
        }));
    }, [ categories, onCategoryClick ]);

    return (
        <div className={ css.container }>
            <DropdownList
                menuItems={ menuItems }
                dropdownClassName={ css.dropdown }
            >
                <Button
                    styleType={ selected?.title ? 'primary'
                                                : 'second' }
                    className={ css.main }
                    onClick={ onMainButtonClick }
                    loading={ loading }
                >{ selected?.title ?? 'Категории' }</Button>
            </DropdownList>
            {
                selected?.title &&
                <Button
                    styleType={ 'main' }
                    square
                    onClick={ onSecondButtonClick }
                >
                    X
                </Button>
            }
        </div>
    );
};

export default React.memo(HeaderCategoriesSelector);