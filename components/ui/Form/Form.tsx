import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormValues, UserForm } from './Form.types';

const Form: FC<UserForm> = ({ validationSchema, operation, children }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: validationSchema && yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        operation(data);
    };

    return <form onSubmit={handleSubmit(onSubmit)}>{children(register, errors)}</form>;
};

export default Form;
