import React, { useContext } from 'react';
import { ServicesContext } from '@/contexts/data/ServicesContext.tsx';
import { useParams } from 'react-router-dom';
import { useFetchCompany } from '@/hooks/companies/useFetchCompany.ts';
import {
    useFetchBrandsByCompany,
} from '@/hooks/brands/useFetchBrandsByCompany.ts';
import Blocks from '@/components/_ui/_container/Blocks/Blocks.tsx';


export type CompanyPageProps = {}

const CompanyPage: React.FC<CompanyPageProps> = (props) => {
    const {}                          = props;
    const params                      = useParams<{ id: string }>();
    const {
              brand  : brandService,
              company: companyService,
          }                           = useContext(ServicesContext);
    const [ loadingCompany, company ] = useFetchCompany(params?.id ?? '');
    const [ loadingBrands, brands ]   = useFetchBrandsByCompany(params?.id ?? '');

    if (loadingCompany) {
        return 'loading..';
    }

    if (!company) {
        return 'not found';
    }

    return (
        <Blocks>
            <h1>COMPANY: { company.title }</h1>
            <p>DESC: { company.description }</p>
            <div>
                {
                    brands.map((brand) => (
                        <div>
                            <h3>{ brand.title }</h3>
                            <p>{ brand.description }</p>
                        </div>
                    ))
                }
            </div>
        </Blocks>
    );
};

export default React.memo(CompanyPage);