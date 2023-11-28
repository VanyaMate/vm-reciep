import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import css from './Input.module.scss';
import { cn } from '@/helpers/classname.react.ts';


export type InputProps = {
    onValueChange: (value: string) => any;
    defaultValue?: string;
    placeholder?: string;
    debounce?: number;
    block?: boolean;
    loading?: boolean;
} & React.HTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
    const {
              onValueChange,
              defaultValue,
              placeholder,
              debounce,
              block,
              className,
              loading,
              ...other
          }                           = props;
    const [ value, setValue ]         = useState<string>(defaultValue ?? '');
    const [ prevValue, setPrevValue ] = useState<string>(defaultValue ?? '');

    useEffect(() => {
        if (prevValue === value) {
            return;
        }

        if (debounce) {
            const timeout = setTimeout(() => {
                onValueChange(value);
                setPrevValue(value);
            }, debounce);
            return () => clearTimeout(timeout);
        } else {
            onValueChange(value);
            setPrevValue(value);
        }
    }, [ value, onValueChange ]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, [ value ]);

    return (
        <input
            { ...other }
            placeholder={ placeholder }
            onChange={ onChange }
            value={ value }
            className={ cn(css.container, block && css.block, className, loading && css.loading) }
            type={ 'number' }
        />
    );
};

export default React.memo(Input);