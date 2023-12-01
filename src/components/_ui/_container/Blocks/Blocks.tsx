import React from 'react';
import css from './Blocks.module.scss';


export type BlocksProps = {
    children: React.ReactNode;
}

const Blocks: React.FC<BlocksProps> = (props) => {
    const { children } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(Blocks);