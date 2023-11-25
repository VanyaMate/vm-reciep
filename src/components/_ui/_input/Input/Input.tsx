import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import css from './Input.module.scss';
import { cn } from '@/helpers/classname.react.ts';
import { useDebounce } from '@/hooks/useDebounce.ts';


export type InputProps = {
    onValueChange: (value: string) => any;
    defaultValue?: string;
    placeholder?: string;
    debounce?: number;
    block?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
    const { onValueChange, defaultValue, placeholder, debounce, block } = props;
    const [ value, setValue ]                                           = useState<string>(defaultValue ?? '');
    const debounceCallback                                              = useCallback(() => {
        onValueChange(value);
    }, [ onValueChange, value ]);

    useDebounce(debounceCallback, 500);

    useEffect(() => {
        setValue(defaultValue ?? '');
    }, [ defaultValue ]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, [ value ]);

    return (
        <input
            placeholder={ placeholder }
            onChange={ onChange }
            value={ value }
            className={ cn(css.container, block && css.block) }
        />
    );
};

export default React.memo(Input);