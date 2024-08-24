import { FC } from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import clsx from 'clsx';

import scss from './Button.module.scss';

const Button: FC<ButtonProps> = ({ children, fullWidth, className, variant, ...props }) => {
    return (
        <MuiButton
            {...props}
            className={clsx(
                scss.button,
                {
                    [scss.contained]: variant === 'contained',
                    [scss.outlined]: variant === 'outlined',
                    [scss.fullWidth]: fullWidth,
                },
                className
            )}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
