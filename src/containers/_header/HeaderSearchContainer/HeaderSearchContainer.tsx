import React, {
    useCallback,
    useContext,
    useEffect,
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
import DropdownList
    from '@/components/_ui/_dropdown/DropdownList/DropdownList.tsx';
import Button from '@/components/_ui/_button/Button/Button.tsx';
import { DownOutlined } from '@ant-design/icons';
import DropdownListLabel
    from '@/components/_ui/_dropdown/DropdownList/DropdownListLabel.tsx';


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
            <DropdownList
                dropdownClassName={ css.limitDropdown }
                defaultValue={ data.sort.join(',') }
                menuItems={ [
                    {
                        label  : 'Не сортировать',
                        value  : '',
                        onClick: () => controller.setSort([]),
                    },
                    {
                        label  : 'Дешевле',
                        value  : 'price,asc',
                        onClick: () => controller.setSort([ 'price', 'asc' ]),
                    },
                    {
                        label  : 'Дороже',
                        value  : 'price,desc',
                        onClick: () => controller.setSort([ 'price', 'desc' ]),
                    },
                ] }
            >
                <Button
                    styleType={ 'second' }
                    className={ css.limitButton }
                >
                    <span>Сортировка: <DropdownListLabel/></span><DownOutlined/>
                </Button>
            </DropdownList>
            <DropdownList
                dropdownClassName={ css.limitDropdown }
                defaultValue={ data.limit.toString() }
                menuItems={ [
                    {
                        label  : '10',
                        onClick: () => controller.setLimit(10),
                    },
                    {
                        label  : '20',
                        onClick: () => controller.setLimit(20),
                    },
                    {
                        label  : '30',
                        onClick: () => controller.setLimit(30),
                    },
                    {
                        label  : '40',
                        onClick: () => controller.setLimit(40),
                    },
                    {
                        label  : '50',
                        onClick: () => controller.setLimit(50),
                    },
                ] }
            >
                <Button
                    styleType={ 'second' }
                    className={ css.limitButton }
                >
                    <span>Показывать: <DropdownListLabel/></span><DownOutlined/>
                </Button>
            </DropdownList>
        </Box>
    );
};

export default React.memo(HeaderSearchContainer);