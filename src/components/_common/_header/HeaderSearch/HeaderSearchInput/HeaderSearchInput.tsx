import React from 'react';


export type HeaderSearchInputProps = {
    value: string;
    onChange: (value: string) => any;
}

const HeaderSearchInput: React.FC<HeaderSearchInputProps> = (props) => {
    const { value, onChange } = props;

    return (
        <div>
            <input value={ value }
                   onChange={ (e) => onChange(e.target.value) }/>
        </div>
    );
};

export default HeaderSearchInput;