import React from 'react';
import css from './DevComponentsList.module.scss';


export type DevComponentsListProps = {
    children: React.ReactNode;
}

const DevComponentsList: React.FC<DevComponentsListProps> = (props) => {
    const { children } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default DevComponentsList;