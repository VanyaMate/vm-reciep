import React, { ChangeEvent, useCallback } from 'react';
import css from './Input.module.scss';


export type InputProps = {
    value: string;
    onValueChange: (value: string) => any;
    placeholder?: string;
}

const Input: React.FC<InputProps> = (props) => {
    const { onValueChange, value, placeholder } = props;

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.target.value);
    }, [ onValueChange ]);

    return (
        <input
            placeholder={ placeholder }
            onChange={ onChange }
            value={ value }
            className={ css.container }
        />
    );
};

export default Input;