'use client';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { verifyToken } from '@/api/auth/auth.api';

// import scss from './VerifyEmail.module.scss';

const VerifyEmail = () => {
    const token = useSearchParams().get('token');

    const handleSubmit = useCallback(async () => {
        if (!token) {
            return;
        }

        const response = await verifyToken(token);

        console.log(response.data);
    }, [token]);

    useEffect(() => {
        handleSubmit();
    }, [handleSubmit]);

    return <div>VerifyEmail</div>;
};

export default VerifyEmail;
