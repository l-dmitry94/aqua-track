'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Form from '@/components/ui/Form';
import { FormValues, NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';
import WaterLoader from '@/components/ui/WaterLoader';

import WelcomeAdvantages from '../../Welcome/WelcomeAdvantages/WelcomeAdvantages';
import Auth from '../Auth';

import validationSchema from './validationSchema';

import scss from './SignIn.module.scss';

const SignIn = () => {
    const t = useTranslations('SignIn');

    const router = useRouter();
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
    ];

    const handleSubmit = async (data: FormValues) => {
        try {
            setIsLoading(true);
            const result = await signIn('credentials', { ...data, redirect: false });

            if (result?.ok) {
                toast.success('Sign in successful');
                router.replace('/tracker');
            }

            if (result?.status === 401) {
                toast.error('Email or password is wrong');
            }

            if (result?.status === 403) {
                toast('Please confirm your email');
            }
        } catch {
        } finally {
            setIsLoading(false);
        }
    };

    const googleSignIn = async () => {
        const result = await signIn('google', { redirect: false });
        console.log(result);
    };

    return (
        <>
            <Container className={scss.SignInPage}>
                <Auth>
                    <Typography variant="h1" className={scss.title}>
                        {t('title')}
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
                                    {t('button')}
                                </Button>
                                <Typography variant="body2" className={scss.linkWrapper}>
                                    {t('linkText')}{' '}
                                    <Link href="/signup" className={scss.link}>
                                        {t('link')}
                                    </Link>
                                </Typography>
                            </>
                        )}
                    </Form>
                    <div className={scss.or}>or</div>
                    <Button variant="contained" fullWidth onClick={googleSignIn}>
                        {t('google')}
                    </Button>
                </Auth>
                <Box className={scss.img}>
                    <WelcomeAdvantages />
                </Box>
            </Container>

            {isLoading && <WaterLoader />}
        </>
    );
};

export default SignIn;
