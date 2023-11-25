import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { SearchContext } from '@/contexts/data/SearchContext.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './HeaderSearchContainer.module.scss';
import HeaderCategoriesSelector
    from '@/components/_common/_header/HeaderCategoriesSelector/HeaderCategoriesSelector.tsx';
import { Category } from '@/modules/api/category/category-service.types.ts';
import { useFetchCategories } from '@/hooks/categories/useFetchCategories.ts';
import Input from '@/components/_ui/_input/Input/Input.tsx';
import { useCart } from '@/hooks/useCart.ts';


const HeaderSearchContainer = () => {
    const [ data, controller ]      = useContext(SearchContext);
    const { categories, loading }   = useFetchCategories();
    const [ selected, setSelected ] = useState<Category | null>(null);

    useEffect(() => {
        const selectedCategory: string | undefined = data.items.category?.value;
        if (selectedCategory) {
            const category: Category | null = categories.filter((category) => category.title === selectedCategory)[0] ?? null;
            setSelected(category);
        }
    }, [ data.items, categories ]);

    const onInput = useCallback((productName: string) => {
        controller.setItem('product_name', {
            value: productName,
            type : 'match',
        });
    }, [ controller ]);

    const onCategoryChange = useCallback((category: Category | null) => {
        setSelected(category);
        controller.setItem('category', {
            value: category?.title ?? '',
            type : 'equal',
        });
    }, [ selected, controller ]);

    return (
        <Box className={ css.container }>
            <HeaderCategoriesSelector
                selected={ selected }
                categories={ categories }
                loading={ loading }
                onCategoryChange={ onCategoryChange }
            />
            <Input
                defaultValue={ data.items.product_name?.value ?? '' }
                debounce={ 500 }
                placeholder={ 'Поиск' }
                block
                onValueChange={ onInput }
            />
        </Box>
    );
};

export default React.memo(HeaderSearchContainer);