import React from 'react';
import { UseFetchBrand } from '@/hooks/brands/useFetchBrand.ts';
import { UseFetchCompany } from '@/hooks/companies/useFetchCompany.ts';
import BrandViewLoader from '@/components/_brand/BrandView/BrandViewLoader.tsx';
import BrandView404 from '@/components/_brand/BrandView/BrandView404.tsx';
import CompanyCard from '@/components/_company/CompanyCard/CompanyCard.tsx';
import { getCompanyPageUrl } from '@/pages/getPage.ts';
import css from './BrandView.module.scss';


export type BrandViewProps = {
    brand: UseFetchBrand;
    header?: React.ReactNode | string;
    footer?: React.ReactNode | string;
}

const BrandView: React.FC<BrandViewProps> = (props) => {
    const {
              brand,
              header,
              footer,
          } = props;

    const [ brandLoading, brandValue ] = brand;

    return (
        <section className={ css.container }>
            <h6 className={ css.hidden }>Страница бренда</h6>
            {
                brandLoading
                ? <BrandViewLoader/>
                : brandValue
                  ? <section itemScope itemType={ 'https://schema.org/Brand' }
                             className={ css.header }>
                      <div className={ css.brand }>
                          <img className={ css.avatar } src={ brandValue.avatar }
                               itemProp={ 'logo' }/>
                          <div className={ css.info }>
                              <h6 itemProp={ 'name' }
                                  className={ css.title }>{ brandValue.title }</h6>
                              <p itemProp={ '_review' }
                                 className={ css.description }>{ brandValue.description }</p>
                          </div>
                      </div>
                      <header className={ css.company }>{ header }</header>
                  </section>
                  : <BrandView404/>
            }
            <footer>{ footer }</footer>
        </section>
    );
};

export default React.memo(BrandView);