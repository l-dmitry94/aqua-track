import { FC, ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import '../styles/globals.scss';

export const metadata: Metadata = {
    title: 'Aqua Track',
    description: 'Record daily water intake and track',
};

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'],
});

interface IRootLayout {
    children: ReactNode;
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    {children}
                </AppRouterCacheProvider>
            </body>
        </html>
    );
};

export default RootLayout;
