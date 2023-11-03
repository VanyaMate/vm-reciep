import React from 'react';
import css from './Header.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import HeaderLogo from '@/components/_common/_header/HeaderLogo/HeaderLogo.tsx';
import HeaderUser from '@/components/_common/_header/HeaderUser/HeaderUser.tsx';
import { User } from '@/modules/api/user/user-service.types.ts';


export type HeaderProps = {
    left: React.ReactNode;
    right: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
    const { left, right } = props;
    return (
        <Box className={ css.container }>
            <div>
                { left }
            </div>
            <div>
                { right }
            </div>
        </Box>
    );
};

export default Header;