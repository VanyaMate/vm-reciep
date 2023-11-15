import React, { useMemo } from 'react';
import css from './ProductBreadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';


export type BreadcrumbItem = {
    url: string;
    label: string;
}

export type ProductBreadcrumbsProps = {
    items: BreadcrumbItem[];
}

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = (props) => {
    const { items }                      = props;
    const breadcrumbs: React.ReactNode[] = useMemo(() => {
        const breadcrumbs: React.ReactNode[] = [];

        for (let i = 0; i < items.length; i++) {
            const item: BreadcrumbItem = items[i];
            breadcrumbs.push(
                <Link to={ item.url }
                      className={ css.link }
                      key={ i + 'label' }>{ item.label }</Link>,
            );
            breadcrumbs.push(
                <div className={ css.divider }>/</div>,
            );
        }

        breadcrumbs.pop();

        return breadcrumbs;
    }, [ items ]);

    return (
        <div className={ css.container }>
            { breadcrumbs }
        </div>
    );
};

export default React.memo(ProductBreadcrumbs);