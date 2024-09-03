'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import WelcomeAdvantages from '../../Welcome/WelcomeAdvantages/WelcomeAdvantages';
import Auth from '../Auth';

import fields from './fields';
import validationSchema from './validationSchema';

import scss from './SignIn.module.scss';

const SignIn = () => {
    return (
        <Box className={scss.SignInPage}>
            <Auth>
                <Typography variant="h1" className={scss.title}>
                    SignIn
                </Typography>
                <Form validationSchema={validationSchema} operation={() => {}}>
                    {(signin, control, errors) => (
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
            </Auth>
            <Box className={scss.img}>
                <WelcomeAdvantages />
            </Box>
        </Box>
    );
};

export default SignIn;
