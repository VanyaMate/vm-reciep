import React from 'react';
import css from './BannerDescription.module.scss';


export type BannerDescriptionProps = {
    text: string;
}

const BannerDescription: React.FC<BannerDescriptionProps> = (props) => {
    const { text } = props;

    return (
        <div className={ css.container }>
            { text }
        </div>
    );
};

export default React.memo(BannerDescription);