import React from 'react';
import { Category } from '@/modules/api/category/category-service.types.ts';
import css from './Categories.module.scss';


export type CategoriesProps = {
    categories: Category[];
}

const Categories: React.FC<CategoriesProps> = (props) => {
    const { categories } = props;

    return (
        <div className={ css.container }>
            {
                categories.map((category) => (
                    <div key={ category.title }>{ category.title }</div>
                ))
            }
        </div>
    );
};

export default Categories;