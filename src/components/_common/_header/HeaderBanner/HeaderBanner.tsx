import React from 'react';
import Box from '@/components/_ui/_container/Box/Box.tsx';
import css from './HeaderBanner.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type HeaderBannerProps = {
    background: string;
    footer: React.ReactNode;
    small?: boolean;
}

const HeaderBanner: React.FC<HeaderBannerProps> = (props) => {
    const { background, footer, small } = props;

    return (
        <Box className={ cn(css.container, small && css.small) }
             style={ { backgroundImage: `url("${ background }")` } }>
            { footer }
        </Box>
    );
};

export default HeaderBanner;