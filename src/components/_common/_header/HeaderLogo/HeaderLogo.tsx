import React from 'react';
import css from './HeaderLogo.module.scss';
import { Link } from 'react-router-dom';
import { PageType } from '@/pages/getPage.ts';


const HeaderLogo = () => {
    return (
        <Link to={ PageType.HOME } className={ css.container }>
            VM<span>store</span>
        </Link>
    );
};

export default HeaderLogo;