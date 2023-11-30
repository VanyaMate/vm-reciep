import React from 'react';
import css from './BannerTitle.module.scss';


export type BannerTitleProps = {
    title: string;
}

const BannerTitle: React.FC<BannerTitleProps> = (props) => {
    const { title } = props;

    return (
        <div className={ css.container }>
            { title }
        </div>
    );
};

export default React.memo(BannerTitle);