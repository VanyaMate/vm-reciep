import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './CompanyCard.module.scss';
import { Link } from 'react-router-dom';
import { UseFetchCompany } from '@/hooks/companies/useFetchCompany.ts';


export type CompanyCardProps = {
    company: UseFetchCompany;
    url: string;
}

const CompanyCard: React.FC<CompanyCardProps> = (props) => {
    const { company, url }   = props;
    const [ loading, value ] = company;

    if (loading) {
        return 'loading';
    }

    if (!value) {
        return '404';
    }

    return (
        <Link to={ url } className={ css.container }>
            <Box className={ css.box }>
                <img
                    className={ css.avatar }
                    src={ value.avatar }
                    alt={ value.title }
                />
                <div className={ css.info }>
                    <h6 className={ css.title }>{ value.title }</h6>
                    <div className={ css.description }>{ value.description }</div>
                </div>
            </Box>
        </Link>
    );
};

export default React.memo(CompanyCard);