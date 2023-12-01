import React from 'react';
import css from './TitledBlock.module.scss';


export type TitledBlockProps = {
    title: string | React.ReactNode;
    children: string | React.ReactNode;
}

const TitledBlock: React.FC<TitledBlockProps> = (props) => {
    const { title, children } = props;

    return (
        <div className={ css.container }>
            <div className={ css.title }>{ title }</div>
            <div className={ css.content }>{ children }</div>
        </div>
    );
};

export default React.memo(TitledBlock);