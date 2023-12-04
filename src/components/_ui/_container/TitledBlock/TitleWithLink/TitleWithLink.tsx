import React from 'react';
import { Link } from 'react-router-dom';
import css from './TitleWithLink.module.scss';


export type TitleWithLinkProps = {
    title: string;
    linkText: string;
    url: string;
}

const TitleWithLink: React.FC<TitleWithLinkProps> = (props) => {
    const {
              title, linkText, url,
          } = props;

    return (
        <header className={ css.container }>
            <h6 className={ css.title }>{ title }</h6>
            <aside>
                <Link to={ url } className={ css.link }>{ linkText }</Link>
            </aside>
        </header>
    );
};

export default React.memo(TitleWithLink);