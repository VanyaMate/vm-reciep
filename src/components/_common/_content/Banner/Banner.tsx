import React from 'react';
import css from './Banner.module.scss';
import Box from '@/components/_ui/_container/Box/Box.tsx';


export type BannerProps = {
    img: string;
    top: React.ReactNode | string;
    footer: React.ReactNode | string;
    onClick: () => any;
}

const Banner: React.FC<BannerProps> = (props) => {
    const { top, img, onClick, footer } = props;

    return (
        <Box
            className={ css.container }
            style={ { backgroundImage: `url('${ img }')` } }
            onClick={ onClick }
        >
            <Box className={ css.item }>{ top }</Box>
            <Box className={ css.item }>{ footer }</Box>
        </Box>
    );
};

export default React.memo(Banner);