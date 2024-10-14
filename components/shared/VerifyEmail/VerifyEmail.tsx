'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { verifyToken } from '@/api/auth/auth.api';

import scss from './VerifyEmail.module.scss';

const VerifyEmail = () => {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');
    const token = useSearchParams().get('token');

    const handleSubmit = useCallback(async () => {
        if (!token) {
            return;
        }

        try {
            const response = await verifyToken(token);

            console.log(response.data);

            if (response.status === 200) {
                await signIn('credentials', { ...response.data, redirect: false });

                router.replace('/tracker');
            }
        } catch (error: any) {
            setMessage("You're already verified or the token is invalid!");
        }
    }, [router, token]);

    useEffect(() => {
        handleSubmit();
    }, [handleSubmit]);

    return (
        <>
            {message && (
                <div className={scss.wrapper}>
                    <p className={scss.message}>{message}</p>
                    <Link href="/tracker" className={scss.link}>
                        Back to Tracker
                    </Link>
                </div>
            )}
        </>
    );
};

export default VerifyEmail;
