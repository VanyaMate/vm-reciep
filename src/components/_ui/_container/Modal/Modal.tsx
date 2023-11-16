import React from 'react';
import css from './Modal.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import Box from '@/components/_ui/_container/Box/Box.tsx';


export type ModalProps = {
    opened: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
    const { opened, children, onClose } = props;

    return (
        <div className={ cn(css.container, opened && css.opened) }>
            <div className={ css.background } onClick={ onClose }/>
            <Box className={ css.content }>{ children }</Box>
        </div>
    );
};

export default Modal;