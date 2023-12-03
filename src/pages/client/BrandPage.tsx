import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchBrand } from '@/hooks/brands/useFetchBrand.ts';
import ProductsTile from '@/components/_product/ProductsTile/ProductsTile.tsx';
import { useFetchProducts } from '@/hooks/products/useFetchProducts.ts';
import ProductCard from '@/components/_product/ProductCard/ProductCard.tsx';
import { getProductPageUrl, PageType } from '@/pages/getPage.ts';
import { useSearch } from '@/hooks/search/useSearch.ts';
import TitledBlock
    from '@/components/_common/_content/TitledBlock/TitledBlock.tsx';
import Blocks from '@/components/_ui/_container/Blocks/Blocks.tsx';


export type BrandPageProps = {}

const BrandPage: React.FC<BrandPageProps> = (props) => {
    const {}                                     = props;
    const params                                 = useParams<{ id: string }>();
    const [ loading, brand ]                     = useFetchBrand(params.id ?? '');
    const { loading: loadingProducts, products } = useFetchProducts({
        limit: 4,
        sort : [ 'reviews', 'desc' ],
    });
    const [ _, searchController ]                = useSearch();

    return (
        <Blocks>
            {
                loading ? 'loading...' : ''
            }
            <div style={ {
                display   : 'flex',
                gap       : 20,
                alignItems: 'center',
            } }>
                <img src={ brand?.avatar }
                     style={ {
                         width       : 200,
                         height      : 200,
                         borderRadius: '50%',
                     } }/>
                <div>
                    <h1>{ brand?.title }</h1>
                    <p>{ brand?.description }</p>
                </div>
            </div>
            {
                !!products.length &&
                <TitledBlock title={
                    <div style={ {
                        display       : 'flex',
                        gap           : 10,
                        alignItems    : 'center',
                        justifyContent: 'space-between',
                    } }>
                        <span>Популярные продукты бренда</span>
                        <Link
                            to={ searchController.getClearUrl(`/${ PageType.PRODUCTS }`, {
                                items: {
                                    brand_name: {
                                        value: params.id!,
                                        type : 'equal',
                                    },
                                },
                            }) }>Больше</Link>
                    </div>
                }>
                    <ProductsTile>
                        {
                            products.map((product) => (
                                <ProductCard
                                    product={ product }
                                    key={ product.barcode }
                                    url={ getProductPageUrl(product.barcode.toString()) }
                                />
                            ))
                        }
                    </ProductsTile>
                </TitledBlock>
            }
        </Blocks>
    );
};

export default React.memo(BrandPage);