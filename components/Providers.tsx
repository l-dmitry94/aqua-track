'use client';

import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

import toastOptions from '@/lib/toaster';

interface IProviders {
    children: ReactNode;
    session: SessionProviderProps['session'];
}

const Providers: FC<IProviders> = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
            <Toaster position="top-right" toastOptions={{ ...toastOptions }} />
        </SessionProvider>
    );
};

export default Providers;
