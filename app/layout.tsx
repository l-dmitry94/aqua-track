import { FC, ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import Providers from '@/components/Providers';

import '../styles/globals.scss';

export const metadata: Metadata = {
    title: 'Aqua Track',
    description: 'Record daily water intake and track',
};

interface IRootLayout {
    children: ReactNode;
}

const RootLayout: FC<IRootLayout> = async ({ children }) => {
    const session = await getServerSession();
    return (
        <html lang="en">
            <body>
                <Providers session={session}>
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        {children}
                    </AppRouterCacheProvider>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
