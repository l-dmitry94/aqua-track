'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

interface IProviders {
    children: ReactNode;
    session: SessionProviderProps['session'];
}

const Providers: FC<IProviders> = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
