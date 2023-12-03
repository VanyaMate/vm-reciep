import React, { useMemo } from 'react';
import css from './ProductBreadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { ISearchController } from '@/hooks/search/useSearch.ts';
import { PageType } from '@/pages/getPage.ts';


export type BreadcrumbItem = {
    url: string;
    label: string;
}

export type ProductBreadcrumbsProps = {
    product: Product;
    searchController: ISearchController;
}

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = (props) => {
    const { product, searchController } = props;
    const items: BreadcrumbItem[] = useMemo(() => {
        const list: BreadcrumbItem[] = [
            {
                url  : searchController.getUrl(`/${ PageType.PRODUCTS }`),
                label: 'Главная',
            },
        ];

        if (product?.category) {
            list.push({
                url  : searchController.getUrl(`/${ PageType.PRODUCTS }`, {
                    items: {
                        category: {
                            value: product.category,
                            type : 'equal',
                        },
                    },
                }),
                label: product.category,
            });
        }
        return list;
    }, [ product, searchController ]);

    const breadcrumbsItems: React.ReactNode[] = useMemo(() => {
        const breadcrumbs: React.ReactNode[] = [];

        for (let i = 0; i < items.length; i++) {
            const item: BreadcrumbItem = items[i];
            breadcrumbs.push(
                <Link to={ item.url }
                      className={ css.link }
                      key={ i + 'label' }>{ item.label }</Link>,
            );
            breadcrumbs.push(
                <div className={ css.divider } key={ i + 'div' }>/</div>,
            );
        }

        breadcrumbs.pop();

        return breadcrumbs;
    }, [ items ]);

    return (
        <div className={ css.container }>
            { breadcrumbsItems }
        </div>
    );
};

export default React.memo(ProductBreadcrumbs);