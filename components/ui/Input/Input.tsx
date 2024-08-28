import { FC } from 'react';

import { InputProps } from './Input.types';

const Input: FC<InputProps> = ({ type, placeholder, name, onChange, onBlur, value }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
        />
    );
};

export default Input;
