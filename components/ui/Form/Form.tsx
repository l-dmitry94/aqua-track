'use client';

import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';

import { FormValues, IForm } from './Form.types';

const Form: FC<IForm> = ({ validationSchema, operation, children }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: validationSchema && yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        operation(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {children(register, errors)}
        </Box>
    );
};

export default Form;
