'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import Auth from '../Auth';

import fields from './fields';
import validationSchema from './validationSchema';

import scss from './SignUp.module.scss';

const SignUp = () => {
    return (
        <Auth>
            <Typography variant="h1" className={scss.title}>
                Sign Up
            </Typography>

            <Form validationSchema={validationSchema} operation={() => {}}>
                {(register, errors) => (
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

                        <Button type="submit" variant="contained" fullWidth className={scss.button}>
                            Sign In
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
    );
};

export default SignUp;