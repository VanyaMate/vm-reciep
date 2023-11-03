import React from 'react';
import css from './HeaderLogo.module.scss';


const HeaderLogo = () => {
    return (
        <div className={ css.container }>
            VM<span>store</span>
        </div>
    );
};

export default HeaderLogo;