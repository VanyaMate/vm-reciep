import React from 'react';
import { Company } from '@/modules/api/company/company-service.types.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './CompanyCard.module.scss';
import { Link } from 'react-router-dom';


export type CompanyCardProps = {
    company: Company;
    url: string;
}

const CompanyCard: React.FC<CompanyCardProps> = (props) => {
    const { company, url } = props;

    return (
        <Box className={ css.container }>
            <img
                className={ css.avatar }
                src={ company.avatar }
                alt={ company.title }
            />
            <div className={ css.info }>
                <Link to={ url }
                      className={ css.title }>{ company.title }</Link>
                <div className={ css.description }>{ company.description }</div>
            </div>
        </Box>
    );
};

export default React.memo(CompanyCard);