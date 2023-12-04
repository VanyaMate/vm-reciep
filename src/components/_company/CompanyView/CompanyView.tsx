import React from 'react';
import css from './CompanyView.module.scss';
import { Company } from '@/modules/api/company/company-service.types.ts';


export type CompanyViewProps = {
    company: [ boolean, Company | null ];
    header?: React.ReactNode | string;
    footer?: React.ReactNode | string;
}

const CompanyView: React.FC<CompanyViewProps> = (props) => {
    const {
              company, footer, header,
          }                  = props;
    const [ loading, value ] = company;

    if (loading) {
        return 'loading...';
    }

    if (!value) {
        return '404';
    }

    return (
        <section className={ css.container }>
            <h6 className={ css.hidden }>Страница компании</h6>
            <div className={ css.company }>
                <div className={ css.data }>
                    <img src={ value.avatar } className={ css.avatar }/>
                    <div className={ css.info }>
                        <h6 className={ css.title }>{ value.title }</h6>
                        <p className={ css.description }>{ value.description }</p>
                    </div>
                </div>
                <header className={ css.header }>{ header }</header>
            </div>
            <footer>{ footer }</footer>
        </section>
    );
};

export default React.memo(CompanyView);