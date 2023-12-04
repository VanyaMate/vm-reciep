import React, { useContext } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { useParams } from 'react-router-dom';
import { useFetchCompany } from '@/hooks/companies/useFetchCompany.ts';
import {
    useFetchBrandsByCompany,
} from '@/hooks/brands/useFetchBrandsByCompany.ts';
import Blocks from '@/components/_ui/_container/Blocks/Blocks.tsx';
import CompanyView from '@/components/_company/CompanyView/CompanyView.tsx';
import TitledBlock from '@/components/_ui/_container/TitledBlock/TitledBlock.tsx';
import ProductBrandSkeleton
    from '@/components/_product/ProductView/ProductBrand/ProductBrandSkeleton.tsx';
import ProductBrand from '@/components/_product/ProductView/ProductBrand/ProductBrand.tsx';
import { getBrandPageUrl } from '@/pages/getPage.ts';


export type CompanyPageProps = {}

const CompanyPage: React.FC<CompanyPageProps> = (props) => {
    const {}                        = props;
    const params                    = useParams<{ id: string }>();
    const {
              brand  : brandService,
              company: companyService,
          }                         = useContext(ServicesContext);
    const companyController         = useFetchCompany(params?.id ?? '');
    const [ loadingBrands, brands ] = useFetchBrandsByCompany(params?.id ?? '');

    return (
        <CompanyView
            company={ companyController }
            footer={
                <TitledBlock
                    title={ 'Бренды' }
                >
                    {
                        loadingBrands
                        ? <ProductBrandSkeleton/>
                        : brands.map((brand) => (
                            <ProductBrand
                                title={ brand.title }
                                icon={ brand.avatar }
                                url={ getBrandPageUrl(brand.title) }
                            />
                        ))
                    }
                </TitledBlock>
            }
        />
    );
};

export default React.memo(CompanyPage);