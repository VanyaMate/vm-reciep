import React, { useContext, useMemo, useState } from 'react';
import { SearchContext } from '@/contexts/data/SearchContext.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './HeaderSearchContainer.module.scss';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import HeaderCategoriesSelector
    from '@/components/_common/_header/HeaderCategoriesSelector/HeaderCategoriesSelector.tsx';
import { Category } from '@/modules/api/category/category-service.types.ts';
import { useFetchCategories } from '@/hooks/categories/useFetchCategories.ts';
import { UrlSearchItems } from '@/hooks/search/useSearch.ts';


const HeaderSearchContainer = () => {
    const [ data, controller ]      = useContext(SearchContext);
    const { categories, loading }   = useFetchCategories();
    const selected: Category | null = useMemo(() => {
        const selectedCategory: string | undefined = data.items.category?.value;
        if (selectedCategory) {
            return categories.filter((category) => category.title === selectedCategory)[0] ?? null;
        }
        return null;
    }, [ data.items ]);

    return (
        <Box className={ css.container }>
            <HeaderCategoriesSelector
                selected={ selected }
                categories={ categories }
                onCategoryChange={ (category) => {
                    const items: UrlSearchItems = data.items;
                    if (category) {
                        items.category = {
                            value: category.title,
                            type : 'equal',
                        };
                    } else {
                        delete items.category;
                    }
                    controller.setItems(items);
                }
                }
            />
        </Box>
    );
};

export default HeaderSearchContainer;