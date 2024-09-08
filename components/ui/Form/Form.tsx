'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';

import { FormValues, IForm } from './Form.types';

const Form: FC<IForm> = ({ validationSchema, onSubmit, children }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: validationSchema && yupResolver(validationSchema),
    });

    return (
        <Box component="form" onSubmit={handleSubmit((data: FormValues) => onSubmit(data))}>
            {children(register, control, errors)}
        </Box>
    );
};

export default Form;
