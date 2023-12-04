import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchBrand } from '@/hooks/brands/useFetchBrand.ts';
import ProductsTile from '@/components/_product/ProductsTile/ProductsTile.tsx';
import { useFetchProducts } from '@/hooks/products/useFetchProducts.ts';
import ProductCard from '@/components/_product/ProductCard/ProductCard.tsx';
import {
    getCompanyPageUrl,
    getProductPageUrl,
    PageType,
} from '@/pages/getPage.ts';
import { UrlSearch, useSearch } from '@/hooks/search/useSearch.ts';
import TitledBlock
    from '@/components/_ui/_container/TitledBlock/TitledBlock.tsx';
import Blocks from '@/components/_ui/_container/Blocks/Blocks.tsx';
import { useFetchCompany } from '@/hooks/companies/useFetchCompany.ts';
import CompanyCard from '@/components/_company/CompanyCard/CompanyCard.tsx';
import TitleWithLink from '@/components/_ui/_container/TitledBlock/TitleWithLink/TitleWithLink.tsx';
import BrandView from '@/components/_brand/BrandView/BrandView.tsx';
import List from '@/components/_ui/_container/List/List.tsx';
import ProductCardSkeleton
    from '@/components/_product/ProductCard/ProductCardSkeleton/ProductCardSkeleton.tsx';


export type BrandPageProps = {}

const BrandPage: React.FC<BrandPageProps> = (props) => {
    const {}                         = props;
    const params                     = useParams<{ id: string }>();
    const brandController            = useFetchBrand(params.id ?? '');
    const companyController          = useFetchCompany(brandController[1]?.company ?? '');
    const search: Partial<UrlSearch> = useMemo(() => {
        return {
            limit: 4,
            sort : [ 'reviews', 'desc' ],
        };
    }, []);
    const productsController         = useFetchProducts(search);
    const [ _, searchController ]    = useSearch();


    return (
        <BrandView
            brand={ brandController }
            header={
                <List>
                    <CompanyCard
                        company={ companyController }
                        url={ getCompanyPageUrl(brandController[1]?.company ?? '') }
                    />
                    <CompanyCard
                        company={ companyController }
                        url={ getCompanyPageUrl(brandController[1]?.company ?? '') }
                    />
                    <CompanyCard
                        company={ companyController }
                        url={ getCompanyPageUrl(brandController[1]?.company ?? '') }
                    />
                    <CompanyCard
                        company={ companyController }
                        url={ getCompanyPageUrl(brandController[1]?.company ?? '') }
                    />
                    <CompanyCard
                        company={ companyController }
                        url={ getCompanyPageUrl(brandController[1]?.company ?? '') }
                    />
                    <CompanyCard
                        company={ companyController }
                        url={ getCompanyPageUrl(brandController[1]?.company ?? '') }
                    />
                    <CompanyCard
                        company={ companyController }
                        url={ getCompanyPageUrl(brandController[1]?.company ?? '') }
                    />
                </List>
            }
            footer={
                <TitledBlock
                    title={
                        <TitleWithLink
                            title={ 'Популярные товары бренда' }
                            linkText={ 'Больше' }
                            url={ searchController.getClearUrl(`/${ PageType.PRODUCTS }`, {
                                items: {
                                    brand_name: {
                                        value: brandController[1]?.title ?? '',
                                        type : 'equal',
                                    },
                                },
                            }) }
                        />
                    }
                >
                    <ProductsTile>
                        {
                            productsController.loading
                            ? new Array(4).fill(null).map((_, index) => <ProductCardSkeleton
                                key={ index }/>)
                            : productsController.products.map((product) => (
                                <ProductCard
                                    product={ product }
                                    url={ getProductPageUrl(product.barcode.toString()) }
                                    key={ product.barcode }
                                />
                            ))
                        }
                    </ProductsTile>
                </TitledBlock>
            }
        />
    );
};

export default React.memo(BrandPage);