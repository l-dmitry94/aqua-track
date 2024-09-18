'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Form from '@/components/ui/Form';
import { FormValues, NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import WelcomeAdvantages from '../../Welcome/WelcomeAdvantages/WelcomeAdvantages';
import Auth from '../Auth';

import fields from './fields';
import validationSchema from './validationSchema';

import scss from './SignIn.module.scss';

const SignIn = () => {
    const router = useRouter();

    const handleSubmit = async (data: FormValues) => {
        const result = await signIn('credentials', { ...data, redirect: false });

        if (result?.ok) {
            router.replace('/tracker');
        }
    };

    return (
        <Container className={scss.SignInPage}>
            <Auth>
                <Typography variant="h1" className={scss.title}>
                    Sign In
                </Typography>
                <Form validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {(signin, control, setValue, errors) => (
                        <>
                            <Box component="div" className={scss.wrapper}>
                                {fields.map(({ type, name, placeholder, label }) => (
                                    <Input
                                        key={name}
                                        register={signin}
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
                                Sign In
                            </Button>
                            <Typography variant="body2" className={scss.linkWrapper}>
                                Do not have an account?{' '}
                                <Link href="/signup" className={scss.link}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </>
                    )}
                </Form>
                <div className={scss.or}>or</div>
                <Button variant="contained" fullWidth onClick={() => signIn('google')}>
                    Google
                </Button>
            </Auth>
            <Box className={scss.img}>
                <WelcomeAdvantages />
            </Box>
        </Container>
    );
};

export default SignIn;
