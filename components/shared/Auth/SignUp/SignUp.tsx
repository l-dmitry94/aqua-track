'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { signup } from '@/api/auth/auth.api';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Form from '@/components/ui/Form';
import { FormValues, NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';
import LangSwitcher from '@/components/ui/LangSwitcher';
import WaterLoader from '@/components/ui/WaterLoader';

import WelcomeAdvantages from '../../Welcome/WelcomeAdvantages/WelcomeAdvantages';
import Auth from '../Auth';

import validationSchema from './validationSchema';

import scss from './SignUp.module.scss';

const SignUp = () => {
    const t = useTranslations('SignUp');
    const [isLoading, setIsLoading] = useState(false);

    const fields = [
        {
            name: 'email',
            type: 'email',
            label: t('email'),
            placeholder: t('emailPlaceholder'),
        },
        {
            name: 'password',
            type: 'password',
            label: t('password'),
            placeholder: t('passwordPlaceholder'),
        },
        {
            name: 'repeatPassword',
            type: 'password',
            label: t('repeatPassword'),
            placeholder: t('repeatPasswordPlaceholder'),
        },
    ];

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
            <Container>
                <LangSwitcher />
                <Box className={scss.SignUpPage}>
                    <Auth>
                        <Typography variant="h1" className={scss.title}>
                            {t('title')}
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
                                        {t('button')}
                                    </Button>

                                    <Typography variant="body2" className={scss.linkWrapper}>
                                        {t('linkText')}{' '}
                                        <Link href="/signin" className={scss.link}>
                                            {t('link')}
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
            </Container>

            {isLoading && <WaterLoader />}
        </>
    );
};

export default SignUp;
