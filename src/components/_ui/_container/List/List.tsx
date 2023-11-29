import React from 'react';
import css from './List.module.scss';


export type ListProps = {
    children: React.ReactNode;
}

const List: React.FC<ListProps> = (props) => {
    const { children } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(List);