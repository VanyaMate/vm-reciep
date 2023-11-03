import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './HeaderBanner.module.scss';


export type HeaderBannerProps = {
    background: string;
    footer: React.ReactNode;
}

const HeaderBanner: React.FC<HeaderBannerProps> = (props) => {
    const { background, footer } = props;

    return (
        <Box className={ css.container }
             style={ { backgroundImage: `url("${ background }")` } }>
            { footer }
        </Box>
    );
};

export default HeaderBanner;