import React from 'react';
import css from './Header.module.scss';


export type HeaderProps = {
    categories: React.ReactNode,
    user: React.ReactNode
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div className={ css.container }>
            { props.categories }
            { props.user }
        </div>
    );
};

export default Header;