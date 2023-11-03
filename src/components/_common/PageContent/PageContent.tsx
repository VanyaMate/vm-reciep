import React from 'react';
import css from './PageContent.module.scss';


export type PageContentProps = {
    top: React.ReactNode;
    footer: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = (props) => {
    const { top, footer } = props;

    return (
        <div className={ css.container }>
            <div className={ css.content }>
                { top }
            </div>
            { footer }
        </div>
    );
};

export default PageContent;