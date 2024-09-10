'use client';
import { FC, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import clsx from 'clsx';

import Icon from '../Icon';

import { IInput } from './Input.types';

import scss from './Input.module.scss';

const Input: FC<IInput> = ({
    register,
    name,
    type,
    placeholder,
    label,
    light,
    defaultValue,
    errors,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box component="div" className={scss.wrapper}>
            <Box
                component="label"
                htmlFor={name}
                className={clsx(scss.label, light && scss.lightLabel)}
            >
                {label}
            </Box>
            <Box component="div" className={scss.inputWrapper}>
                <input
                    type={showPassword ? 'text' : type}
                    {...register(name)}
                    placeholder={placeholder}
                    id={name}
                    autoComplete={type === 'password' ? 'current-password' : 'off'}
                    className={clsx(scss.input, errors?.[name] && scss.errorInput)}
                />

                {type === 'password' && (
                    <IconButton
                        type="button"
                        onClick={togglePassword}
                        className={scss.passwordButton}
                    >
                        <Icon
                            variant={showPassword ? 'eye-off' : 'eye'}
                            className={scss.passwordIcon}
                        />
                    </IconButton>
                )}
            </Box>

            {errors?.[name] && <p className={scss.error}>{errors?.[name]?.message}</p>}
        </Box>
    );
};

export default Input;
