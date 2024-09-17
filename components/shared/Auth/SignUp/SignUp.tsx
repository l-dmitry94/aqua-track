'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { signup } from '@/api/auth.api';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Form from '@/components/ui/Form';
import { FormValues, NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import WelcomeAdvantages from '../../Welcome/WelcomeAdvantages/WelcomeAdvantages';
import Auth from '../Auth';

import fields from './fields';
import validationSchema from './validationSchema';

import scss from './SignUp.module.scss';

const SignUp = () => {
    const router = useRouter();
    const handleSubmit = async (data: FormValues) => {
        const response = await signup(data);

        if (response.status === 201) {
            const response = await signIn('credentials', { ...data, redirect: false });

            if (response?.ok) {
                router.replace('/tracker');
            }
        }
    };

    return (
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
    );
};

export default SignUp;
