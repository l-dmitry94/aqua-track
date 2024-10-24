'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import { signup } from '@/api/auth/auth.api';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Form from '@/components/ui/Form';
import { FormValues, NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';
import WaterLoader from '@/components/ui/WaterLoader';

import WelcomeAdvantages from '../../Welcome/WelcomeAdvantages/WelcomeAdvantages';
import Auth from '../Auth';

import fields from './fields';
import validationSchema from './validationSchema';

import scss from './SignUp.module.scss';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: FormValues) => {
        try {
            setIsLoading(true);
            const response = await signup(data);

            if (response?.status === 201) {
                toast.success("User created successfully. We've sent you an email.");
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Container className={scss.SignUpPage}>
                <Auth>
                    <Typography variant="h1" className={scss.title}>
                        Sign Up
                    </Typography>

                    <Form validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {(register, control, setValue, errors) => (
                            <>
                                <Box component="div" className={scss.wrapper}>
                                    {fields.map(({ type, name, placeholder, label }) => (
                                        <Input
                                            key={name}
                                            register={register}
                                            type={type}
                                            errors={errors}
                                            name={name as NameValues}
                                            placeholder={placeholder}
                                            label={label}
                                        />
                                    ))}
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    className={scss.button}
                                >
                                    Sign Up
                                </Button>

                                <Typography variant="body2" className={scss.linkWrapper}>
                                    Already have an account?{' '}
                                    <Link href="/signin" className={scss.link}>
                                        Sign In
                                    </Link>
                                </Typography>
                            </>
                        )}
                    </Form>
                </Auth>

                <Box className={scss.img}>
                    <WelcomeAdvantages />
                </Box>
            </Container>

            {isLoading && <WaterLoader />}
        </>
    );
};

export default SignUp;
