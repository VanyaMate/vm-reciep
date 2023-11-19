import React from 'react';
import css from './Tag.module.scss';


export type TagProps = {
    backgroundColor: string;
    textColor: string;
    children: React.ReactNode;
}

const Tag: React.FC<TagProps> = (props) => {
    const { backgroundColor, textColor, children } = props;

    return (
        <div style={ { backgroundColor, color: textColor } }
             className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(Tag);